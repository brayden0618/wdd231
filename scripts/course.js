const courses = [
    { code: 'CSE 110', name: 'Introduction to Programming', credits: 2, completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: true },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: false },
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 231', name: 'Frontend Development I', credits: 2, completed: false }
];

const courseList = document.getElementById('course-list');
const creditTotal = document.getElementById('creditTotal');
const buttons = document.querySelectorAll('#filter-buttons button');

function renderCourses(filteredCourses) {
    courseList.innerHTML = ''; 
    let totalCredits = 0;

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) card.classList.add('completed');

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;

        totalCredits += course.credits;
        courseList.appendChild(card);
    });

    creditTotal.textContent = totalCredits;
}

// Filter 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        let filtered;

        if (filter === 'wdd') {
            filtered = courses.filter(c => c.code.startsWith('WDD'));
        } else if (filter === 'cse') {
            filtered = courses.filter(c => c.code.startsWith('CSE'));
        } else {
            filtered = [...courses];
        }

        renderCourses(filtered);
    });
});

// Default display
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
});