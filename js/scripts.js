// Fechar modal com Esc e bloquear redirecionamentos acidentais
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
  }
});

document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => {
    // Impede que clique no overlay buraco "atravesse" e acione links por trás
    e.preventDefault();
  }, true);
});

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('offcanvas-open');
    }
  });
});


// Garante que cliques dentro do conteúdo do modal não fechem nem redirecionem
document.querySelectorAll('.modal .modal-content').forEach(el => {
  el.addEventListener('click', (e)=> { e.stopPropagation(); });
});
// Bloqueia redirecionamentos dentro de .modal por engano
document.querySelectorAll('.modal a').forEach(a => {
  a.addEventListener('click', (e)=> {
    e.preventDefault();
    e.stopPropagation();
    // Apenas fecha, por solicitação
    const modal = a.closest('.modal');
    if (modal) modal.classList.remove('show');
  });
});

// Inicializadores reutilizáveis (chame initNav() / initModals() após os partials estarem no DOM)
function initNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!navToggle || !navMenu) return;
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('offcanvas-open', open);
  });
  // fechar menu ao clicar em links (mobile)
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('offcanvas-open');
      }
    });
  });
}

function initModals() {
  // abrir modal a partir dos cards
  document.querySelectorAll('.card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      const modal = document.getElementById('modal-' + id);
      if (modal) modal.classList.add('show');
    });
  });

  // fechar ao clicar na overlay (somente quando o target for exatamente o overlay)
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        m.classList.remove('show');
      }
    });
  });

  // garantir que botões 'X' sempre fechem (não depende de bubbling)
  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      if (modal) modal.classList.remove('show');
    });
  });

  // prevenir que cliques dentro do conteúdo fechem a modal
  document.querySelectorAll('.modal .modal-content').forEach(el => {
    el.addEventListener('click', (e)=> e.stopPropagation());
  });

  // fechar com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
    }
  });
}

// auto-init quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // se os partials já estiverem incorporados (include-partials.js síncrono), as funções vão encontrar os elementos
  initNav();
  initModals();
});