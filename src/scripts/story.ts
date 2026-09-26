// Scroll nativo con snap. Solo se animan los elementos de contenido; la foto es estática.
const story = document.querySelector<HTMLElement>('[data-scroll-story]');
if (story) {
  const chapters = [...story.querySelectorAll<HTMLElement>('[data-chapter]')];
  const reveals = chapters.map(chapter => [...chapter.querySelectorAll<HTMLElement>('[data-story-reveal]')]);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  function update() {
    frame = 0;
    const viewport = innerHeight;
    let current = 0;
    let nearest = Infinity;
    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
      const distance = Math.abs(rect.top + Math.min(rect.height, viewport) / 2 - viewport / 2);
      if (distance < nearest) { nearest = distance; current = index; }
      const entering = clamp((viewport - rect.top) / (viewport * .72));
      const leaving = clamp(rect.bottom / (viewport * .42));
      chapter.style.setProperty('--chapter-reveal', String(Math.min(entering, leaving)));
      reveals[index].forEach((element, order) => {
        const enter = clamp((viewport - rect.top - Math.min(order, 5) * 35) / (viewport * .68));
        const opacity = reduce.matches ? 1 : Math.min(enter, leaving);
        const shift = reduce.matches ? 0 : (1 - enter) * (28 + Math.min(order, 5) * 7) - (1 - leaving) * 22;
        element.style.setProperty('--reveal-opacity', String(opacity));
        element.style.setProperty('--reveal-y', shift + 'px');
      });
    });
    story!.dataset.chapter = String(current);
    story!.classList.toggle('contact-active', current === chapters.length - 1);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function preferences() {
    story!.classList.toggle('story-enhanced', !reduce.matches);
    schedule();
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', schedule);
  reduce.addEventListener('change', preferences);
  preferences();
}
