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
/* =========================
   PROJECTS: reveal + filtros + modal + tilt
========================= */
document.addEventListener('DOMContentLoaded', () => {
  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, {threshold:.15});
  document.querySelectorAll('.p-card').forEach(c=>io.observe(c));

  // ---- Filtros ----
  const filterBtns = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.p-card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const key = btn.dataset.filter;
      cards.forEach(card=>{
        const tags = (card.dataset.tags || '').toLowerCase();
        const show = key === 'all' || tags.includes(key);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ---- Case Studies (contenido real de tus 2 proyectos) ----
  const CASES = {
    kumis: {
      title: 'Casa del Kumis — Website',
      stack: ['HTML','CSS','JavaScript','SEO'],
      content: `
        <h4>Context</h4>
        <p>Sitio informativo y landing para una marca de kumis artesanal. Objetivo: presencia digital clara, identidad de marca y consulta de catálogo.</p>
        <h4>Problem</h4>
        <p>No existía un canal oficial para comunicar productos, historia y contacto; la marca dependía solo de redes sociales.</p>
        <h4>Solution</h4>
        <ul>
          <li>Landing responsive (mobile‑first) con secciones: hero, historia, productos, contacto.</li>
          <li>SEO on‑page (metadatos, estructura semántica, performance básica).</li>
          <li>Diseño visual acorde a la identidad (tipografía, colores y fotografía del producto).</li>
        </ul>
        <h4>Notes</h4>
        <p>Estructura preparada para crecer (blog/FAQ) y añadir un backend ligero si se requiere.</p>
        <img src="/assets/images/kumis-1200.webp" alt="Pantallas del sitio Casa del Kumis" loading="lazy" decoding="async" />
      `,
      links: [
        /* Reemplaza cuando tengas URLs reales */
        // { label: 'Live', href: 'https://...' },
        // { label: 'Repo', href: 'https://github.com/...' }
      ]
    },
    erp: {
      title: 'ERP — Ventas de Alimentos',
      stack: ['Java SE','MySQL','Swing','MVC','(WIP) WhatsApp API','(opt) Apache POI'],
      content: `
        <h4>Overview</h4>
        <p>Sistema ERP (Enterprise Resource Planning) en Java con patrón MVC, orientado a negocios del sector alimentario para controlar ventas, stock y clientes.</p>
        <h4>Modules</h4>
        <ul>
          <li>Productos: registro y gestión de productos alimenticios.</li>
          <li>Clientes/Usuarios: altas, bajas, edición y permisos básicos.</li>
          <li>Inventario: control de stock.</li>
          <li>Ventas: registro de ventas, emisión de comprobantes y reportes.</li>
          <li>Notificaciones: integración experimental con WhatsApp al realizar ventas.</li>
        </ul>
        <h4>Tech</h4>
        <ul>
          <li>Java SE + Swing (UI de escritorio)</li>
          <li>MySQL via JDBC</li>
          <li>Patrón MVC</li>
          <li>Apache POI (opcional) para exportar reportes a Excel</li>
          <li>Compatibilidad en mejora con JDK 19</li>
        </ul>
        <h4>Status</h4>
        <p>Proyecto en desarrollo activo; base funcional con módulos de ventas, clientes y productos parcialmente implementados.</p>
        <img src="/assets/images/erp-1200.webp" alt="Pantallas del ERP de Ventas" loading="lazy" decoding="async" />
      `,
      links: [
        /* Cuando publiques repo/demo, agrega aquí: */
        // { label: 'Repo', href: 'https://github.com/...' }
      ]
    }
  };

  // ---- Modal ----
  const modal = document.getElementById('case-modal');
  const title = document.getElementById('case-title');
  const stack = document.getElementById('case-stack');
  const body  = document.getElementById('case-content');
  const links = document.getElementById('case-links');

  const openModal = () => { modal.showModal(); document.body.classList.add('menu-open'); };
  const closeModal = () => { modal.close(); document.body.classList.remove('menu-open'); };

  modal?.querySelector('.case-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && modal.open) closeModal(); });

  document.querySelectorAll('.show-case').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.case;
      const data = CASES[id]; if(!data) return;
      title.textContent = data.title;
      stack.innerHTML = (data.stack||[]).map(s=>`<li class="chip">${s}</li>`).join('');
      body.innerHTML  = data.content || '';
      links.innerHTML = (data.links||[]).map(l=>`<a class="btn btn-sm" target="_blank" rel="noopener" href="${l.href}">${l.label}</a>`).join('');
      openModal();
    });
  });

  // ---- Tilt/parallax suave sin librerías ----
  const tiltElems = document.querySelectorAll('[data-tilt]');
  tiltElems.forEach(el=>{
    const img = el.querySelector('img');
    let req;
    const onMove = (e)=>{
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(req);
      req = requestAnimationFrame(()=>{
        el.style.transform = `perspective(900px) rotateX(${ -y*4 }deg) rotateY(${ x*4 }deg)`;
        if(img) img.style.transform = `scale(1.06) translateX(${ x*6 }px) translateY(${ y*6 }px)`;
      });
    };
    const reset = ()=>{
      cancelAnimationFrame(req);
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      if(img) img.style.transform = 'scale(1) translateX(0) translateY(0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('touchmove', (e)=>{
      const t = e.touches[0]; if(!t) return;
      onMove({clientX:t.clientX, clientY:t.clientY});
    }, {passive:true});
    el.addEventListener('touchend', reset);
  });
});
// Timeline reveal on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showOnScroll);
showOnScroll();
