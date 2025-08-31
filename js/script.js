/**
 * Robot Lions VEX Robotics Team Website JavaScript
 * Handles tab navigation and interactive functionality
 */

class TabManager {
    constructor() {
        this.tabLinks = document.querySelectorAll('.tab-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleInitialHash();
    }

    bindEvents() {
        this.tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.getAttribute('data-tab');
                this.switchTab(targetTab);
                this.updateUrl(targetTab);
            });
        });

        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }

    switchTab(targetTab) {
        this.hideAllTabs();
        this.removeActiveStates();
        this.showTab(targetTab);
        this.setActiveState(targetTab);
        
        // Prevent scrolling and keep header visible
        window.scrollTo(0, 0);
    }

    hideAllTabs() {
        this.tabContents.forEach(content => {
            content.classList.remove('active');
        });
    }

    removeActiveStates() {
        this.tabLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    showTab(tabName) {
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
            this.animateTab(targetContent);
        }
    }

    setActiveState(tabName) {
        const targetLink = document.querySelector(`[data-tab="${tabName}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    animateTab(tabElement) {
        tabElement.style.opacity = '0';
        tabElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tabElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            tabElement.style.opacity = '1';
            tabElement.style.transform = 'translateY(0)';
        }, 50);
    }

    updateUrl(tabName) {
        if (tabName !== 'home') {
            history.pushState(null, null, `#${tabName}`);
        } else {
            history.pushState(null, null, window.location.pathname);
        }
    }

    handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && ['home', 'schedule', 'journal'].includes(hash)) {
            this.switchTab(hash);
        } else {
            this.switchTab('home');
        }
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && ['home', 'schedule', 'journal'].includes(hash)) {
            this.switchTab(hash);
        } else {
            this.switchTab('home');
        }
    }
}

class ScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.addSmoothScrolling();
        this.addScrollToTop();
    }

    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target && target.offsetParent !== null) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addScrollToTop() {
        const scrollTopButton = this.createScrollTopButton();
        document.body.appendChild(scrollTopButton);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-top-btn';
        button.setAttribute('aria-label', 'Scroll to top');
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-blue);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                z-index: 1000;
            }
            
            .scroll-top-btn.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-top-btn:hover {
                background: var(--accent-blue);
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
            }
            
            .scroll-top-btn:active {
                transform: translateY(-1px);
            }
        `;
        
        if (!document.querySelector('style[data-scroll-btn]')) {
            style.setAttribute('data-scroll-btn', 'true');
            document.head.appendChild(style);
        }
        
        return button;
    }
}

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.card, .event, .journal-entry').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

class UtilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addAccessibility();
        this.logTeamInfo();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        const style = document.createElement('style');
        style.textContent = `
            .keyboard-nav *:focus {
                outline: 2px solid var(--primary-blue) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    addAccessibility() {
        document.querySelectorAll('.tab-link').forEach(link => {
            link.setAttribute('role', 'tab');
            link.setAttribute('aria-selected', link.classList.contains('active') ? 'true' : 'false');
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-hidden', content.classList.contains('active') ? 'false' : 'true');
        });
    }

    logTeamInfo() {
        console.log(`
    🦁 Robot Lions VEX Robotics Team Website
    ========================================
    Version: 1.0.0
    Built with: Vanilla HTML, CSS, and JavaScript
    Theme: Light Blue & White
    Features: Tab navigation, responsive design, animations
    
    Go Robot Lions! 🏆
        `);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TabManager();
    new ScrollManager();
    new AnimationManager();
    new UtilityManager();
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) * {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
});