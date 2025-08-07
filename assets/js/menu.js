// 🎯 Funcionalidad para mostrar/ocultar el menú al hacer click en el botón hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  // Referencia al botón hamburguesa
  const hamburger = document.getElementById('hamburger');

  // Referencia al elemento <nav> que contiene el menú
  const nav = document.getElementById('nav');

  // Evento que alterna visibilidad del menú cuando se hace clic en el botón hamburguesa
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active'); // Agrega o quita la clase 'active' que controla la visibilidad
  });
});

// 🎬 Efecto de encogimiento en el nombre y subtítulo al hacer scroll (DIEGO MEDINA y SOFTWARE ENGINEER)
window.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section'); // Sección completa del encabezado
  const mainTitle = document.querySelector('.typing-text'); // Texto principal (nombre)
  const subTitle = document.querySelector('.typing-subtext'); // Subtítulo (título profesional)

  // Esta función se ejecuta cada vez que el usuario hace scroll
  function handleScroll() {
    const scrollY = window.scrollY; // Número de píxeles que el usuario ha desplazado

    const shrinkLimit = 300; // Límite de scroll para aplicar el efecto completo

    // Escala del título principal (entre 1 y 0.6)
    let scaleFactor = 1 - (scrollY / shrinkLimit) * 0.4;
    if (scaleFactor < 0.6) scaleFactor = 0.6;

    // Aplicar la escala al nombre
    mainTitle.style.transform = `scale(${scaleFactor})`;
    mainTitle.style.transformOrigin = 'center top';

    // Escala del subtítulo (entre 1 y 0.8)
    let subScaleFactor = 1 - (scrollY / shrinkLimit) * 0.2;
    if (subScaleFactor < 0.8) subScaleFactor = 0.8;

    // Aplicar la escala al subtítulo
    subTitle.style.transform = `scale(${subScaleFactor})`;
    subTitle.style.transformOrigin = 'center top';

    // Desplazar toda la sección hero hacia arriba suavemente (máx. 60px)
    const translateY = Math.min(scrollY / 5, 60);
    heroSection.style.transform = `translateY(-${translateY}px)`;
  }

  // Vincula la función al evento de scroll
  window.addEventListener('scroll', handleScroll);
});
