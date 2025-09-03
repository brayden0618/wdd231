document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('nav-button');
    const nav = document.querySelector('nav');

    navButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        navButton.classList.toggle("open");
    })
})