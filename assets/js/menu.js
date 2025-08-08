document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     🍔 Hamburguesa + Scroll lock
  ========================= */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  const openMenu = () => {
    lastScrollY = window.scrollY || window.pageYOffset;
    nav.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollY}px`;
    document.body.style.width = '100%';
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
  };

  const closeMenu = () => {
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollY);
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  };

  hamburger.addEventListener('click', () => {
    nav.classList.contains('active') ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* =========================
     🖱️ Shrink del héroe al hacer scroll
  ========================= */
  const heroSection = document.querySelector('.hero-section');
  const mainTitle = document.querySelector('.typing-text');
  const subTitle = document.querySelector('.typing-subtext');

  const handleScroll = () => {
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
  };
  window.addEventListener('scroll', handleScroll);

  /* =========================
     ⌨️ Typing "About Me" al entrar en viewport
  ========================= */
  const aboutTitle = document.querySelector('.typing-about');
  if (aboutTitle) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutTitle.classList.add('typing-active');
          io.unobserve(aboutTitle);
        }
      });
    }, { threshold: 0.6 });
    io.observe(aboutTitle);
  }
});
