// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Navbar Toggling for Mobile ---
    const hamburger = document.getElementById('hamburger');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (hamburger && mobileNavMenu) {
        hamburger.addEventListener('click', () => {
            mobileNavMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }
// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (hamburger && mobileNavMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNavMenu.classList.toggle('active');

            // Optional: Prevent body scroll when menu is open (UX better)
            document.body.classList.toggle('overflow-hidden');
        });
    }
});

    // --- Home Page Slideshow (if on index.html) ---
    const slideshowImages = document.querySelectorAll('.background-slideshow img');
    let currentImageIndex = 0;

    function startSlideshow() {
        if (slideshowImages.length > 0) {
            setInterval(() => {
                slideshowImages[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                slideshowImages[currentImageIndex].classList.add('active');
            }, 5000); // Change image every 5 seconds
        }
    }

    if (document.querySelector('.background-slideshow')) { // Check if on the homepage
        startSlideshow();
    }


    // --- Register Page Logic (if on register.html) ---
    const registrationForm = document.getElementById('registrationForm');
    const courseLevelSelect = document.getElementById('courseLevel');
    const classAvailabilityDiv = document.getElementById('classAvailability');

    if (registrationForm && courseLevelSelect && classAvailabilityDiv) {
        // Pre-fill course level if coming from courses page or test page
        const urlParams = new URLSearchParams(window.location.search);
        const prefilledLevel = urlParams.get('level');
        if (prefilledLevel) {
            courseLevelSelect.value = prefilledLevel;
            updateClassAvailability(); // Update availability immediately if prefilled
        }

        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const middleName = document.getElementById('middleName').value;
            const lastName = document.getElementById('lastName').value;
            const age = document.getElementById('age').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const gender = document.getElementById('gender').value;
            const courseLevel = document.getElementById('courseLevel').value;

            // WhatsApp message format
            const message = `Hello Oxford Institute,I want to register for ${courseLevel}\nName: ${firstName} ${middleName} ${lastName}\nAge: ${age}\nLocation: ${address}\nPhone: ${phone}\nGender: ${gender}`;
            const whatsappNumber = "+252617619131";
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappLink, '_blank');

            alert('Your registration details have been prepared for WhatsApp. Please send the message.');
            registrationForm.reset(); // Clear the form after submission attempt
            classAvailabilityDiv.innerHTML = '<p class="text-center text-gray-600">Select a course level above to check availability.</p>'; // Reset availability message
        });

        courseLevelSelect.addEventListener('change', updateClassAvailability);
    }

    function updateClassAvailability() {
        const selectedLevel = courseLevelSelect.value;
        if (!selectedLevel) {
            classAvailabilityDiv.innerHTML = '<p class="text-center text-gray-600">Select a course level above to check availability.</p>';
            return;
        }

        // Simulate availability (This would come from a backend in a real application)
        const availability = {
            'Beginner': 'Available',
            'Elementary': 'Full',
            'Pre-Intermediate': 'Available',
            'Intermediate': 'Available',
            'Advanced': 'Full'
        };

        const status = availability[selectedLevel] || 'Unknown';
        let statusColor = '';
        if (status === 'Available') {
            statusColor = 'text-green-600';
        } else if (status === 'Full') {
            statusColor = 'text-red-600';
        } else {
            statusColor = 'text-gray-600';
        }

        classAvailabilityDiv.innerHTML = `
            <p class="text-lg font-semibold mb-2">Course: ${selectedLevel}</p>
            <p class="text-xl font-bold ${statusColor}">Status: ${status}</p>
        `;
    }


    // --- Test Page Logic (if on test.html) ---
    const levelTestForm = document.getElementById('levelTestForm');
    const testResultsDiv = document.getElementById('testResults');
    const estimatedLevelSpan = document.getElementById('estimatedLevel');
    const recommendationLink = document.getElementById('recommendationLink');

    const questions = [
        {
            type: 'fill_in_blank',
            question: "She ___ to the park every day.",
            options: ["go", "goes", "going", "went"],
            answer: "goes"
        },
        {
            type: 'choose_word',
            question: "I have ___ apples than you.",
            options: ["less", "fewer", "little", "much"],
            answer: "fewer"
        },
        {
            type: 'correct_incorrect',
            question: "The cat is on the table.",
            isCorrect: true
        },
        {
            type: 'fill_in_blank',
            question: "They ___ playing football now.",
            options: ["is", "are", "am", "be"],
            answer: "are"
        },
        {
            type: 'choose_word',
            question: "Can you please give me ___ water?",
            options: ["a few", "many", "some", "every"],
            answer: "some"
        },
        {
            type: 'correct_incorrect',
            question: "He don't like coffee.",
            isCorrect: false
        },
        {
            type: 'fill_in_blank',
            question: "She ___ finished her homework.",
            options: ["has", "have", "had", "will"],
            answer: "has"
        },
        {
            type: 'choose_word',
            question: "This is ___ interesting book.",
            options: ["a", "an", "the", "no article"],
            answer: "an"
        },
        {
            type: 'correct_incorrect',
            question: "I will call you when I arrive.",
            isCorrect: true
        },
        {
            type: 'fill_in_blank',
            question: "If I ___ a bird, I would fly.",
            options: ["was", "were", "am", "is"],
            answer: "were"
        }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function renderQuestions() {
        if (!levelTestForm) return; // Exit if not on the test page

        shuffleArray(questions); // Randomize questions order
        levelTestForm.innerHTML = ''; // Clear previous questions

        questions.slice(0, 10).forEach((q, index) => {
            let questionHtml = `<div class="mb-6 p-4 border rounded-lg bg-gray-50">
                                    <p class="text-lg font-semibold mb-3">Question ${index + 1}: ${q.question}</p>`;

            if (q.type === 'fill_in_blank' || q.type === 'choose_word') {
                q.options.forEach((option) => {
                    questionHtml += `
                        <label class="inline-flex items-center mr-4 mb-2">
                            <input type="radio" name="question${index}" value="${option}" class="form-radio text-blue-600" required>
                            <span class="ml-2 text-gray-700">${option}</span>
                        </label>`;
                });
            } else if (q.type === 'correct_incorrect') {
                questionHtml += `
                    <label class="inline-flex items-center mr-4 mb-2">
                        <input type="radio" name="question${index}" value="correct" class="form-radio text-blue-600" required>
                        <span class="ml-2 text-gray-700">Correct</span>
                    </label>
                    <label class="inline-flex items-center mb-2">
                        <input type="radio" name="question${index}" value="incorrect" class="form-radio text-blue-600" required>
                        <span class="ml-2 text-gray-700">Incorrect</span>
                    </label>`;
            }
            questionHtml += `</div>`;
            levelTestForm.innerHTML += questionHtml;
        });
    }

    function calculateLevel(score) {
        if (score >= 9) return 'Advanced';
        if (score >= 7) return 'Intermediate';
        if (score >= 5) return 'Pre-Intermediate';
        if (score >= 3) return 'Elementary';
        return 'Beginner';
    }

    function getRecommendationLink(level) {
        return `register.html?level=${level}`;
    }

    if (levelTestForm) {
        renderQuestions(); // Render questions when on the test page

        levelTestForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let score = 0;
            const userAnswers = {};

            questions.slice(0, 10).forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedOption) {
                    userAnswers[index] = selectedOption.value;

                    if (q.type === 'fill_in_blank' || q.type === 'choose_word') {
                        if (selectedOption.value === q.answer) {
                            score++;
                        }
                    } else if (q.type === 'correct_incorrect') {
                        const isUserCorrect = selectedOption.value === 'correct'; // User thinks it's correct
                        if (isUserCorrect === q.isCorrect) { // Compare with actual correctness
                            score++;
                        }
                    }
                }
            });

            const estimatedLevel = calculateLevel(score);
            estimatedLevelSpan.textContent = estimatedLevel;
            recommendationLink.href = getRecommendationLink(estimatedLevel);
            testResultsDiv.classList.remove('hidden');

            // Scroll to results
            testResultsDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Admin Page Logic (if on admin.html) ---
    const adminPageElements = {
        showAddCourseBtn: document.getElementById('showAddCourse'),
        showManageStudentsBtn: document.getElementById('showManageStudents'),
        showManageCoursesBtn: document.getElementById('showManageCourses'),
        addCourseSection: document.getElementById('addCourseSection'),
        manageStudentsSection: document.getElementById('manageStudentsSection'),
        manageCoursesSection: document.getElementById('manageCoursesSection'),
        addCourseForm: document.getElementById('addCourseForm'),
        addCourseMessage: document.getElementById('addCourseMessage'),
        studentList: document.getElementById('studentList'), // Placeholder for simulated students
        courseList: document.getElementById('courseList')     // Placeholder for simulated courses
    };

    if (adminPageElements.showAddCourseBtn) { // Check if on admin page
        const adminSections = document.querySelectorAll('.admin-section');

        function hideAllAdminSections() {
            adminSections.forEach(section => section.classList.add('hidden'));
        }

        adminPageElements.showAddCourseBtn.addEventListener('click', () => {
            hideAllAdminSections();
            adminPageElements.addCourseSection.classList.remove('hidden');
        });

        adminPageElements.showManageStudentsBtn.addEventListener('click', () => {
            hideAllAdminSections();
            adminPageElements.manageStudentsSection.classList.remove('hidden');
        });

        adminPageElements.showManageCoursesBtn.addEventListener('click', () => {
            hideAllAdminSections();
            adminPageElements.manageCoursesSection.classList.remove('hidden');
        });

        if (adminPageElements.addCourseForm) {
            adminPageElements.addCourseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('newCourseTitle').value;
                const description = document.getElementById('newCourseDescription').value;
                const duration = document.getElementById('newCourseDuration').value;

                adminPageElements.addCourseMessage.textContent = `Simulated: Added course "${title}" (${duration}). (No actual data saved)`;
                adminPageElements.addCourseMessage.className = 'mt-4 text-center text-green-600 font-bold';
                adminPageElements.addCourseForm.reset();
            });
        }
    }


    // --- Attendance Page Logic (if on attendance.html) ---
    const attendanceLoginForm = document.getElementById('attendanceLoginForm');
    const attendanceSection = document.getElementById('attendanceSection');
    const loginMessage = document.getElementById('loginMessage');
    const currentClassSpan = document.getElementById('currentClass');
    const studentListForAttendance = document.getElementById('studentListForAttendance');

    const TEACHER_PASSWORD = 'oxford@@131';
    const SECURE_CODE = '244576'; // Stored client-side for simulation ONLY

    // Simulated student data (would come from backend in real app)
    const simulatedStudents = {
        'Beginner-Morning': [
            { id: 1, name: 'Aisha Omar' },
            { id: 2, name: 'Ahmed Farah' },
            { id: 3, name: 'Sara Ali' }
        ],
        'Intermediate-Evening': [
            { id: 4, name: 'Mohamed Said' },
            { id: 5, name: 'Fatima Jama' },
            { id: 6, name: 'Abdullahi Nur' }
        ],
        'Advanced-Weekend': [
            { id: 7, name: 'Hawa Abdi' },
            { id: 8, name: 'Yusuf Hassan' }
        ]
    };

    if (attendanceLoginForm) { // Check if on attendance page
        attendanceLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const classSelected = document.getElementById('classSelect').value;
            const passwordInput = document.getElementById('teacherPassword').value;
            const codeInput = document.getElementById('secureCode').value;

            if (passwordInput === TEACHER_PASSWORD && codeInput === SECURE_CODE) {
                loginMessage.textContent = '';
                attendanceLoginForm.classList.add('hidden');
                attendanceSection.classList.remove('hidden');
                currentClassSpan.textContent = classSelected;
                renderStudentList(classSelected);
            } else {
                loginMessage.textContent = 'Invalid class, password, or secure code.';
            }
        });
    }

    function renderStudentList(className) {
        studentListForAttendance.innerHTML = '';
        const students = simulatedStudents[className] || [];

        if (students.length === 0) {
            studentListForAttendance.innerHTML = '<p class="text-center text-gray-600">No students found for this class.</p>';
            return;
        }

        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm';
            studentDiv.innerHTML = `
                <span class="text-lg font-medium mb-2 sm:mb-0">${student.name}</span>
                <div class="flex space-x-2">
                    <button class="mark-attendance-btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300" data-status="Present">Present</button>
                    <button class="mark-attendance-btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300" data-status="Absent">Absent</button>
                </div>
            `;
            studentListForAttendance.appendChild(studentDiv);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.mark-attendance-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const studentName = e.target.closest('div.flex.flex-col').querySelector('span').textContent;
                const status = e.target.dataset.status;
                alert(`Simulated: Marked ${studentName} as ${status}. (No actual attendance saved)`);
                // In a real app, you'd send this data to your backend
            });
        });
    }
});
