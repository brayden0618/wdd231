document.addEventListener('DOMContentLoaded', () => {
    const ts = document.getElementById('timestamp');
    if (ts) ts.value = new Date().toISOString();

    const lm = document.getElementById('lastModified');
    if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;

    const links = document.querySelectorAll('.info-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.dataset.modal;
            const dlg = document.getElementById(id);
            if (dlg && typeof dlg.showModal === 'function') {
                dlg.classList.remove('animate', 'closing');
                void dlg.offsetWidth; // force reflow
                dlg.classList.add('animate');
                dlg.showModal();
                const btn = dlg.querySelector('[data-close]') || dlg.querySelector('button');
                if (btn) btn.focus();
            }
        });
    });
    
    document.querySelectorAll('dialog.modal').forEach(dlg => {
        const closeModal = () => {
            dlg.classList.remove('animate');
            dlg.classList.add('closing');

            dlg.addEventListener('animationend', function handleClose() {
                dlg.close();
                dlg.classList.remove('closing');
                dlg.removeEventListener('animationend', handleClose);
            });
        };

        dlg.addEventListener('click', (e) => {
            const rect = dlg.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                closeModal();
            }
        });

        dlg.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        const closeBtn = dlg.querySelector('[data-close]');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    });
});