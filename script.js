document.addEventListener("DOMContentLoaded", function () {
    // Ottieni riferimenti ai titoli
    const elementsToAnimate = [
        { id: "cli-title", text: "whomi", prompt: "gabriele@linux:~$ " },
        { id: "experiences-title", text: "cat education.log", prompt: "gabriele@linux:~$ " },
        { id: "work-title", text: "tail -f work_experience.log", prompt: "gabriele@linux:~$ " }
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
            element.innerHTML = `<span class="prompt">${elem.prompt}</span><span class="cursor">█</span>`;
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
                    element.innerHTML = `<span class="prompt">${prompt}</span><span class="cursor">█</span>`;
                }
            });
        }, { threshold: 0.2 });
        
        // Osserva l'elemento
        observer.observe(element);
        
        // Funzione di animazione di digitazione
        function startTypingAnimation(element, text, prompt) {
            let index = 0;
            
            function typeNextCharacter() {
                if (index < text.length) {
                    element.innerHTML = `<span class="prompt">${prompt}</span>${text.substring(0, index + 1)}<span class="cursor">█</span>`;
                    index++;
                    currentAnimation = setTimeout(typeNextCharacter, 100);
                } else {
                    element.innerHTML = `<span class="prompt">${prompt}</span>${text}<span class="cursor">█</span>`;
                }
            }
            
            // Avvia con un piccolo ritardo
            currentAnimation = setTimeout(typeNextCharacter, 300);
        }
    }
    
    // Gestione dello scroll per la navbar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Aggiungi questo codice al tuo file script.js esistente
document.addEventListener("DOMContentLoaded", function() {
    // Riferimento alla sezione hero
    const heroSection = document.getElementById('home-hero');
    
    // Crea un elemento per l'immagine di sfondo nascosta
    const revealImage = document.createElement('div');
    revealImage.className = 'reveal-image';
    heroSection.appendChild(revealImage);
    
    // Crea l'elemento per il cerchio rivelatore
    const revealCircle = document.createElement('div');
    revealCircle.className = 'reveal-circle';
    heroSection.appendChild(revealCircle);
    
    // Gestione del movimento del mouse sulla sezione hero
    heroSection.addEventListener('mousemove', function(e) {
        // Ottieni le coordinate relative alla sezione hero
        const rect = heroSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Aggiorna la posizione del cerchio rivelatore
        revealCircle.style.left = mouseX + 'px';
        revealCircle.style.top = mouseY + 'px';
        
        // Mostra il cerchio rivelatore quando il mouse è sulla sezione
        revealCircle.style.opacity = '1';
    });
    
    // Nascondi il cerchio rivelatore quando il mouse esce dalla sezione
    heroSection.addEventListener('mouseleave', function() {
        revealCircle.style.opacity = '0';
    });
});