/** Contrato que podrá recibir el futuro endpoint del chat conectado a n8n. */
export type ContactMessage = { name: string; email: string; message: string; source: 'portfolio'; page: string };

export function contactMailto(recipient: string, message: ContactMessage): string {
  const subject = 'Contacto desde el portfolio';
  const body = `Nombre: ${message.name}\nCorreo de respuesta: ${message.email}\n\n${message.message}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const dialog = document.querySelector<HTMLDialogElement>('#contact-chat');
const form = dialog?.querySelector<HTMLFormElement>('.chat-form');
if (dialog && form && typeof dialog.showModal === 'function') {
  let opener: HTMLButtonElement | null = null;
  document.querySelectorAll<HTMLButtonElement>('[data-contact-chat-open]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
      document.documentElement.classList.add('contact-chat-open');
      dialog.querySelector<HTMLInputElement>('#chat-name')?.focus({ preventScroll: true });
    });
  });
  dialog.querySelector('[data-chat-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('contact-chat-open');
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('button, input, textarea, a[href]')].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const message: ContactMessage = {
      name: String(data.get('name') || '').trim(), email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(), source: 'portfolio', page: location.origin + location.pathname,
    };
    const status = dialog.querySelector<HTMLElement>('.chat-status');
    if (!message.name || !message.email || !message.message) {
      if (status) status.textContent = 'Completa tu nombre, correo y mensaje para continuar.';
      return;
    }
    // Sin backend todavía: no se transmite ni almacena el borrador en un servidor.
    // Sustituir esta entrega por el endpoint del chat al integrar n8n.
    location.href = contactMailto(dialog.dataset.recipient || '', message);
    if (status) status.textContent = 'Mensaje preparado. Envíalo desde tu aplicación de correo; si no se abre, puedes copiarlo o llamarme.';
  });
}
