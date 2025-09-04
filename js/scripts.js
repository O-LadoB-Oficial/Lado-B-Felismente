// =============================
// Navegação Off-canvas (menu mobile)
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  function openMenu() {
    navMenu.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('offcanvas-open');
    history.pushState({ menu: true }, ""); // adiciona histórico para botão voltar
  }

  function closeMenu() {
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('offcanvas-open');
    }
  }

  // Toggle no botão hamburguer
  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha ao clicar em link do menu (e navega normalmente)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fecha ao clicar fora (overlay)
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('offcanvas-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Fecha com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Botão voltar do celular fecha o menu
  window.addEventListener('popstate', () => {
    if (navMenu.classList.contains('show')) {
      closeMenu();
    }
  });

  // Reset ao mudar tamanho da tela (desktop > mobile)
  window.addEventListener('resize', () => {
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    if (!isMobile) {
      closeMenu();
    }
  });
});

// =============================
// Modais dos cards
// =============================
function initModals() {
  // Abrir modal pelos cards
  document.querySelectorAll('.card[data-modal], .card2[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      const modal = document.getElementById('modal-' + id);
      if (modal) modal.classList.add('show');
    });
  });

  // Fechar modal ao clicar fora do conteúdo
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', () => {
      m.classList.remove('show');
    });
  });

  // Botões de fechar
  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      if (modal) modal.classList.remove('show');
    });
  });

  // Impede clique interno de fechar modal
  document.querySelectorAll('.modal .modal-content').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}

document.addEventListener('DOMContentLoaded', initModals);
