// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-cta a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animation for timeline items
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .tech-group');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation classes to CSS if not already present
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .project-card, .tech-group {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .timeline-item.animate, .project-card.animate, .tech-group.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .timeline-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .tech-group:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .tech-group:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .header.scrolled {
            padding: 0.7rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    
    document.head.appendChild(style);

    // Simple form validation for contact form if added in the future
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation can be added here
            
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Typing effect for the hero section
    const typedText = document.querySelector('.hero-text h1 .highlight');
    
    if (typedText) {
        const originalText = typedText.textContent;
        typedText.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 100;
        
        function typeText() {
            if (charIndex < originalText.length) {
                typedText.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeText, 500);
    }
});
