// OPEN: pequeño tracking + helper para GTM
document.addEventListener('DOMContentLoaded', () => {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('[data-gtm="open_card_click"]').forEach(a => {
    a.addEventListener('click', () => {
      dataLayer.push({
        event: 'open_card_click',
        item_id: a.getAttribute('data-id') || null
      });
    });
  });
});
