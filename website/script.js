// JavaScript for Janajyoti Vidyamandir Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                    } else if (index === 2) {
                        span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });

    // Live School Status Function
    function updateSchoolStatus() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Format time as HH:MM AM/PM
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        // School hours: 10:00 AM to 4:30 PM (Mon-Fri)
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const isWeekday = day >= 1 && day <= 5; // Monday to Friday
        const openTime = 10 * 60; // 10:00 AM in minutes
        const closeTime = 16 * 60 + 30; // 4:30 PM in minutes

        const isOpen = isWeekday && totalMinutes >= openTime && totalMinutes <= closeTime;

        // Update time display
        const currentTimeEl = document.getElementById('currentTime');
        if (currentTimeEl) {
            currentTimeEl.textContent = currentTime;
        }

        // Update status text
        const statusTextEl = document.getElementById('statusText');
        if (statusTextEl) {
            if (isOpen) {
                statusTextEl.textContent = 'School is Open';
                statusTextEl.className = 'status-text open';
            } else {
                statusTextEl.textContent = 'School is Closed';
                statusTextEl.className = 'status-text closed';
            }
        }

        // Update hours info (keeps the same text)
        const hoursInfoEl = document.getElementById('hoursInfo');
        if (hoursInfoEl) {
            hoursInfoEl.textContent = 'Office Hours: 10:00 AM – 4:30 PM';
        }

        // Also update hero status elements if they exist (for backward compatibility)
        const statusBadge2 = document.getElementById('heroStatusBadge');
        const statusTooltip2 = document.getElementById('heroStatusTooltip');

        if (isOpen) {
            if (statusBadge2) {
                statusBadge2.textContent = '🟢 School is Open';
                statusBadge2.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                statusBadge2.style.color = '#10b981';
            }
            if (statusTooltip2) {
                statusTooltip2.textContent = 'Office Hours: 10:00 AM – 4:30 PM';
            }
        } else {
            if (statusBadge2) {
                statusBadge2.textContent = '🔴 School is Closed';
                statusBadge2.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                statusBadge2.style.color = '#ef4444';
            }
            if (statusTooltip2) {
                statusTooltip2.textContent = 'Office Hours: 10:00 AM – 4:30 PM (Mon-Fri)';
            }
        }
    }

    // Update status immediately and then every minute
    updateSchoolStatus();
    setInterval(updateSchoolStatus, 60000); // Update every minute

    // Tab Switching for Login
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab content
            const tabId = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}Tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // Form Handling (Demo)
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show success message
            const formData = new FormData(admissionForm);
            alert('Thank you for your application! Our admissions team will contact you shortly.');
            admissionForm.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    });

    // Demo login functionality
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('studentPassword').value;

            if (studentId === 'student001' && password === 'password123') {
                alert('Login successful! Welcome to your student dashboard.');
                // Show dashboard
                const dashboard = document.getElementById('studentDashboard');
                if (dashboard) {
                    dashboard.style.display = 'block';
                }
                // In a real app, redirect to dashboard
                // window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials. Please try again or use demo login: student001 / password123');
            }
        });
    }

    const parentLoginForm = document.getElementById('parentLoginForm');
    if (parentLoginForm) {
        parentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const parentId = document.getElementById('parentId').value;
            const password = document.getElementById('parentPassword').value;

            if (parentId === 'parent001' && password === 'password123') {
                alert('Login successful! Welcome to your parent portal.');
                // Show dashboard
                const dashboard = document.getElementById('parentDashboard');
                if (dashboard) {
                    dashboard.style.display = 'block';
                }
                // In a real app, redirect to dashboard
                // window.location.href = 'parent-dashboard.html';
            } else {
                alert('Invalid credentials. Please try again or use demo login: parent001 / password123');
            }
        });
    }

    const teacherLoginForm = document.getElementById('teacherLoginForm');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const teacherId = document.getElementById('teacherId').value;
            const password = document.getElementById('teacherPassword').value;

            if (teacherId === 'teacher001' && password === 'password123') {
                alert('Login successful! Welcome to your teacher portal.');
                // Show dashboard
                const dashboard = document.getElementById('teacherDashboard');
                if (dashboard) {
                    dashboard.style.display = 'block';
                }
                // In a real app, redirect to dashboard
                // window.location.href = 'teacher-dashboard.html';
            } else {
                alert('Invalid credentials. Please try again or use demo login: teacher001 / password123');
            }
        });
    }

    // Dashboard buttons (demo functionality)
    const dashboardButtons = document.querySelectorAll('.dashboard-card button');
    dashboardButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Feature coming soon! This is a demo version.');
        });
    });

    // Gallery lightbox effect (simple implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const title = this.querySelector('.overlay h3').textContent;
            // In a real implementation, you would create a modal/lightbox here
            alert(`Viewing: ${title}\n(Image would be displayed in a lightbox)`);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Video placeholder click (demo)
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Playing school activities video... (Demo)');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');

            // Close other open items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Check for saved user preference or use system preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle.querySelector('i')) {
                themeToggle.querySelector('i').classList.remove('fa-moon');
                themeToggle.querySelector('i').classList.add('fa-sun');
            }
        } else if (currentTheme === 'light') {
            document.body.classList.remove('dark-mode');
            if (themeToggle.querySelector('i')) {
                themeToggle.querySelector('i').classList.remove('fa-sun');
                themeToggle.querySelector('i').classList.add('fa-moon');
            }
        } else {
            // No preference set, check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
                if (themeToggle.querySelector('i')) {
                    themeToggle.querySelector('i').classList.remove('fa-moon');
                    themeToggle.querySelector('i').classList.add('fa-sun');
                }
            }
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            // Update icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards for animation
    const elementsToAnimate = document.querySelectorAll('.section, .glass-effect, .card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Add animation class to elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .section:nth-child(1) .animate-in { transition-delay: 0.1s; }
        .section:nth-child(2) .animate-in { transition-delay: 0.2s; }
        .section:nth-child(3) .animate-in { transition-delay: 0.3s; }
        .section:nth-child(4) .animate-in { transition-delay: 0.4s; }
        .section:nth-child(5) .animate-in { transition-delay: 0.5s; }
        .section:nth-child(6) .animate-in { transition-delay: 0.6s; }
        .section:nth-child(7) .animate-in { transition-delay: 0.7s; }
        .section:nth-child(8) .animate-in { transition-delay: 0.8s; }
        .section:nth-child(9) .animate-in { transition-delay: 0.9s; }
    `;
    document.head.appendChild(style);

    // Add scroll-triggered animation
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer2 = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    document.querySelectorAll('.section, .glass-effect').forEach(el => {
        observer2.observe(el);
    });
});