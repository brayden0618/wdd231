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