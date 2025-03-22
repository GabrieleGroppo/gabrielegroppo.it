document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("cli-title");
    if (!title) return; // Se l'elemento non esiste, esci

    const text = "whomi";
    const prompt = "";
    let index = 0;
    let hasAnimated = false; // Per evitare di ripetere l'animazione più volte

    function typeEffect() {
        if (index < text.length) {
            title.innerHTML = `<span style="color:#8be9fd;">${prompt}</span>${text.substring(0, index + 1)}<span class="cursor">█</span>`;
            index++;
            setTimeout(typeEffect, 100);
        } else {
            title.innerHTML = `<span style="color:#8be9fd;">${prompt}</span>${text}`;
        }
    }

    function handleScroll() {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top >= 0 && rect.bottom <= windowHeight && !hasAnimated) {
            hasAnimated = true;
            index = 0; // Resetta l'indice per riavviare l'animazione
            typeEffect();
        } else if (rect.bottom < 0 || rect.top > windowHeight) {
            hasAnimated = false; // Reset per permettere di riavviare l'animazione
        }
    }

    window.addEventListener("scroll", handleScroll);
});
