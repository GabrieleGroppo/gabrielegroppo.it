// Crea le stelle per lo sfondo
    function createStars() {
        const stars = document.getElementById('stars');
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.left = `${Math.random() * screenWidth}px`;
            star.style.top = `${Math.random() * screenHeight}px`;
            
            stars.appendChild(star);
        }
    }
    
    // Effetto della navbar quando si scrolla
    function handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Scroll fluido per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Inizializzazione
    window.addEventListener('load', createStars);
    window.addEventListener('scroll', handleScroll);

    <h2 class="about-title" id="cli-title"></h2>


    document.addEventListener("DOMContentLoaded", function () {
        const title = document.getElementById("cli-title");
        const text = "whomi";
        const prompt = "gabriele@linux:~$ ";
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                title.innerHTML = `<span style="color:#8be9fd;">${prompt}</span>${text.substring(0, index + 1)}<span class="cursor">█</span>`;
                index++;
                setTimeout(typeEffect, 100);
            } else {
                title.innerHTML = `<span style="color:#8be9fd;">${prompt}</span>${text}`;
            }
        }

        typeEffect();
    });

