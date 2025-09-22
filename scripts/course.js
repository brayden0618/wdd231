const courses = [
    { code: 'CSE 110', title: 'Introduction to Programming', credits: 2, description: 'Learn the basics of programming.', completed: true },
    { code: 'CSE 111', title: 'Programming with Functions', credits: 2, description: 'Understand functions in programming.', completed: true },
    { code: 'CSE 210', title: 'Programming with Classes', credits: 2, description: 'Learn about object-oriented programming.', completed: false },
    { code: 'WDD 130', title: 'Web Fundamentals', credits: 2, description: 'Introduction to web development.', completed: true },
    { code: 'WDD 131', title: 'Dynamic Web Fundamentals', credits: 2, description: 'Learn about dynamic web applications.', completed: true },
    { code: 'WDD 231', title: 'Frontend Development I', credits: 2, description: 'Introduction to frontend development.', completed: false }
];

const courseList = document.getElementById('course-list');
const creditTotal = document.getElementById('creditTotal');
const buttons = document.querySelectorAll('#filter-buttons button');
const courseDetailsDialog = document.getElementById('course-details');
const courseTitle = document.getElementById('courseTitle');
const courseCode = document.getElementById('courseCode');
const courseCredits = document.getElementById('courseCredits');
const courseDescription = document.getElementById('courseDescription');
const closeModal = document.getElementById('close-modal');

function renderCourses(filteredCourses) {
    courseList.innerHTML = ''; 

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) card.classList.add('completed');

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;

        courseList.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = totalCredits
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

// Dialog functionality
courseList.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    if (!card) return;

    const course = courses.find(c => c.code === card.querySelector('h3').textContent);
    if (!course) return;

    courseTitle.textContent = course.title;
    courseCode.textContent = course.code;
    courseCredits.textContent = course.credits;
    courseDescription.textContent = course.description;

    courseDetailsDialog.showModal();
});

closeModal.addEventListener('click', () => {
    courseDetailsDialog.close();
});