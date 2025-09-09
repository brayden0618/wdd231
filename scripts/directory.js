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

  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  gridBtn.addEventListener("click", () => {
    const directory = document.getElementById("directory-list");
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

    listBtn.addEventListener("click", () => {
        const directory = document.getElementById("directory-list");
        directory.classList.add("list-view");
        directory.classList.remove("grid-view");

        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });

  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
  const year = new Date().getFullYear();
  const copyright =
    document.querySelector("footer .contact-info") ||
    document.querySelector("footer");
  if (copyright)
    copyright.innerHTML += `<p>&copy; ${year} Salt Lake Chamber</p>`;

  fetchAndDisplayMembers();

  async function fetchAndDisplayMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Network response was not ok");

      const members = await response.json();
      const directory = document.getElementById("directory-list");

      console.log("Members loaded:", members);

      members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p><strong>${membershipLevelName(member.membership)}</strong></p>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p>${member.description}</p>
        `;
        directory.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }
  
  function membershipLevelName(level) {
    switch (level) {
      case 3:
        return "Gold Member";
      case 2:
        return "Silver Member";
      case 1:
      default:
        return "Member";
    }
  }
});