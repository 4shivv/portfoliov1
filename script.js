// DOM Elements
const progressBar = document.getElementById('progress-bar');
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const typingText = document.getElementById('typing-text');
const backToTop = document.querySelector('.back-to-top');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Typing effect text options
const typingOptions = ['CS Student', 'Full-Stack Dev', 'Problem Solver', 'AI Enthusiast'];
let optionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

// Theme initialization
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// ===== Event Listeners =====

// Load event
window.addEventListener('load', () => {
    // Initialize progress bar
    updateProgressBar();
    
    // Initialize active nav link
    setActiveNavLink();
    
    // Start typing effect
    typeWriter();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Trigger animations
    fadeInElements();
});

// Scroll event
window.addEventListener('scroll', () => {
    // Update progress bar
    updateProgressBar();
    
    // Toggle navbar visibility
    toggleNavbar();
    
    // Update active nav link
    setActiveNavLink();
    
    // Trigger animations for visible elements
    fadeInElements();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Mobile menu
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-xmark');
});

// Scroll to section from navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.hasAttribute('target')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        }
    });
});

// Scroll indicator click
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            window.scrollTo({
                top: skillsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// Back to top
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Functions =====

// Update progress bar
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Add pulse effect when reaching sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const position = section.getBoundingClientRect();
        if (position.top < 100 && position.bottom > 100) {
            progressBar.classList.add('pulse');
            setTimeout(() => {
                progressBar.classList.remove('pulse');
            }, 500);
        }
    });
}

// Toggle navbar visibility
let lastScrollTop = 0;
function toggleNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 150) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScrollTop && currentScroll > 300) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Set active nav link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Typing effect
function typeWriter() {
    const currentOption = typingOptions[optionIndex];
    
    if (isDeleting) {
        // Delete text
        typingText.textContent = currentOption.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            optionIndex = (optionIndex + 1) % typingOptions.length;
            typingTimeout = setTimeout(typeWriter, 500);
            return;
        }
        
        typingTimeout = setTimeout(typeWriter, 50);
    } else {
        // Type text
        typingText.textContent = currentOption.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentOption.length) {
            isDeleting = true;
            typingTimeout = setTimeout(typeWriter, 1500);
            return;
        }
        
        typingTimeout = setTimeout(typeWriter, 150);
    }
}

// Initialize skill bars
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        // Start animation when visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = percent;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Fade in animations for elements
function fadeInElements() {
    const fadeElements = document.querySelectorAll('.section-title, .skill-category, .project-card, .timeline-item, .contact-info-section');
    
    fadeElements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
}

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    const header = card.querySelector('.project-header');
    const link = card.querySelector('.project-link');
    
    if (link) {
        card.addEventListener('mouseenter', () => {
            link.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            link.style.opacity = '0.7';
        });
    }
});
