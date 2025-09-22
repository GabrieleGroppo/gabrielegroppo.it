// ========================================
// ANIMAZIONI DI DIGITAZIONE CLI
// ========================================

function initTypingAnimations() {
    // Definisce tutti gli elementi da animare
    const elementsToAnimate = [
        { id: "cli-title", text: "whoami", prompt: "gabriele@linux:~$ ", color: "#F1FA8C" },
        { id: "experiences-title", text: "cat education.log", prompt: "gabriele@linux:~$ ", color: "#50FA7B" },
        { id: "work-title", text: "tail work_exp.log", prompt: "gabriele@linux:~$ ", color: "#BD93F9" },
        { id: "volunteer-title", text: "cat volunteer.md", prompt: "gabriele@linux:~$ ", color: "#FF6B6B" }
    ];

    // Configura l'animazione per ogni elemento
    elementsToAnimate.forEach(elem => {
        const element = document.getElementById(elem.id);
        if (element) {
            // Assicura che abbia la classe corretta
            if (!element.classList.contains('cli-title')) {
                element.classList.add('cli-title');
            }
            // Inizializza con prompt e cursore
            element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${elem.prompt}</span><span class="cursor">█</span>`;
            // Configura l'animazione
            setupTypingAnimation(element, elem.text, elem.prompt, elem.color);
        }
    });
}

function setupTypingAnimation(element, text, prompt, color) {
    let animated = false;
    let currentAnimation = null;

    // Configura l'observer per l'animazione al scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                startTypingAnimation(element, text, prompt, color);
            } else if (!entry.isIntersecting) {
                // Reset quando esce dalla vista
                animated = false;
                if (currentAnimation) {
                    clearTimeout(currentAnimation);
                    currentAnimation = null;
                }
                // Reimposta solo con il prompt
                element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${prompt}</span><span class="cursor">█</span>`;
            }
        });
    }, { threshold: 0.2 });

    observer.observe(element);

    function startTypingAnimation(element, text, prompt, color) {
        let index = 0;

        function typeNextCharacter() {
            if (index < text.length) {
                element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${prompt}</span><span style="color: ${color};">${text.substring(0, index + 1)}</span><span class="cursor" style="color: ${color}">█</span>`;
                index++;
                currentAnimation = setTimeout(typeNextCharacter, 100);
            } else {
                element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${prompt}</span><span style="color: ${color};">${text}</span><span class="cursor" style="color: ${color}">█</span>`;
            }
        }

        // Avvia con un piccolo ritardo
        currentAnimation = setTimeout(typeNextCharacter, 300);
    }
}

// ========================================
// MENU MOBILE
// ========================================

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuToggle || !mobileMenuOverlay) return;

    // Toggle del menu mobile
    mobileMenuToggle.addEventListener('click', function () {
        mobileMenuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Chiude il menu quando si clicca su un link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
}

// ========================================
// TOGGLE TEMA
// ========================================

function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle-button');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (!themeButton || !sunIcon || !moonIcon) return;

    const savedTheme = localStorage.getItem('site-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(dark) {
        if (dark) {
            document.documentElement.classList.add('dark-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
            localStorage.setItem('site-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
            localStorage.setItem('site-theme', 'light');
        }
    }

    // Imposta il tema iniziale
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark.matches)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeButton.addEventListener('click', function () {
        const isDark = document.documentElement.classList.contains('dark-theme');
        setTheme(!isDark);
    });

    systemPrefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem('site-theme')) {
            setTheme(e.matches);
        }
    });
}

// ========================================
// EFFETTI DI SCROLL
// ========================================

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-down');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Gestione navbar
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Gestione indicatore di scroll
        if (scrollIndicator) {
            if (scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

// ========================================
// TERMS MODAL
// ========================================

function openTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
document.getElementById('termsModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeTermsModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeTermsModal();
    }
});

// Particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        particle.style.left = Math.random() * 100 + '%';

        // Random delay
        particle.style.animationDelay = Math.random() * 8 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle-button');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (!themeButton || !sunIcon || !moonIcon) return;

    const savedTheme = localStorage.getItem('site-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(dark) {
        if (dark) {
            document.documentElement.classList.add('dark-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
            localStorage.setItem('site-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
            localStorage.setItem('site-theme', 'light');
        }
    }

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark.matches)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeButton.addEventListener('click', function () {
        const isDark = document.documentElement.classList.contains('dark-theme');
        setTheme(!isDark);
    });

    systemPrefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem('site-theme')) {
            setTheme(e.matches);
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.scroll-down');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Navbar effects
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll indicator
        if (scrollIndicator) {
            if (scrollY > 100) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initThemeToggle();
    initScrollEffects();
    initSmoothScroll();
});