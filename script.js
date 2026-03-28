/* ====== THEME ====== */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setDark(on) {
    root.classList.toggle('dark', on);
    themeIcon.className = on ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', on ? 'dark' : 'light');
}
setDark(saved === 'dark' || (!saved && prefersDark));
themeBtn.addEventListener('click', () => setDark(!root.classList.contains('dark')));

/* ====== ACTIVE NAV ====== */
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = [...document.querySelectorAll('section[id]')];

function updateNav() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    let current = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= scrollY) current = s.id; });
    navItems.forEach(n => n.classList.toggle('active', n.dataset.section === current));
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ====== SCROLL REVEAL ====== */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(r => ro.observe(r));

/* ====== TYPING ANIMATION ====== */
const phrases = [
    '"Welcome to my portfolio!"',
    'git commit -m "cool stuff"',
    'kubectl apply -f kubepattern.yml',
];
let pi = 0, ci = 0, deleting = false;
const typed = document.getElementById('hero-typed');

function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
        typed.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
        typed.textContent = phrase.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
    }
    setTimeout(tick, deleting ? 40 : 70);
}
tick();

/* ====== SMOOTH SCROLL ====== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* ====== MODAL ====== */
function showTerms() { document.getElementById('terms-modal').classList.add('show'); document.body.style.overflow = 'hidden'; }
function hideTerms() { document.getElementById('terms-modal').classList.remove('show'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTerms(); });