document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("main-nav");
    const menuToggle = document.getElementById("nav-button");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("show");
        menuToggle.classList.toggle("open");
    });

    document.querySelectorAll("#main-nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("show");
            menuToggle.classList.remove("open");
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
    
    //Current Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    //Last Modified
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
    });

    async function loadWeather() {
        const apiKey = '7ddc48a9b2751d14504f2921f10215e7';
        const lat = 40.7608;
        const lon = -111.8910;

        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);
            if (!currentResponse.ok || !forecastResponse.ok) throw new Error('Weather API failed');

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            const weatherInfo = document.getElementById('weather-info');
            const html = `
                <p><strong>Temperature:</strong> ${currentData.main.temp.toFixed(1)} °F</p>
                <p><strong>Condition:</strong> ${currentData.weather[0].description}</p>
            `;
            
            const forecastList = forecastData.list;
            const dailyForecasts = [];

            const addedDates = new Set();
            forecastList.forEach(item => {
                const date = new Date(item.dt_txt);
                const hour = date.getHours();

                if (hour === 12) {
                    const day = date.toDateString();
                    if (!addedDates.has(day) && dailyForecasts.length < 3) {
                        addedDates.add(day);
                        dailyForecasts.push(item);
                    }
                }
            });

            let forecastHtml = '<h3>3-Day Forecast</h3><ul>';
            dailyForecasts.forEach(item => {
                const date = new Date(item.dt_txt).toLocaleDateString("en-US",
                    { weekday: 'long', month: 'short', day: 'numeric' });
                forecastHtml += `
                    <li class="forecast-item">
                        <p><strong>${date}:</strong></p>
                        <p>Temperature: ${item.main.temp.toFixed(1)} °F</p>
                        <p>Condition: ${item.weather[0].description}</p>
                    </li>
                `;
            });
            forecastHtml += '</ul>';
            
            weatherInfo.innerHTML = html + forecastHtml;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
    loadWeather();

    async function loadSpotlights() {
        try {
            const response = await fetch("../chamber/data/members.json");
            const members = await response.json();

            const spotlightCandidates = members.filter(member => member.membership === 2 || member.membership === 3);

            const shuffled = spotlightCandidates.sort(() => Math.random() - 0.5);
            const numberToShow = Math.floor(Math.random() * 2) + 3; // 3 or 4
            const selected = shuffled.slice(0, numberToShow);

            const container = document.getElementById("spotlight-cards");
            container.innerHTML = "";

            selected.forEach(member => {
                const card = document.createElement("div");
                card.className = "spotlight-card";

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    <p><strong>Membership:</strong> ${member.membership === 3 ? "Gold" : "Silver"}</p>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Failed to load spotlight members:", error);
        }
    }
    loadSpotlights();
});