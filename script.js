document.addEventListener("DOMContentLoaded", function () {
    // Ottieni riferimenti ai titoli
    const elementsToAnimate = [
        { id: "cli-title", text: "whoami", prompt: "gabriele@linux:~$ " },
        { id: "experiences-title", text: "cat education.log", prompt: "gabriele@linux:~$ " },
        { id: "work-title", text: "tail work_exp.log", prompt: "gabriele@linux:~$ " }
    ];

    // Anima ciascun elemento
    elementsToAnimate.forEach(elem => {
        const element = document.getElementById(elem.id);
        if (element) {
            // Assicurati che ogni elemento abbia la classe cli-title
            if (!element.classList.contains('cli-title')) {
                element.classList.add('cli-title');
            }
            // Inizializza l'elemento con solo il prompt e il cursore
            element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${elem.prompt}</span><span class="cursor">█</span>`;
            // Avvia l'animazione con il nuovo observer
            setupTypingAnimation(element, elem.text, elem.prompt);
        }
    });

    // Funzione per configurare l'animazione di digitazione con IntersectionObserver
    function setupTypingAnimation(element, text, prompt) {
        let animated = false;
        let currentAnimation = null;

        // Configura l'observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    // Avvia l'animazione
                    startTypingAnimation(element, text, prompt);
                } else if (!entry.isIntersecting) {
                    // Reset quando l'elemento esce dalla vista
                    animated = false;
                    // Ferma qualsiasi animazione in corso
                    if (currentAnimation) {
                        clearTimeout(currentAnimation);
                    }
                    // Reimposta l'elemento solo con il prompt
                    element.innerHTML = `<span class="prompt" style="color: #8BE9FD;">${prompt}</span><span class="cursor">█</span>`;
                }
            });
        }, { threshold: 0.2 });

        // Osserva l'elemento
        observer.observe(element);

        // Funzione di animazione di digitazione
        function startTypingAnimation(element, text, prompt) {
            let index = 0;
            let color = "#8BE9FD";
            if(element.id === "cli-title") {
                color = "#F1FA8C";
            }
            if(element.id === "experiences-title") {
                color = "#50FA7B";
            }
            if(element.id === "work-title") {
                color = "#BD93F9";
            }
            
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

    // Gestione dello scroll per la navbar
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Add to script.js
document.addEventListener("DOMContentLoaded", function () {
    // Existing code...

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
});

// Add to script.js
document.addEventListener("DOMContentLoaded", function () {
    // Existing code...

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('site-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark.matches)) {
        document.documentElement.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('site-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('site-theme', 'light');
        }
    });

    // Listen for system theme changes
    systemPrefersDark.addListener(function(e) {
        if (e.matches) {
            document.documentElement.classList.add('dark-theme');
            themeToggle.checked = true;
            localStorage.setItem('site-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            themeToggle.checked = false;
            localStorage.setItem('site-theme', 'light');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollIndicator = document.querySelector(".scroll-down");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add("hidden");
        } else {
            scrollIndicator.classList.remove("hidden");
        }
    });
});
