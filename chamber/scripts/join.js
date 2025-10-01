document.addEventListener('DOMContentLoaded', () => {
    const ts = document.getElementById('timestamp');
    if (ts) ts.value = new Date().toISOString();

    const lm = document.getElementById('lastModified');
    if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;

  const cards = document.querySelectorAll('.membership-card');
  cards.forEach((card, i) => {
      setTimeout(() => {
          card.classList.add('animate-in');
      }, i * 120);
  });

  const links = document.querySelectorAll('.info-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.modal;
      const dlg = document.getElementById(id);
        
      if (!dlg) {
          console.warn(`No dialog found with ID: ${id}`);
        }

      if (dlg && typeof dlg.showModal === 'function') {
          dlg.classList.remove('animate-open');
        void dlg.offsetWidth;
        dlg.showModal();
        dlg.classList.add('animate-open');

        const btn = dlg.querySelector('[data-close]') || dlg.querySelector('button');
        if (btn) btn.focus();
      }
    });
  });
    
    document.querySelectorAll('dialog.modal').forEach(dlg => {
        const closeBtn = dlg.querySelector('[data-close]') || dlg.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                dlg.close();
                dlg.classList.remove('animate-open');
            });
        }

        dlg.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dlg.close();
                dlg.classList.remove('animate-open');
            }
        });
    });
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