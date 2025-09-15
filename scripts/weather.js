// select HTML elements in the document
const myTown = document.querySelector('#town')
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const myKey = "d94dea879fdc47eaeea8826f362c6d5a"
const myLat = "49.75"
const myLong = "6.64"
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}`

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data); 
        displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
    }

    function displayResults(data) {
        console.log('hello')
        myTown.innerHTML = data.name
        currentTemp.innerHTML = `${data.main.temp}&deg;F`
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherIcon.setAttribute('SRC', iconsrc)
        weatherIcon.setAttribute('alt', data.weather[0].description)
    }
}

apiFetch();