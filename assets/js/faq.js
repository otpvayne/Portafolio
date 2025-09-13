// FAQ: acordeón accesible + buscador + deep-link + GTM event
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('faqList');
  if (!list) return;

  const items = Array.from(list.querySelectorAll('.faq-item'));
  const qs    = items.map(it => it.querySelector('.faq-q'));
  const as    = items.map(it => it.querySelector('.faq-a'));
  const search = document.getElementById('faqSearch');
  const btnExpand = document.getElementById('btnExpandAll');
  const btnCollapse = document.getElementById('btnCollapseAll');

  const dataLayer = window.dataLayer = window.dataLayer || [];

  function setExpanded(btn, open){
    const item = btn.closest('.faq-item');
    const ans  = item.querySelector('.faq-a');
    const id   = btn.getAttribute('data-faq-id');

    btn.setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);

    if (open){
      ans.hidden = false;
      const h = ans.scrollHeight;
      ans.style.maxHeight = h + 'px';
      ans.classList.add('show');
      // Evento para GTM/GA4 (cumple la rúbrica de eventos)
      dataLayer.push({ event: 'faq_open', faq_id: id, faq_question: btn.querySelector('.q-text')?.textContent?.trim() || '' });
      // Actualiza hash (deep-link)
      history.replaceState(null, '', '#' + item.id);
    } else {
      ans.style.maxHeight = ans.scrollHeight + 'px'; // set current to enable transition
      requestAnimationFrame(() => {
        ans.style.maxHeight = '0px';
        ans.classList.remove('show');
        // Quita hash si era el activo
        if (location.hash === '#' + item.id) {
          history.replaceState(null, '', location.pathname + location.search);
        }
      });
      // al terminar, oculta para accesibilidad
      ans.addEventListener('transitionend', () => {
        if (btn.getAttribute('aria-expanded') === 'false') ans.hidden = true;
      }, { once: true });
    }
  }

  function toggleOne(btn){
    const open = btn.getAttribute('aria-expanded') !== 'true';
    // cierra los demás (acordeón exclusivo)
    qs.forEach(b => { if (b !== btn && b.getAttribute('aria-expanded') === 'true') setExpanded(b, false); });
    setExpanded(btn, open);
  }

  qs.forEach(btn => {
    btn.addEventListener('click', () => toggleOne(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOne(btn); }
      if (e.key === 'ArrowDown'){
        e.preventDefault();
        const i = qs.indexOf(btn); (qs[i+1] || qs[0]).focus();
      }
      if (e.key === 'ArrowUp'){
        e.preventDefault();
        const i = qs.indexOf(btn); (qs[i-1] || qs[qs.length-1]).focus();
      }
    });
  });

  // Expandir/Contraer todo
  btnExpand?.addEventListener('click', () => qs.forEach(b => setExpanded(b, true)));
  btnCollapse?.addEventListener('click', () => qs.forEach(b => setExpanded(b, false)));

  // Buscador en vivo
  function normalize(t){ return (t || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,''); }
  search?.addEventListener('input', () => {
    const q = normalize(search.value);
    let visible = 0;
    items.forEach(it => {
      const qtxt = it.querySelector('.q-text')?.textContent || '';
      const atxt = it.querySelector('.faq-a-inner')?.textContent || '';
      const hit = normalize(qtxt + ' ' + atxt).includes(q);
      it.style.display = hit ? '' : 'none';
      if (hit) visible++;
    });
    const empty = document.getElementById('faq-empty');
    if (empty) empty.hidden = visible !== 0;
  });

  // Abrir por hash (#q-12) si llega enlazado
  if (location.hash){
    const target = document.querySelector(location.hash);
    const btn = target?.querySelector('.faq-q');
    if (btn) setExpanded(btn, true);
  }
});
