import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [360, 768, 1440]) {
  test(`Historia y scroll mandatory a ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toContainText('SADEK');
    await expect(page.locator('.story-chapter[data-chapter]')).toHaveCount(5);
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollSnapType)).toBe('y mandatory');
    await expect(page.locator('.story-poster')).toBeVisible();
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    await page.screenshot({ path: `test-results/historia-${width}-inicio.png` });
    const story = page.locator('[data-scroll-story]');
    for (const [i, id] of ['sobre-mi', 'proyectos', 'infraestructura', 'contacto'].entries()) {
      await page.locator('#' + id).evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top, behavior: 'instant' }));
      await expect(story).toHaveAttribute('data-chapter', String(i + 1));
      expect(Math.abs(await page.locator('.story-backdrop').evaluate(el => el.getBoundingClientRect().top))).toBeLessThan(3);
      await expect.poll(() => page.locator('#' + id + ' [data-story-reveal]').last().evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(.9);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/historia-${width}-${id}.png` });
    }
    await page.locator('#sobre-mi').evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top, behavior: 'instant' }));
    await expect(story).toHaveAttribute('data-chapter', '1');
    expect(await page.locator('.story-portrait').evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test('Los filtros muestran solo su categoría y anuncian el resultado', async ({ page }) => {
  await page.goto('/proyectos/');
  await page.getByRole('button', { name: 'Automatización 02', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  await expect(page.locator('.project-card:visible').first()).toContainText('ReservaGym');
  await expect(page.locator('[data-filter-status]')).toHaveText('2 proyectos: Automatización.');
  await expect(page.locator('[data-project-archive]')).toBeHidden();
  await page.getByRole('button', { name: 'Desarrollo web 04', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  await expect(page.locator('[data-project]:visible')).toHaveCount(4);
  await expect(page.locator('.project-card:visible').first()).toContainText('GymFlow AI');
  await page.getByRole('button', { name: 'Todos 06', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(4);
  await expect(page.locator('[data-project]:visible')).toHaveCount(6);
});

test('Menú móvil con teclado, Escape y navegación', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /(?:Abrir|Cerrar) menú/ });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Sobre mí' }).click();
  await expect(page).toHaveURL(/#sobre-mi$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('Páginas de proyectos y enlaces internos completos', async ({ page, request }) => {
  for (const slug of ['gymflow', 'fastplay', 'reservagym', 'scrapperauto', 'quizjardineria', 'alsa']) {
    const response = await page.goto(`/proyectos/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'El reto' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ver código' })).toHaveAttribute('href', /^https:\/\/github.com\/Sadek2110\//);
    await page.setViewportSize({ width: 360, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/');
  const paths = await page.locator('a[href^="/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')!.split('#')[0]))]);
  for (const path of paths) expect((await request.get(path || '/')).ok(), path).toBe(true);
  const missing = await page.goto('/esta-pagina-no-existe/');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Volver al portfolio' })).toBeVisible();
});

test('Movimiento reducido: contenido sin descargas ni snap obligatorio', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', r => { if (r.url().includes('/sequence/') || r.url().endsWith('hero.mp4')) requests.push(r.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('video, canvas')).toHaveCount(0);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollSnapType)).toBe('none');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  expect(await page.locator('#contacto [data-story-reveal]').first().evaluate(el => getComputedStyle(el).transform)).toBe('none');
  expect(requests).toEqual([]);
});

test('Foto estática solo en portada, sin descargar animación de fondo', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', r => { if (r.url().includes('/sequence/') || r.url().endsWith('hero.mp4')) requests.push(r.url()); });
  await page.goto('/');
  await expect(page.locator('#inicio .story-poster')).toHaveCount(1);
  await expect(page.locator('video, canvas')).toHaveCount(0);
  await page.locator('#sobre-mi').evaluate(el => scrollTo({ top: scrollY + el.getBoundingClientRect().top, behavior: 'instant' }));
  await expect(page.locator('[data-scroll-story]')).toHaveAttribute('data-chapter', '1');
  expect(await page.locator('.story-poster').evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);
  expect(requests).toEqual([]);
});

test('Sin JavaScript siguen disponibles la historia y el catálogo', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('.story-chapter[data-chapter]')).toHaveCount(5);
  await expect(page.locator('[data-terminal-open]').first()).toBeHidden();
  await page.getByRole('link', { name: 'Explorar los 6 proyectos' }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(6);
  await expect(page.locator('.project-filters')).toBeHidden();
  await context.close();
});

test('Terminal: comandos, historial, salida literal y cierre con foco', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Terminal', exact: false }).first();
  await opener.click();
  const dialog = page.getByRole('dialog');
  const input = page.getByRole('textbox', { name: 'Comando de la terminal' });
  const log = page.getByRole('log');
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill('help'); await input.press('Enter');
  await expect(log).toContainText('Comandos disponibles');
  await input.fill('projects'); await input.press('Enter');
  await expect(log.getByRole('link')).toHaveCount(6);
  await page.screenshot({ path: 'test-results/terminal-desktop.png', animations: 'disabled' });
  await input.press('ArrowUp'); await expect(input).toHaveValue('projects');
  await input.press('ArrowUp'); await expect(input).toHaveValue('help');
  await input.press('ArrowDown'); await expect(input).toHaveValue('projects');
  await input.press('ArrowDown'); await expect(input).toHaveValue('');
  await input.fill('<img src=x onerror=alert(1)>'); await input.press('Enter');
  await expect(log).toContainText('<img src=x onerror=alert(1)>');
  await expect(log.locator('img')).toHaveCount(0);
  await input.fill('clear'); await input.press('Enter');
  await expect(log).toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test('Terminal móvil: accesibilidad, foco contenido y enlaces', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /(?:Abrir|Cerrar) menú/ });
  await menu.click();
  await page.getByRole('button', { name: 'Terminal', exact: false }).first().click();
  const dialog = page.getByRole('dialog');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  for (let i = 0; i < 13; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await dialog.getByRole('button', { name: 'infra', exact: false }).click();
  await page.screenshot({ path: 'test-results/terminal-mobile.png', animations: 'disabled' });
  await page.getByRole('log').getByRole('link', { name: /Explorar los esquemas/ }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/perfil\/#infraestructura$/);
});

test('Los esquemas de infraestructura se alternan con teclado', async ({ page }) => {
  await page.goto('/perfil/');
  await expect(page.locator('#flow-gymflow')).toBeVisible();
  await expect(page.locator('#flow-reservagym')).toBeHidden();
  const selector = page.getByRole('group', { name: 'Elegir esquema de arquitectura' });
  await selector.getByRole('button', { name: 'ReservaGym' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#flow-reservagym')).toBeVisible();
  await expect(page.locator('#flow-gymflow')).toBeHidden();
  await expect(page.locator('#flow-reservagym')).toContainText('Playwright');
  await page.locator('.infra-examples').screenshot({ path: 'test-results/infraestructura.png', animations: 'disabled' });
  await selector.getByRole('button', { name: 'GymFlow AI' }).click();
  await expect(page.locator('#flow-gymflow')).toBeVisible();
});

test('El perfil estructurado usa datos confirmados y las páginas nuevas son accesibles', async ({ page }) => {
  await page.goto('/');
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}');
  expect(person['@type']).toBe('Person');
  expect(person.sameAs).toEqual(['https://github.com/Sadek2110']);
  expect(person.name).toBe('Sadek Ben Jouda Akil');
  for (const slug of ['quizjardineria', 'alsa']) {
    await page.goto(`/proyectos/${slug}/`);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map(v => v.id)).toEqual([]);
  }
});

test('Un fallo de la foto conserva el contenido y los enlaces', async ({ page }) => {
  await page.route('**/media/hero-poster.webp', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.story-poster')).toBeVisible();
  await page.locator('#proyectos').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Explorar los 6 proyectos' })).toBeVisible();
});

test('Un gesto de rueda termina en el siguiente capítulo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.mouse.wheel(0, 550);
  await expect(page.locator('[data-scroll-story]')).toHaveAttribute('data-chapter', '1');
  await expect.poll(() => page.locator('#sobre-mi').evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(3);
});
