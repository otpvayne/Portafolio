document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté listo para manipular elementos
  /* =========================
     🍔 Hamburguesa + Scroll lock
  ========================= */
  const hamburger = document.getElementById('hamburger'); // Botón hamburguesa
  const nav = document.getElementById('nav');             // Panel de navegación
  let lastScrollY = 0;                                     // Guardará la posición previa del scroll

  const openMenu = () => {                                 // Función para abrir el menú
    lastScrollY = window.scrollY || window.pageYOffset;    // Guarda la posición actual del scroll
    nav.classList.add('active');                           // Muestra el panel (CSS .nav.active)
    document.body.classList.add('menu-open');              // Bloquea scroll del body (CSS)
    document.body.style.position = 'fixed';                // Fija el body para evitar “salto”
    document.body.style.top = `-${lastScrollY}px`;         // Compensa el desplazamiento
    document.body.style.width = '100%';                    // Evita cambio de ancho por scrollbar
    hamburger.setAttribute('aria-expanded', 'true');       // Accesibilidad: estado abierto
    hamburger.setAttribute('aria-label', 'Cerrar menú');   // Accesibilidad: label cambia
  };

  const closeMenu = () => {                                // Función para cerrar el menú
    nav.classList.remove('active');                        // Oculta panel
    document.body.classList.remove('menu-open');           // Quita bloqueo de scroll
    document.body.style.position = '';                     // Limpia estilos inline
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollY);                       // Vuelve a la posición previa exacta
    hamburger.setAttribute('aria-expanded', 'false');      // Accesibilidad: estado cerrado
    hamburger.setAttribute('aria-label', 'Abrir menú');    // Accesibilidad: label cambia
  };

  hamburger.addEventListener('click', () => {              // Click en hamburguesa
    nav.classList.contains('active') ? closeMenu() : openMenu(); // Alterna abrir/cerrar
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu)); // Cierra al navegar

  /* =========================
     🖱️ Shrink del héroe al hacer scroll
  ========================= */
  const heroSection = document.querySelector('.hero-section'); // Sección hero
  const mainTitle = document.querySelector('.typing-text');    // Título principal (typing)
  const subTitle = document.querySelector('.typing-subtext');  // Subtítulo

  const handleScroll = () => {                                 // Maneja el efecto al hacer scroll
    const y = window.scrollY;                                  // Desplazamiento vertical
    const limit = 300;                                         // Umbral para el efecto

    let s1 = 1 - (y / limit) * 0.4; if (s1 < 0.6) s1 = 0.6;    // Escala título (1 a .6)
    mainTitle.style.transform = `scale(${s1})`;                // Aplica escala
    mainTitle.style.transformOrigin = 'center top';            // Origen de la transformación

    let s2 = 1 - (y / limit) * 0.2; if (s2 < 0.8) s2 = 0.8;    // Escala subtítulo (1 a .8)
    subTitle.style.transform = `scale(${s2})`;                 // Aplica escala
    subTitle.style.transformOrigin = 'center top';             // Origen de la transformación

    const t = Math.min(y / 5, 60);                             // Traslación máxima 60px
    heroSection.style.transform = `translateY(-${t}px)`;       // Mueve toda la sección hacia arriba
  };
  window.addEventListener('scroll', handleScroll);             // Activa efecto en scroll

  /* =========================
     ⌨️ Typing "About Me" al entrar en viewport
  ========================= */
  const aboutTitle = document.querySelector('.typing-about');  // h2 “About Me”
  if (aboutTitle) {                                            // Si existe en DOM
    const io = new IntersectionObserver((entries) => {         // Observador de intersección
      entries.forEach(entry => {
        if (entry.isIntersecting) {                            // Cuando el h2 entra al viewport
          aboutTitle.classList.add('typing-active');           // Dispara animación typing (CSS)
          io.unobserve(aboutTitle);                            // Se ejecuta una sola vez
        }
      });
    }, { threshold: 0.6 });                                    // 60% visible
    io.observe(aboutTitle);                                    // Observa el elemento
  }
});
/* =========================
   PROJECTS: reveal + filtros + modal + tilt
========================= */
document.addEventListener('DOMContentLoaded', () => {          // Lógica de Projects al cargar DOM
  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries, obs)=>{        // Observa tarjetas
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); } // Añade clase reveal una vez
    });
  }, {threshold:.15});                                         // 15% visible
  document.querySelectorAll('.p-card').forEach(c=>io.observe(c)); // Observa todas las cards

  // ---- Filtros ----
  const filterBtns = document.querySelectorAll('.filter');     // Botones de filtro
  const cards = document.querySelectorAll('.p-card');          // Tarjetas
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{                        // Click en un filtro
      filterBtns.forEach(b=>b.classList.remove('is-active'));  // Quita activo en todos
      btn.classList.add('is-active');                          // Activa el actual
      const key = btn.dataset.filter;                          // Lee clave del filtro
      cards.forEach(card=>{
        const tags = (card.dataset.tags || '').toLowerCase();  // Tags de la card
        const show = key === 'all' || tags.includes(key);      // Lógica de filtrado
        card.style.display = show ? '' : 'none';               // Muestra/oculta
      });
    });
  });

  // ---- Case Studies (contenido real de tus 2 proyectos) ----
  const CASES = {                                              // Diccionario de casos
    kumis: {                                                   // ID “kumis”
      title: 'Casa del Kumis — Website',                       // Título modal
      stack: ['HTML','CSS','JavaScript','SEO'],                // Stack mostrado como chips
      content: `                                               /* HTML interno del modal */
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
      links: [                                                 // Links opcionales (live/repo)
        // { label: 'Live', href: 'https://...' },
        // { label: 'Repo', href: 'https://github.com/...' }
      ]
    },
    erp: {                                                     // ID “erp”
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
        // { label: 'Repo', href: 'https://github.com/...' }
      ]
    }
  };

  // ---- Modal ----
  const modal = document.getElementById('case-modal');         // <dialog> (si lo agregas)
  const title = document.getElementById('case-title');         // h3 dentro del modal
  const stack = document.getElementById('case-stack');         // UL de stack dentro del modal
  const body  = document.getElementById('case-content');       // Contenido HTML del modal
  const links = document.getElementById('case-links');         // Acciones extra del modal

  const openModal = () => { modal.showModal(); document.body.classList.add('menu-open'); };  // Abre dialog
  const closeModal = () => { modal.close(); document.body.classList.remove('menu-open'); };  // Cierra dialog

  modal?.querySelector('.case-close')?.addEventListener('click', closeModal); // Cierra por botón
  modal?.addEventListener('click', e=>{ if(e.target === modal) closeModal(); }); // Cierra clic fuera
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && modal?.open) closeModal(); }); // Esc cierra

  document.querySelectorAll('.show-case').forEach(btn=>{       // Botones “Case Study”
    btn.addEventListener('click', ()=>{                        // Al click
      const id = btn.dataset.case;                             // Lee ID del case
      const data = CASES[id]; if(!data) return;                // Obtiene datos
      title.textContent = data.title;                          // Inserta título
      stack.innerHTML = (data.stack||[]).map(s=>`<li class="chip">${s}</li>`).join(''); // Chips stack
      body.innerHTML  = data.content || '';                    // HTML del body
      links.innerHTML = (data.links||[]).map(l=>`<a class="btn btn-sm" target="_blank" rel="noopener" href="${l.href}">${l.label}</a>`).join(''); // Links
      openModal();                                             // Abre modal
    });
  });

  // ---- Tilt/parallax suave sin librerías ----
  const tiltElems = document.querySelectorAll('[data-tilt]');  // Selecciona elementos con tilt
  tiltElems.forEach(el=>{
    const img = el.querySelector('img');                       // Imagen interna
    let req;                                                   // requestAnimationFrame id
    const onMove = (e)=>{                                      // Maneja movimiento del mouse
      const rect = el.getBoundingClientRect();                 // Dimensiones del elemento
      const x = (e.clientX - rect.left) / rect.width - 0.5;    // Ratio X (-0.5 a 0.5)
      const y = (e.clientY - rect.top) / rect.height - 0.5;    // Ratio Y (-0.5 a 0.5)
      cancelAnimationFrame(req);                               // Optimiza
      req = requestAnimationFrame(()=>{                        // Aplica transform en el próximo frame
        el.style.transform = `perspective(900px) rotateX(${ -y*4 }deg) rotateY(${ x*4 }deg)`; // Tilt contenedor
        if(img) img.style.transform = `scale(1.06) translateX(${ x*6 }px) translateY(${ y*6 }px)`; // Parallax leve
      });
    };
    const reset = ()=>{                                        // Resetea transformaciones
      cancelAnimationFrame(req);
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
      if(img) img.style.transform = 'scale(1) translateX(0) translateY(0)';
    };
    el.addEventListener('mousemove', onMove);                  // Tilt mouse
    el.addEventListener('mouseleave', reset);                  // Reset al salir
    el.addEventListener('touchmove', (e)=>{                    // Soporte táctil
      const t = e.touches[0]; if(!t) return;
      onMove({clientX:t.clientX, clientY:t.clientY});
    }, {passive:true});
    el.addEventListener('touchend', reset);                    // Reset touch end
  });
});
// ===== Experience: reveal on scroll + glow =====
(function(){                                                    // IIFE para aislar variables
  const items = document.querySelectorAll('.timeline-item');    // Items del timeline
  if(!items.length) return;                                     // Si no hay, salir

  const io = new IntersectionObserver((entries)=>{              // Observa aparición
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');                         // Marca como visible
        observeredOnce.add(e.target);                           // Registra en el set
        io.unobserve(e.target);                                 // Deja de observar ese item
      }
    });
  }, {threshold: .2});                                          // 20% visible

  const observeredOnce = new WeakSet();                         // Para no repetir
  items.forEach(it=>io.observe(it));                            // Observa todos
})();
document.querySelectorAll(".tab-button").forEach(btn => {       // Tabs de Tools
  btn.addEventListener("click", () => {                         // Click en tab
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active")); // Desactiva todos
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active")); // Oculta todos

    btn.classList.add("active");                                // Activa botón
    document.getElementById(btn.dataset.tab).classList.add("active"); // Muestra panel target
  });
});
// ===== Contact actions =====
document.addEventListener('DOMContentLoaded', () => {           // Lógica de Contact
  // WhatsApp con mensaje prellenado
  const waBtn = document.getElementById('waBtn');               // Botón WhatsApp
  if (waBtn) {
    const phone = '573017472421';                               // Número sin '+'
    const msg = encodeURIComponent("Hi Diego! I saw your portfolio and I'd like to talk about a project."); // Mensaje
    waBtn.href = `https://wa.me/${phone}?text=${msg}`;          // Construye enlace wa.me
  }

  // Copy to clipboard (email)
  const copyBtn = document.getElementById('copyEmailBtn');      // Botón copiar email
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {             // Al hacer click
      const email = copyBtn.dataset.email || 'generalboomsycol@gmail.com'; // Lee email
      try {
        await navigator.clipboard.writeText(email);             // Copia al portapapeles
        copyBtn.textContent = 'Copied!';                        // Feedback
        setTimeout(() => (copyBtn.textContent = 'Copy email'), 1200); // Restaura texto
      } catch {
        copyBtn.textContent = 'Press Ctrl+C';                   // Fallback
        setTimeout(() => (copyBtn.textContent = 'Copy email'), 1500); // Restaura
      }
    });
  }
});
