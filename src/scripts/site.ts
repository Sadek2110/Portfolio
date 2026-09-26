const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width: 767px)');

// Los esquemas siguen visibles en su totalidad sin JavaScript.
const flowSelectors = document.querySelector<HTMLElement>('.infra-selectors');
if (flowSelectors) {
  const buttons = flowSelectors.querySelectorAll<HTMLButtonElement>('[data-flow-select]');
  const panels = document.querySelectorAll<HTMLElement>('[data-flow-panel]');
  const selectFlow = (id: string) => {
    panels.forEach(panel => { panel.hidden = panel.dataset.flowPanel !== id; });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.flowSelect === id)));
  };
  buttons.forEach(button => button.addEventListener('click', () => selectFlow(button.dataset.flowSelect || '')));
  if (buttons[0]) selectFlow(buttons[0].dataset.flowSelect || '');
  flowSelectors.hidden = false;
}

// Navegación accesible: sigue disponible cuando JavaScript está desactivado.
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#main-nav');
if (menuButton && nav) {
  document.querySelector('.site-header')?.classList.add('nav-enhanced');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  const setNavigationMode = () => { menuButton.hidden = !mobile.matches; closeMenu(); };
  setNavigationMode();
  mobile.addEventListener('change', setNavigationMode);
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  nav.querySelectorAll('[data-terminal-open]').forEach(button => button.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !document.querySelector('.site-header')?.contains(event.target)) closeMenu();
  });
}

// Filtros reales sobre el contenido estático; sin duplicar datos de proyectos.
const filters = document.querySelector<HTMLElement>('.project-filters');
if (filters) {
  filters.hidden = false;
  const cards = document.querySelectorAll<HTMLElement>('[data-project]');
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  filters.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(item => {
        const active = item === button;
        item.setAttribute('aria-pressed', String(active));
        item.classList.toggle('is-active', active);
      });
      let count = 0;
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden) count++;
      });
      const archive = document.querySelector<HTMLElement>('[data-project-archive]');
      if (archive) archive.hidden = !archive.querySelector('[data-project]:not([hidden])');
      if (status) status.textContent = `${count} proyectos: ${button.dataset.filter === 'all' ? 'todos' : button.dataset.filter}.`;
    });
  });
}

// El contenido se ve antes de ejecutar JS. Solo animamos al entrar en pantalla.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));
}

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-email]');
if (copyButton) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector<HTMLElement>('.copy-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copyEmail || '');
      if (status) status.textContent = 'Correo copiado.';
    } catch {
      if (status) status.textContent = 'No se ha podido copiar. Selecciona el correo o abre el enlace para escribir.';
    }
  });
}
