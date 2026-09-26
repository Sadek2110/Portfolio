type Payload = {
  profile: { name: string; role: string; location: string; about: string; github: string; email: string; linkedin: string };
  projects: { slug: string; title: string; status: string }[];
  skills: { title: string; skills: string[] }[];
  infrastructure: { title: string; tool: string; description: string }[];
};

const dialog = document.querySelector<HTMLDialogElement>('#portfolio-terminal');
const input = dialog?.querySelector<HTMLInputElement>('#terminal-input');
const output = dialog?.querySelector<HTMLElement>('.terminal-output');
const form = dialog?.querySelector<HTMLFormElement>('.terminal-form');
const payload = document.querySelector('#terminal-payload');

if (dialog && input && output && form && payload && typeof dialog.showModal === 'function') {
  const data: Payload = JSON.parse(payload.textContent || '{}');
  const openers = document.querySelectorAll<HTMLButtonElement>('[data-terminal-open]');
  let opener: HTMLElement | null = null;
  let history: string[] = [];
  let historyPosition = 0;
  let draft = '';

  const open = (button?: HTMLElement) => {
    if (dialog.open) return;
    opener = button || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    dialog.showModal();
    document.documentElement.classList.add('terminal-open');
    input.focus();
  };
  openers.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => open(button));
  });
  dialog.querySelector('[data-terminal-close]')?.addEventListener('click', () => dialog.close());
  output.addEventListener('click', event => {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    if (anchor?.getAttribute('href')?.startsWith('/')) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('terminal-open');
    const target = opener?.getClientRects().length ? opener : document.querySelector<HTMLButtonElement>('.menu-toggle:not([hidden])');
    target?.focus();
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  // Cierra el ciclo de Tab dentro del diálogo, también al pasar por el último control.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]')]
      .filter(element => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });

  // Atajo opcional; nunca interfiere con un campo de texto.
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]');
    if ((event.ctrlKey || event.metaKey) && event.code === 'Backquote' && !editing) {
      event.preventDefault();
      if (dialog.open) dialog.close(); else open();
    }
  });

  const line = (parent: HTMLElement, text: string, className = '') => {
    const p = document.createElement('p');
    p.textContent = text;
    p.className = className;
    parent.append(p);
  };
  const link = (parent: HTMLElement, text: string, href: string) => {
    const a = document.createElement('a');
    a.textContent = text;
    a.href = href;
    if (href.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    parent.append(a);
  };
  const commands: Record<string, (parent: HTMLElement) => void> = {
    help(parent) {
      line(parent, 'Comandos disponibles', 'terminal-highlight');
      ['about — Mi perfil y formación', 'projects — Proyectos y casos de estudio', 'skills — Herramientas que uso', 'infra — Del repositorio al servidor', 'contact — Dónde encontrarme', 'clear — Limpiar la terminal', 'exit — Cerrar la terminal'].forEach(text => line(parent, text));
    },
    about(parent) {
      line(parent, data.profile.name, 'terminal-highlight');
      line(parent, `${data.profile.role} · ${data.profile.location}`);
      line(parent, data.profile.about);
    },
    projects(parent) {
      data.projects.forEach(project => {
        const row = document.createElement('div');
        row.className = 'terminal-project';
        link(row, `${project.title} →`, `/proyectos/${project.slug}/`);
        line(row, project.status, 'terminal-muted');
        parent.append(row);
      });
    },
    skills(parent) {
      data.skills.forEach(group => {
        line(parent, group.title, 'terminal-highlight');
        line(parent, group.skills.join(' · '));
      });
    },
    infra(parent) {
      data.infrastructure.forEach(layer => {
        line(parent, `${layer.title} / ${layer.tool}`, 'terminal-highlight');
        line(parent, layer.description);
      });
      link(parent, 'Explorar los esquemas de infraestructura →', '/perfil/#infraestructura');
    },
    contact(parent) {
      line(parent, 'Aquí puedes encontrarme:', 'terminal-highlight');
      link(parent, 'GitHub / Sadek2110 →', data.profile.github);
      if (data.profile.email) link(parent, data.profile.email, `mailto:${data.profile.email}`);
      if (data.profile.linkedin) link(parent, 'LinkedIn →', data.profile.linkedin);
    },
  };
  const execute = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    history.push(text);
    history = history.slice(-50);
    historyPosition = history.length;
    draft = '';
    input.value = '';
    const command = text.toLowerCase();
    if (command === 'exit') { dialog.close(); return; }
    if (command === 'clear') { output.replaceChildren(); input.focus(); return; }
    const block = document.createElement('div');
    block.className = 'terminal-entry';
    line(block, `~ $ ${text}`, 'terminal-prompt');
    // Lista cerrada: texto desconocido se muestra literalmente, nunca se ejecuta.
    if (Object.hasOwn(commands, command)) commands[command](block);
    else line(block, `No conozco ese comando. Escribe help para ver las opciones.`, 'terminal-muted');
    output.append(block);
    while (output.children.length > 40) output.firstElementChild?.remove();
    output.scrollTop = output.scrollHeight;
    input.focus();
  };
  form.addEventListener('submit', event => { event.preventDefault(); execute(input.value); });
  dialog.querySelectorAll<HTMLButtonElement>('[data-command]').forEach(button => button.addEventListener('click', () => execute(button.dataset.command || '')));
  input.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key) || !history.length) return;
    event.preventDefault();
    if (historyPosition === history.length) draft = input.value;
    historyPosition = Math.min(history.length, Math.max(0, historyPosition + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = historyPosition === history.length ? draft : history[historyPosition];
    input.setSelectionRange(input.value.length, input.value.length);
  });
}
