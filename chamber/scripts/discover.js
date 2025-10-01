document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('discoverGrid');
  const msgEl = document.getElementById('visit-message');
  const dialog = document.getElementById('detailDialog');
  const detailTitle = document.getElementById('detailTitle');
  const detailImage = document.getElementById('detailImage');
  const detailAddress = document.getElementById('detailAddress');
  const detailText = document.getElementById('detailText');
  const closeDetail = document.getElementById('closeDetail');
  const LAST_KEY = 'discover-last-visit';

  // LocalStorage visit message
  try {
    const last = localStorage.getItem(LAST_KEY);
    const now = Date.now();
    if (!last) {
      msgEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const days = Math.floor((now - Number(last)) / 86400000);
      if (days === 0) msgEl.textContent = "Back so soon! Awesome!";
      else if (days === 1) msgEl.textContent = "You last visited 1 day ago.";
      else msgEl.textContent = `You last visited ${days} days ago.`;
    }
    localStorage.setItem(LAST_KEY, String(now));
  } catch (e) {
    msgEl.textContent = "";
  }

  //JSON Data
  fetch('data/discover.json')
    .then(r => {
      if (!r.ok) throw new Error('Failed to load data');
      return r.json();
    })
    .then(items => {
      items.slice(0,8).forEach((item, i) => {
        const idx = i + 1;
        const card = document.createElement('article');
        card.className = `place-card area-${idx}`;
        card.innerHTML = `
          <figure>
            <img loading="lazy" data-src="images/${item.photo_link}" alt="${item.name}">
          </figure>
          <div class="card-body">
            <h2>${item.name}</h2>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <div class="actions"><button type="button" class="learn-btn" data-index="${i}">Learn more</button></div>
          </div>
        `;
        grid.appendChild(card);
      });

      //Lazy Load Images
      document.querySelectorAll('.place-card img').forEach(img => {
        const src = img.dataset.src;
        if (!src) return;
        img.src = src;
        if (img.complete) img.classList.add('loaded');
        else img.addEventListener('load', () => img.classList.add('loaded'));
      });

      //Learn More button
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.learn-btn');
        if (!btn) return;
        const index = Number(btn.dataset.index);
        const item = items[index];
        if (!item) return;
        detailTitle.textContent = item.title;
        detailImage.alt = item.name;
        detailAddress.textContent = item.address;
        detailText.textContent = item.detail || item.description;
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          closeDetail.focus();
        } else {
          alert(item.title + '\n\n' + (item.detail || item.description));
        }
      });

    })
    .catch(err => {
      grid.innerHTML = `<p>Unable to load places at this time.</p>`;
      console.error(err);
    });
  
    //dialog close
  closeDetail.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientY < rect.top ||
      e.clientY > rect.bottom ||
      e.clientX < rect.left ||
      e.clientX > rect.right
    ) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => { if (e.key === 'Escape') dialog.close(); });

  //last modified
  const lm = document.getElementById('lastModified');
  if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;
});

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
});