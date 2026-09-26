import { chromium } from '@playwright/test';
import { resolve } from 'node:path';

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4321');
await page.evaluate(async () => {
  await document.fonts.ready;
  document.body.innerHTML = `<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#10110f;color:#f0f0e8;font-family:'Manrope Variable',sans-serif">
    <img src="/media/hero-poster.webp" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.55)" alt="">
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#10110fdd 57%,#10110f),linear-gradient(0deg,#10110f,transparent 65%)"></div>
    <div style="position:absolute;left:50px;top:35px;font-size:39px;font-weight:800;letter-spacing:-4px">s<span style="color:#c6f277">/</span>b<span style="color:#c6f277">.</span></div>
    <div style="position:absolute;top:146px;left:540px;width:620px">
      <div style="color:#c6f277;font-size:13px;letter-spacing:2px;margin-bottom:28px">DESARROLLO WEB & AUTOMATIZACIÓN</div>
      <div style="font-size:112px;font-weight:800;line-height:1;letter-spacing:-8px">SADEK</div>
      <div style="font-size:73px;font-weight:800;line-height:1.15;letter-spacing:-5px">BEN JOUDA<span style="color:#c6f277">.</span></div>
      <div style="font-size:23px;line-height:1.6;color:#bec5b3;margin-top:28px;width:520px">Aplicaciones web y automatizaciones<br>que resuelven problemas reales.</div>
    </div>
    <div style="position:absolute;bottom:38px;left:50px;color:#b4bfa6;font-size:11px;letter-spacing:2px">CEUTA, ESPAÑA · PORTFOLIO PERSONAL</div>
    <div style="position:absolute;bottom:0;height:6px;width:100%;background:#c6f277"></div>
  </div>`;
  await Promise.all([...document.images].map(image => image.decode()));
});
await page.screenshot({ path: resolve('public/media/social.jpg'), type: 'jpeg', quality: 90 });
await browser.close();
console.log('Imagen Open Graph creada: public/media/social.jpg');
