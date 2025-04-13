document.addEventListener('DOMContentLoaded', () => {
    // Theme handling
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
    
    // Loading screen with typing animation
    const loadingScreen = document.getElementById('loading-screen');
    const typingTextContainer = document.getElementById('typing-text');
    
    function typeText() {
        const text = "Hello! I'm Shivaganesh.\nSoftware Engineer & CS Student\n\nLoading portfolio...\nInitializing systems...\nMounting components...\nRendering interface...\n\nWelcome!";
        let charIndex = 0;
        
        function type() {
            if (charIndex < text.length) {
                if (text.charAt(charIndex) === '\n') {
                    typingTextContainer.innerHTML += '<br>';
                } else {
                    const span = document.createElement('span');
                    span.textContent = text.charAt(charIndex);
                    span.style.animationDelay = `${charIndex * 25}ms`;
                    typingTextContainer.appendChild(span);
                }
                charIndex++;
                setTimeout(type, 25);
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        
                        // Animate sections once loading is complete
                        animateOnScroll();
                        window.addEventListener('scroll', animateOnScroll);
                    }, 800);
                }, 800);
            }
        }
        
        type();
    }
    
    // Start typing animation
    setTimeout(typeText, 500);
    
    // Scroll progress bar
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        
        // Apply a slight delay with requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
            progressBar.style.width = scrollPercentage + '%';
            
            // Add a pulse animation when reaching milestones
            if (scrollPercentage > 25 && scrollPercentage < 26 || 
                scrollPercentage > 50 && scrollPercentage < 51 || 
                scrollPercentage > 75 && scrollPercentage < 76 || 
                scrollPercentage > 95 && scrollPercentage < 96) {
                progressBar.classList.add('pulse');
                setTimeout(() => {
                    progressBar.classList.remove('pulse');
                }, 800);
            }
        });
    }
    
    window.addEventListener('scroll', updateProgressBar);
    
    // Hide/show navbar on scroll
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    function handleNavbar() {
        const scrollY = window.scrollY;
        
        // Show navbar at top of page or when scrolling up
        if (scrollY < 150 || scrollY < lastScrollY) {
            navbar.classList.remove('hidden');
        } else {
            navbar.classList.add('hidden');
        }
        
        lastScrollY = scrollY;
    }
    
    window.addEventListener('scroll', handleNavbar);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Function to animate sections when they come into view
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach((section, sectionIndex) => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                // Add a staggered delay based on section index for smoother transitions
                setTimeout(() => {
                    section.classList.add('visible');
                    
                    // Animate list items within the section
                    const listItems = section.querySelectorAll('.achievements li, .project-details li');
                    listItems.forEach((item, index) => {
                        item.style.setProperty('--i', index);
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 300 + (index * 100));
                    });
                    
                    // Animate About Me paragraphs
                    if (section.id === 'about-me') {
                        const paragraphs = section.querySelectorAll('.about-me p');
                        paragraphs.forEach((paragraph, index) => {
                            setTimeout(() => {
                                paragraph.classList.add('visible');
                            }, 300 + (index * 150));
                        });
                    }
                    
                    // Animate skill categories with staggered delay
                    if (section.id === 'skills') {
                        const skillCategories = section.querySelectorAll('.skill-category');
                        skillCategories.forEach((category, index) => {
                            setTimeout(() => {
                                category.classList.add('visible');
                            }, 150 * index);
                        });
                    }
                }, sectionIndex * 100);  // Staggered delay between sections
            }
        });
    }
    
    // Highlight active section in navbar
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        // Find the current section
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinkItems.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Special case for header
        if (scrollY < document.querySelector('section').offsetTop - 100) {
            navLinkItems.forEach(link => link.classList.remove('active'));
        }
    }
    
    window.addEventListener('scroll', highlightNavigation);
});
