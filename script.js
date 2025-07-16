document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    const totalCredits = 148; // Sum of all credits in the curriculum
    let approvedCredits = 0;

    // Initialize course states
    updateCourseStates();

    courses.forEach(course => {
        course.addEventListener('click', () => {
            if (!course.classList.contains('locked')) {
                course.classList.toggle('approved');
                updateCredits();
                updateCourseStates();
            }
        });
    });

    function updateCredits() {
        approvedCredits = 0;
        document.querySelectorAll('.course.approved').forEach(course => {
            const creditsText = course.textContent.match(/\((\d+) créditos\)/);
            if (creditsText) {
                approvedCredits += parseInt(creditsText[1]);
            }
        });
    }

    function updateCourseStates() {
        const approvedCourses = Array.from(document.querySelectorAll('.course.approved')).map(c => c.dataset.id);
        const approvedPercentage = (approvedCredits / totalCredits) * 100;

        courses.forEach(course => {
            const prerequisites = course.dataset.prerequisites ? course.dataset.prerequisites.split(',') : [];
            let isLocked = false;

            // Check individual course prerequisites
            for (let prereq of prerequisites) {
                if (prereq === '60_percent' && approvedPercentage < 60) {
                    isLocked = true;
                    break;
                } else if (prereq === '70_percent' && approvedPercentage < 70) {
                    isLocked = true;
                    break;
                } else if (prereq && !approvedCourses.includes(prereq)) {
                    isLocked = true;
                    break;
                }
            }

            course.classList.toggle('locked', isLocked);
        });
    }
});
