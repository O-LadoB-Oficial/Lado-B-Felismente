// ===== Utilidades comuns =====

// Fecha todas as modais com Esc
function closeAllModals() {
  document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// ===== Inicializa Navegação (menu hambúrguer) =====
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;

  // Abrir/fechar
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('offcanvas-open', open);
  });

  // Fechar ao clicar em qualquer link do menu
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('offcanvas-open');
      }
    });
  });

  // Garantir estado correto ao redimensionar (ex.: mobile -> desktop)
  window.addEventListener('resize', () => {
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    if (!isMobile) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('offcanvas-open');
    }
  });
}

// ===== Inicializa Modais =====
function initModals() {
  // Abrir modal pelos cards
  document.querySelectorAll('.card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      const modal = document.getElementById('modal-' + id);
      if (modal) modal.classList.add('show');
    });
  });

  // Fechar ao clicar na overlay (somente quando o alvo é a própria overlay)
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        m.classList.remove('show');
      }
    });
  });

  // Botões "X" sempre fecham
  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      if (modal) modal.classList.remove('show');
    });
  });

  // Impede que cliques dentro do conteúdo fechem/redirecionem
  document.querySelectorAll('.modal .modal-content').forEach(el => {
    el.addEventListener('click', (e)=> { e.stopPropagation(); });
  });

  // Bloqueia redirecionamento acidental dentro da modal
  document.querySelectorAll('.modal a').forEach(a => {
    a.addEventListener('click', (e)=> {
      e.preventDefault();
      e.stopPropagation();
      const modal = a.closest('.modal');
      if (modal) modal.classList.remove('show');
    });
  });
}

// Auto-init quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initModals();
});
