// Inizializza il caricamento dei repository GitHub
window.onload = fetchGitHubRepos;

document.addEventListener("DOMContentLoaded", function () {
    // Inizializza tutte le funzionalità
    initTypingAnimations();
    initMobileMenu();
    initThemeToggle();
    initScrollEffects();
});

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
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Chiude il menu quando si clicca su un link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        });
    });
}

// ========================================
// TOGGLE TEMA
// ========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    if (!themeToggle) return;
    
    // Verifica le preferenze salvate o di sistema
    const savedTheme = localStorage.getItem('site-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Imposta il tema iniziale
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark.matches)) {
        document.documentElement.classList.add('dark-theme');
        themeToggle.checked = true;
    }

    // Event listener per il toggle del tema
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('site-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('site-theme', 'light');
        }
    });

    // Ascolta i cambiamenti del tema di sistema
    systemPrefersDark.addEventListener('change', function(e) {
        if (!localStorage.getItem('site-theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark-theme');
                themeToggle.checked = true;
            } else {
                document.documentElement.classList.remove('dark-theme');
                themeToggle.checked = false;
            }
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
// REPOSITORY GITHUB
// ========================================

async function fetchGitHubRepos() {
    try {
        const response = await fetch("https://api.github.com/users/GabrieleGroppo/repos?sort=updated&per_page=100");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        // Mostra un messaggio di errore all'utente se necessario
        const reposContainer = document.getElementById("project-grid");
        if (reposContainer) {
            reposContainer.innerHTML = '<p>Errore nel caricamento dei progetti. Riprova più tardi.</p>';
        }
    }
}

function displayRepos(repos) {
    const reposContainer = document.getElementById("project-grid");
    if (!reposContainer) return;
    
    reposContainer.innerHTML = ""; // Pulisce il contenuto esistente

    repos.forEach(repo => {
        console.log(`Repository: ${repo.name}, Updated at: ${repo.updated_at}`);

        const repoCard = document.createElement("div");
        repoCard.className = "project-card";
        repoCard.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${escapeHtml(repo.name)}</h3>
                <p class="project-text">${escapeHtml(repo.description || "No description available.")}</p>
                <p class="project-updated">Last update: ${new Date(repo.updated_at).toLocaleDateString()}</p><br>
                <div class="project-links">
                    <a href="${escapeHtml(repo.html_url)}" class="project-link" target="_blank" rel="noopener noreferrer">Vedi progetto</a>
                </div>
            </div>
        `;
        reposContainer.appendChild(repoCard);
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
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}