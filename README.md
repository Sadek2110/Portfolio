# Sadek Ben Jouda — Portfolio

Portfolio en español construido con **Astro, TypeScript y Tailwind CSS**. Sitio estático, sin backend ni hidratación de React. Fuentes locales, cuatro proyectos destacados y dos secundarios con páginas individuales, filtros accesibles, terminal interactiva, esquemas de infraestructura y portada con retrato estático extraído del material entregado en `ingredients`. La landing resume el perfil en cinco secciones con scroll snap obligatorio y transiciones de contenido.

## Ejecutar en Antigravity o cualquier editor

Abre esta carpeta como proyecto. Necesitas Node.js compatible con `package.json` y npm.

```bash
npm ci
npm run dev
```

Abre `http://localhost:4321`.

Si ese puerto está ocupado, Astro indica otro en la terminal. Durante la entrega, la vista previa de desarrollo de **esta carpeta** quedó en `http://localhost:4322`; el puerto 4321 pertenece a otra copia del proyecto.

Para producción:

```bash
npm run build
npm run preview
```

`build` comprueba los tipos con `astro check` y genera el sitio en `dist/`. No abras los archivos Astro con `file://`; usa el servidor local.

## Contenido editable

Todos los datos públicos y las fichas están en **`src/data/portfolio.ts`**: perfil, contactos, proyectos, tecnologías y proceso. Los enlaces vacíos se ocultan. El correo, cuando se añada, activa el enlace `mailto:` y el botón para copiarlo con aviso accesible. `profile.cv` activa la descarga de CV; coloca el PDF en `public/` y usa su ruta pública.

`projects` contiene los cuatro destacados, `moreProjects` los secundarios y `allProjects` unifica las rutas, los filtros y la terminal. `infrastructure` define las capas y los recorridos de los diagramas. Los ejemplos del proceso enlazan con sus casos de estudio.

La estructura tiene un idioma base (`profile.locale = 'es'`). Una futura versión inglesa debe añadir contenido revisado y rutas localizadas; no se han inventado traducciones.

```text
src/
  components/    Navegación, ScrollStory, proyectos, gráficos, presentación,
                 habilidades, proceso, contacto y pie
  data/          portfolio.ts: contenido y datos de proyectos
  layouts/       Documento, metadatos, fuentes y estilos compartidos
  pages/         Inicio, /perfil/, /proyectos/, /proyectos/[slug]/, 404 y robots.txt
  scripts/       Transiciones por scroll, menú, filtros, diagramas, terminal y copia de correo
  styles/        global.css: base; story.css: landing; enhancements.css: terminal e infraestructura
public/
  favicon.svg
  media/         hero.mp4, hero-poster.webp y social.jpg
scripts/         Generación de la imagen social con el navegador
tests/           Pruebas de navegación, accesibilidad y comportamiento
ingredients/     Material original conservado; no se publica en dist
Dockerfile       Compilación Node y servidor Nginx
nginx.conf       Archivos estáticos, caché y página 404 real
```

## Portada y recursos

- `hero-poster.webp`: retrato estático extraído del vídeo aportado, visible solo en la primera sección. El resto continúa con fondos oscuros y un cierre lima.
- Cinco capítulos: inicio, perfil, proyectos, enfoque y contacto. El scroll usa `scroll-snap-type: y mandatory` nativo y conserva la navegación por teclado y enlaces.
- Los títulos, textos y enlaces entran de forma escalonada con opacidad y desplazamientos suaves ligados al scroll; al retroceder la transición se invierte. Las líneas y los indicadores acompañan el avance.
- No se reproducen ni descargan vídeos o secuencias de fotogramas en la landing. Los recursos anteriores se conservan en disco, sin uso en esta página.
- Movimiento reducido: contenido visible sin transiciones ni snap obligatorio. Se atienden cambios de preferencia en tiempo real.
- Sin JavaScript o si falla la imagen, el contenido y los enlaces siguen disponibles.
- `/proyectos/` contiene el catálogo completo y los filtros; `/perfil/` amplía la presentación, las habilidades, el proceso y la infraestructura.
- Los gráficos de proyectos están dibujados con HTML/CSS/SVG y etiquetados **«Esquema del proyecto»**. No son capturas reales. Para sustituirlos, añade `screenshot: { src, alt, width, height }` a una ficha y coloca el recurso en `public/media/`.
- `social.jpg`: imagen Open Graph local de 1200 × 630. Para regenerarla con el servidor abierto: `node scripts/create-social.mjs` (necesita Chromium de Playwright).
- Fuentes Manrope e IBM Plex Mono servidas localmente mediante Fontsource. No hay analítica ni cookies de seguimiento añadidas.

## Fuentes y estado de los proyectos

Se utilizaron los tres documentos en `ingredients/docuumentos/` y se contrastaron los repositorios públicos de [Sadek2110](https://github.com/Sadek2110).

| Proyecto | Evidencia | Estado mostrado |
| --- | --- | --- |
| [GymFlow AI](https://github.com/Sadek2110/GymFlow) | README público y material personal | En desarrollo |
| [FastPlay](https://github.com/Sadek2110/TFG) | README público del TFG | Proyecto académico |
| [ReservaGym](https://github.com/Sadek2110/ReservaGym) | README público | Implementación documentada |
| [ScrapperAuto](https://github.com/Sadek2110/ScrapperAuto) | Documento personal y dependencias de `package.json` | Estado por confirmar |
| [QuizJardineria](https://github.com/Sadek2110/QuizJardineria) | Documento personal y dependencias de `package.json` | Estado por confirmar |
| [ALSA](https://github.com/Sadek2110/ALSA) | Documento personal y dependencias de `package.json` | Estado por confirmar |

La documentación de cada caso distingue el alcance comprobado. No se han ejecutado las aplicaciones externas ni se afirma que estén terminadas, que tengan clientes o que estén operativas en producción. Las recomendaciones de IA de GymFlow no se anuncian como terminadas. No se añadieron demos sin comprobar. QuizJardineria y ALSA aparecen en un archivo secundario para mantener cuatro protagonistas. El nombre ALSA identifica el repositorio personal y no implica una relación comercial.

## Mejoras incorporadas de la otra versión

- **Terminal propia en Astro y TypeScript**, abierta desde la navegación o con Ctrl/Cmd + tecla de acento grave. Comandos: `help`, `about`, `projects`, `skills`, `infra`, `contact`, `clear` y `exit`. También tiene accesos rápidos e historial con ↑/↓. Es una navegación simulada del portfolio: no ejecuta comandos del sistema ni envía entradas a un servidor.
- **Accesibilidad del diálogo:** foco contenido, cierre con Escape o botón, devolución del foco al lanzador (o al menú móvil), respuestas anunciadas y controles ocultos si no hay JavaScript.
- **Infraestructura:** Git/GitHub → Docker → VPS/EasyPanel y diagramas seleccionables de GymFlow y ReservaGym. Sin JavaScript se muestran ambos recorridos. Los esquemas representan la arquitectura documentada, no telemetría de producción.
- **Proceso con casos concretos** enlazados y **dos proyectos adicionales** con sus tecnologías contrastadas.
- **Perfil estructurado `Person`** generado a partir de los mismos datos públicos, sin dominio ni perfiles sociales inventados.

No se copiaron contactos sin confirmar, el CV provisional, métricas de disponibilidad ni afirmaciones de producción de la otra versión.

La referencia de YouTube de `instructions.md` no pudo visualizarse desde el entorno. Se siguieron las indicaciones escritas para crear una composición propia. Integración de estilos basada en la [documentación oficial de Astro](https://docs.astro.build/en/guides/styling/).

## Dominio, SEO y sitemap

El Dockerfile usa `https://portfolio.dksaa.com` como valor predeterminado de `SITE_URL`. No es necesario configurar variables para trabajar en local. Para el dominio definitivo, copia `.env.example` a `.env` y asigna una URL completa:

```env
SITE_URL=https://tu-dominio.es
```

Vuelve a compilar. Ese valor configura canonical, URL absoluta de Open Graph, sitemap y su referencia desde `robots.txt`. Sin dominio se omiten canonical y sitemap, evitando publicar una URL ficticia. No se ha asumido que el dominio del portfolio anterior vaya a alojar este nuevo proyecto.

## Desplegar en EasyPanel

1. Sube el código a tu repositorio y crea un servicio **App** en EasyPanel conectado a ese repositorio.
2. Selecciona compilación mediante **Dockerfile**, ruta `Dockerfile`, contexto la raíz del proyecto.
3. Configura el puerto interno **80**. Nginx sirve los archivos estáticos; no es necesario ejecutar Node en producción.
4. Configura el argumento de compilación `SITE_URL` con el dominio completo. Si tu instalación no expone argumentos de build, fija `site` en `astro.config.mjs` antes de compilar. Una variable añadida únicamente al contenedor Nginx no cambia un sitio ya compilado.
5. Asigna dominio y HTTPS en EasyPanel y despliega.

Validación local de Docker, si tienes el daemon disponible:

```bash
docker build --build-arg SITE_URL=https://tu-dominio.es -t sadek-portfolio .
docker run --rm -p 8080:80 sadek-portfolio
```

También puedes publicar directamente `dist/` en cualquier alojamiento estático. La configuración de Nginx conserva respuestas 404 y cachea assets; no redirige rutas desconocidas al inicio. Destino de publicación: `paginas_sencillas/portfolio` en EasyPanel, compilado desde `Sadek2110/Portfolio`, rama `main`, con Dockerfile y puerto interno 80. Dominio: `https://portfolio.dksaa.com`.

## Pruebas

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright inicia automáticamente `astro preview` en el puerto **4399**, separado del servidor de desarrollo, y prueba la compilación de `dist/`. No reutiliza otros servidores. En máquinas con Chromium ya instalado puedes definir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` con la ruta al ejecutable.

Se prueban los anchos **360, 768 y 1440 px**, desbordamiento, reglas automáticas WCAG A/AA con axe, filtros, menú mediante teclado, las seis páginas de proyecto, enlaces internos, 404, scroll obligatorio, foto limitada a la portada, ausencia de descargas de vídeo, movimiento reducido, fallo de la imagen y funcionamiento sin JavaScript. Las pruebas adicionales cubren comandos e historial de la terminal, texto literal, foco y enlaces del diálogo móvil, diagramas de infraestructura y el perfil estructurado. Las capturas se guardan en `test-results/`. Las comprobaciones automáticas no sustituyen una auditoría manual completa de accesibilidad.

Verificación de la versión ampliada: `npm run build` sin errores ni advertencias; **15 pruebas de Playwright**; revisión visual de las capturas de escritorio, móvil, terminal y diagramas. La configuración Docker se validó en la entrega inicial mediante construcción de imagen y `nginx -t`; vuelve a construirla para incorporar las mejoras. El dominio reservado usado en esa prueba local debe sustituirse por el real al desplegar.

## Pendientes para personalizar o publicar

- LinkedIn, si quieres añadirlo. Correo y teléfono ya están confirmados y publicados.
- CV en PDF, si quieres mostrar la descarga.
- Capturas reales de proyectos y demos que quieras publicar.
- Confirmación del estado final de FastPlay, ReservaGym y ScrapperAuto. Mientras tanto no se etiquetan como terminados.
- Una fotografía original, si quieres sustituir el fotograma del vídeo generado aportado.

No se publican fecha de nacimiento, dirección privada ni credenciales personales. El teléfono y el correo se muestran por indicación expresa de Sadek.

## Contacto y futuro chat con n8n

Contacto confirmado: `sadekjoud@gmail.com` y `+34 616 863 398`. Se centraliza en `src/data/portfolio.ts`, con enlaces `mailto:` y `tel:`. La flecha de la sección de contacto abre `ContactChat.astro` tanto en escritorio como en móvil.

El diálogo permite redactar nombre, correo de respuesta y mensaje. Por ahora, **Continuar por correo** abre un borrador en la aplicación de correo del visitante; no envía automáticamente ni simula una entrega. Cerrar y volver a abrir conserva el borrador en esa página, sin almacenamiento persistente.

La entrega está aislada en `src/scripts/contact-chat.ts`. La futura conexión con n8n podrá recibir el contrato `ContactMessage`: `{ name, email, message, source: 'portfolio', page }`. Queda pendiente implementar el endpoint de recepción, la validación y los estados de envío real, y conectar el flujo con Gmail o Telegram. Las credenciales de esos servicios deben permanecer en el servidor. No hay un webhook configurado ni llamadas a n8n en esta versión.
