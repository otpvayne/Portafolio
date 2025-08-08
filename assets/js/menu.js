// Menú hamburguesa + lock de scroll sin "saltos"
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  let lastScrollY = 0; // recordamos la posición del scroll

  const openMenu = () => {
    lastScrollY = window.scrollY || window.pageYOffset;   // guarda posición actual
    nav.classList.add('active');                          // muestra panel
    document.body.classList.add('menu-open');             // bloquea scroll del body
    document.body.style.position = 'fixed';               // congela la página
    document.body.style.top = `-${lastScrollY}px`;        // evita saltos
    document.body.style.width = '100%';                   // evita cambio de ancho
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
  };

  const closeMenu = () => {
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollY);                      // vuelve al mismo punto
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  };

  hamburger.addEventListener('click', () => {
    const opened = nav.classList.contains('active');
    opened ? closeMenu() : openMenu();
  });

  // Cerrar al hacer clic en un enlace del menú
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });
});

// Efecto shrink del héroe al hacer scroll
window.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  const mainTitle = document.querySelector('.typing-text');
  const subTitle = document.querySelector('.typing-subtext');

  function handleScroll() {
    const y = window.scrollY;
    const limit = 300;

    let s1 = 1 - (y / limit) * 0.4; if (s1 < 0.6) s1 = 0.6;
    mainTitle.style.transform = `scale(${s1})`;
    mainTitle.style.transformOrigin = 'center top';

    let s2 = 1 - (y / limit) * 0.2; if (s2 < 0.8) s2 = 0.8;
    subTitle.style.transform = `scale(${s2})`;
    subTitle.style.transformOrigin = 'center top';

    const t = Math.min(y / 5, 60);
    heroSection.style.transform = `translateY(-${t}px)`;
  }

  window.addEventListener('scroll', handleScroll);
});
