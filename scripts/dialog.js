function displayCourseDetails(course) {
    const dialog = document.getElementById('course-details');
    dialog.innerHTML = `
        <h2>${course.code} - ${course.name}</h2>
        <p>Credits: ${course.credits}</p>
        <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
        <button id="close-dialog">Close</button>
    `;
    dialog.showModal();

    document.getElementById('close-dialog').addEventListener('click', () => {
        dialog.close();
    });
}