"// Main JavaScript for Portfolio
const API_URL = window.location.origin;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    populateData();
    initContactForm();
    initScrollAnimations();
    setCurrentYear();
});

// Navigation
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.setAttribute('data-lucide', navMenu.classList.contains('active') ? 'x' : 'menu');
        lucide.createIcons();
    });

    // Smooth scroll and close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navMenu.classList.remove('active');
                lucide.createIcons();
            }
        });
    });
}

// Populate data from mock
function populateData() {
    populateStats();
    populateSkills();
    populateProjects();
    populateAchievements();
    populateCompetitiveProgramming();
}

function populateStats() {
    const statsGrid = document.getElementById('statsGrid');
    portfolioData.about.stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class=\"stat-value\">${stat.value}</div>
            <div class=\"stat-label\">${stat.label}</div>
        `;
        statsGrid.appendChild(statCard);
    });
}

function populateSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    Object.values(portfolioData.skills).forEach(category => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class=\"skill-header\">
                <i data-lucide=\"${category.icon}\" class=\"skill-icon ${category.color}\"></i>
                <h3>${category.title}</h3>
            </div>
            <div class=\"skill-tags\">
                ${category.skills.map(skill => `<span class=\"skill-tag\">${skill}</span>`).join('')}
            </div>
        `;
        skillsGrid.appendChild(skillCard);
    });
    lucide.createIcons();
}

function populateProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class=\"project-content\">
                <div class=\"project-video\">
                    <video controls>
                        <source src=\"${project.videoUrl}\" type=\"video/mp4\">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class=\"project-details\">
                    <div class=\"project-context\">${project.context}</div>
                    <h3 class=\"project-title\">${project.title}</h3>
                    <p class=\"project-description\">${project.description}</p>
                    <div class=\"project-section\">
                        <h4>Technologies Used:</h4>
                        <div class=\"tech-tags\">
                            ${project.technologies.map(tech => `<span class=\"tech-tag\">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class=\"project-section\">
                        <h4>Key Features:</h4>
                        <ul class=\"feature-list\">
                            ${project.features.map(feature => `
                                <li>
                                    <i data-lucide=\"check-circle-2\"></i>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
    lucide.createIcons();
}

function populateAchievements() {
    const hackathonsContainer = document.getElementById('hackathonsContainer');
    const competitionsContainer = document.getElementById('competitionsContainer');
    
    portfolioData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
        `;
        
        if (achievement.category === 'hackathon') {
            hackathonsContainer.appendChild(achievementCard);
        } else {
            competitionsContainer.appendChild(achievementCard);
        }
    });
}

function populateCompetitiveProgramming() {
    const codechefCard = document.getElementById('codechefCard');
    const cp = portfolioData.competitiveProgramming.codechef;
    
    codechefCard.innerHTML = `
        <div class=\"card-header\">
            <i data-lucide=\"code-2\"></i>
            <h3>CodeChef Profile</h3>
        </div>
        <div class=\"codechef-stats\">
            <div class=\"stat-item\">
                <label>Username</label>
                <a href=\"https://www.codechef.com/users/${cp.username}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"codechef-username\">
                    ${cp.username}
                </a>
            </div>
            <div class=\"stat-item\">
                <label>
                    <i data-lucide=\"trending-up\"></i>
                    Current Rating
                </label>
                <div class=\"rating-value\">${cp.rating}</div>
            </div>
        </div>
        <div class=\"contest-info\">
            <i data-lucide=\"calendar\"></i>
            <p>${cp.contests}</p>
        </div>
    `;
    
    const activitiesContainer = document.getElementById('activitiesContainer');
    portfolioData.competitiveProgramming.activities.forEach(activity => {
        const activityTag = document.createElement('span');
        activityTag.className = 'activity-tag';
        activityTag.textContent = activity;
        activitiesContainer.appendChild(activityTag);
    });
    
    lucide.createIcons();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitText = document.getElementById('submitText');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value
        };

        // Show loading state
        submitText.textContent = 'Sending...';
        contactForm.querySelector('button').disabled = true;

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showToast(data.error || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again later.', 'error');
        } finally {
            submitText.textContent = 'Send Message';
            contactForm.querySelector('button').disabled = false;
        }
    });
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.stat-card, .skill-card, .project-card, .achievement-card').forEach(card => {
        observer.observe(card);
    });
}

// Set current year in footer
function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}
"