// ==========================================
// CONTROLE DOS MENUS (DESKTOP E MOBILE)
// ==========================================
function toggleMenu(menuId) {
    const todosMenus = ['menu-empresa', 'menu-solucoes'];
    todosMenus.forEach(id => {
        if (id !== menuId) {
            const menu = document.getElementById(id);
            if(menu) menu.classList.add('hidden');
        }
    });
    
    const menuClicado = document.getElementById(menuId);
    if(menuClicado) menuClicado.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
    }
}

window.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    if (nav && !nav.contains(e.target)) {
        const menuEmpresa = document.getElementById('menu-empresa');
        const menuSolucoes = document.getElementById('menu-solucoes');
        if(menuEmpresa) menuEmpresa.classList.add('hidden');
        if(menuSolucoes) menuSolucoes.classList.add('hidden');
    }
});

// ==========================================
// EFEITOS DE ROLAGEM (SCROLL REVEAL)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => observer.observe(el));
});

// ==========================================
// CARROSSEL DO BANNER PRINCIPAL (HERO)
// ==========================================
let currentHeroSlide = 0;
const heroSlidesContainer = document.getElementById('hero-carousel');
const heroDots = document.querySelectorAll('.hero-dot');
let heroTotalSlides = 0;
let heroSlideInterval;

if (heroSlidesContainer) {
    heroTotalSlides = heroSlidesContainer.children.length;
    startHeroTimer();
}

function updateHeroCarousel() {
    if (heroSlidesContainer) {
        // Desliza as imagens
        heroSlidesContainer.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        
        // Atualiza a cor das bolinhas de paginação
        heroDots.forEach((dot, index) => {
            if (index === currentHeroSlide) {
                dot.classList.remove('bg-white/50');
                dot.classList.add('bg-verde-claro');
            } else {
                dot.classList.remove('bg-verde-claro');
                dot.classList.add('bg-white/50');
            }
        });
    }
}

function nextHeroSlide() {
    if (heroTotalSlides > 0) {
        currentHeroSlide = (currentHeroSlide + 1) % heroTotalSlides;
        updateHeroCarousel();
        resetHeroTimer();
    }
}

function prevHeroSlide() {
    if (heroTotalSlides > 0) {
        currentHeroSlide = (currentHeroSlide - 1 + heroTotalSlides) % heroTotalSlides;
        updateHeroCarousel();
        resetHeroTimer();
    }
}

// Permite clicar direto nas bolinhas
function goToSlide(index) {
    currentHeroSlide = index;
    updateHeroCarousel();
    resetHeroTimer();
}

// Troca o slide automaticamente a cada 6 segundos (6000 ms)
function startHeroTimer() {
    heroSlideInterval = setInterval(nextHeroSlide, 6000);
}

// Reinicia o tempo se o usuário interagir pelas setas ou bolinhas
function resetHeroTimer() {
    clearInterval(heroSlideInterval);
    startHeroTimer();
}