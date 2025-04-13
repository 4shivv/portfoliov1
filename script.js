document.addEventListener('DOMContentLoaded', () => {
    // ------------------------
    // LOADING SCREEN ANIMATION
    // ------------------------
    const loadingScreen = document.querySelector('.loading-screen');
    const editorApp = document.querySelector('.editor-app');
    
    // Add typewriter effect to loading terminal lines
    function animateTerminalLines() {
        const terminalOutput = document.querySelector('.terminal-output');
        const lines = Array.from(terminalOutput.querySelectorAll('.terminal-line:not(.typing-animation)'));
        
        let currentLineIndex = 0;
        
        function showNextLine() {
            if (currentLineIndex < lines.length) {
                const line = lines[currentLineIndex];
                line.style.display = 'block';
                currentLineIndex++;
                setTimeout(showNextLine, 500 + Math.random() * 500);
            }
        }
        
        // Hide all lines except the ones with typing-animation class
        lines.forEach(line => {
            line.style.display = 'none';
        });
        
        // Start showing lines after a short delay
        setTimeout(showNextLine, 800);
    }
    
    // Initialize loading animation
    animateTerminalLines();
    
    // Hide loading screen after animations complete
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            editorApp.classList.add('visible');
            initPortfolio();
        }, 500);
    }, 5000);
    
    // ------------------------
    // MAIN PORTFOLIO FUNCTIONS
    // ------------------------
    function initPortfolio() {
        // Initialize sections visibility
        initSectionVisibility();
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const appSidebar = document.getElementById('app-sidebar');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                appSidebar.classList.toggle('active');
                mobileMenuBtn.textContent = appSidebar.classList.contains('active') ? '✕' : '☰';
            });
        }
        
        // Navigation handling
        initNavigation();
        
        // Animate typing for all elements with typing-effect class
        animateTypingEffects();
        
        // Update current time in footer
        updateClock();
        setInterval(updateClock, 1000);
        
        // Initialize copy to clipboard functionality
        initCopyToClipboard();
        
        // Add cursor position random updater
        initCursorPosition();
        
        // Show code editor notification
        setTimeout(() => {
            showNotification('VS Code environment loaded successfully', 'success');
        }, 1000);
        
        // Simulate typing effect
        simulateTyping();
    }
    
    // Show initial sections and prepare animations
    function initSectionVisibility() {
        const sections = document.querySelectorAll('.section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate children
                    animateChildren(entry.target);
                    
                    // Unobserve after animation
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, options);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Animate children elements of a section
    function animateChildren(section) {
        // Animate education items
        section.querySelectorAll('.education-item').forEach(item => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 200);
        });
        
        // Animate skill groups
        section.querySelectorAll('.skill-group').forEach(group => {
            setTimeout(() => {
                group.classList.add('visible');
            }, 200 + parseInt(group.style.getPropertyValue('--group-index') || 0) * 100);
        });
        
        // Animate experience items
        section.querySelectorAll('.experience-item').forEach(item => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 200 + parseInt(item.style.getPropertyValue('--delay') || 0) * 100);
        });
        
        // Animate project items
        section.querySelectorAll('.project-item').forEach(item => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 200 + parseInt(item.style.getPropertyValue('--delay') || 0) * 100);
        });
    }
    
    // Setup navigation through sidebar
    function initNavigation() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                sidebarItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get the section to scroll to
                const sectionId = item.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                
                if (section) {
                    // Scroll to section
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // On mobile, hide sidebar after navigation
                    if (window.innerWidth <= 768) {
                        document.getElementById('app-sidebar').classList.remove('active');
                        document.getElementById('mobile-menu-btn').textContent = '☰';
                    }
                    
                    // Show notification for navigation
                    showNotification(`Navigated to ${sectionId}.js`, 'info');
                }
            });
        });
        
        // Activity bar navigation
        const activityIcons = document.querySelectorAll('.app-activity-icon');
        
        activityIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                // Remove active class from all icons
                activityIcons.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked icon
                icon.classList.add('active');
                
                // Handle view change
                const view = icon.getAttribute('data-view');
                
                // Show view switch notification
                showNotification(`Switched to ${view} view`, 'info');
            });
        });
        
        // Add scroll spy to update active sidebar item
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            document.querySelectorAll('.section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    sidebarItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-section') === sectionId) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // Animate typing effects
    function animateTypingEffects() {
        const header = document.querySelector('.header-subtitle');
        if (header) {
            const text = header.textContent;
            header.textContent = '';
            
            let charIndex = 0;
            const typingSpeed = 50;
            
            function typeNextChar() {
                if (charIndex < text.length) {
                    header.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextChar, typingSpeed);
                }
            }
            
            typeNextChar();
        }
    }
    
    // Update clock in footer
    function updateClock() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    
    // Initialize copy to clipboard functionality
    function initCopyToClipboard() {
        document.querySelectorAll('.copy-contact').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    
                    const textToCopy = element.getAttribute('href').includes('mailto:') 
                        ? element.getAttribute('href').replace('mailto:', '') 
                        : element.getAttribute('href').replace('tel:', '');
                    
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            showNotification(`Copied ${textToCopy} to clipboard`, 'success');
                        })
                        .catch(() => {
                            showNotification('Failed to copy text', 'error');
                        });
                }
            });
        });
    }
    
    // Initialize random cursor position updates
    function initCursorPosition() {
        const cursorPositionElement = document.getElementById('cursor-position');
        
        function updateRandomPosition() {
            const line = Math.floor(Math.random() * 100) + 1;
            const col = Math.floor(Math.random() * 80) + 1;
            
            cursorPositionElement.textContent = `Ln ${line}, Col ${col}`;
            
            // Schedule next update
            setTimeout(updateRandomPosition, 5000 + Math.random() * 10000);
        }
        
        // Start random updates
        updateRandomPosition();
    }
    
    // Simulate typing effect at random intervals
    function simulateTyping() {
        const editorLines = document.querySelectorAll('.app-editor-line');
        
        function getRandomLine() {
            const randomIndex = Math.floor(Math.random() * editorLines.length);
            return editorLines[randomIndex];
        }
        
        function simulateTypingOnLine() {
            const line = getRandomLine();
            line.classList.add('highlight');
            
            setTimeout(() => {
                line.classList.remove('highlight');
                
                // Schedule next typing simulation
                setTimeout(simulateTypingOnLine, 8000 + Math.random() * 15000);
            }, 2000 + Math.random() * 3000);
        }
        
        // Start typing simulation after a delay
        setTimeout(simulateTypingOnLine, 5000);
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification notification-${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});