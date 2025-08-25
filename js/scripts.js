// Navegação responsiva (hambúrguer)
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Modais (cards -> descrição)
const cards = document.querySelectorAll('.card[data-modal]');
cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-modal');
    const modal = document.getElementById('modal-' + id);
    if (modal) modal.classList.add('show');
  });
});

document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
      m.classList.remove('show');
    }
  });
});
