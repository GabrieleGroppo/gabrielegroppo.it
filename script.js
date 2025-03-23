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

document.addEventListener("DOMContentLoaded", function() {
    // Crea il cerchio e lo aggiunge al body
    const cursorCircle = document.createElement("div");
    cursorCircle.className = "cursor-circle";
    document.body.appendChild(cursorCircle);

    // Sposta il cerchio col mouse
    document.addEventListener("mousemove", function(e) {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });
});
