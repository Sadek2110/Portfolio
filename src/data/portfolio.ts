/** Contenido público. Fuentes: ingredients/docuumentos y repositorios públicos.
 * Idioma base: es. Para una futura versión inglesa, crear otro objeto localizado.
 * No añadir datos de contacto o estados de entrega sin confirmación de Sadek.
 */
export const profile = {
  locale: 'es',
  name: 'Sadek Ben Jouda Akil',
  shortName: 'Sadek Ben Jouda',
  role: 'Desarrollador web y creador de automatizaciones',
  location: 'Ceuta, España',
  headline: 'Desarrollo aplicaciones web y automatizaciones que resuelven problemas reales.',
  github: 'https://github.com/Sadek2110',
  email: '',
  linkedin: '',
  cv: '',
  about: 'Soy Sadek, desarrollador web de Ceuta y titulado en Desarrollo de Aplicaciones Web. Me gusta entender cómo funcionan las cosas y construir herramientas que hagan el día a día un poco más sencillo.',
  approach: 'Combino desarrollo web, automatización e inteligencia artificial para conectar ideas, servicios y personas. Desde una plataforma de fútbol hasta una reserva que se hace sola: aprendo construyendo, pruebo y sigo mejorando.',
  learning: 'Ahora sigo profundizando en inteligencia artificial, infraestructura y ciberseguridad.',
};

export type Project = {
  slug: string;
  title: string;
  category: 'Desarrollo web' | 'Automatización';
  type: string;
  status: string;
  visual: 'gym' | 'football' | 'workflow' | 'scraper' | 'quiz' | 'agency';
  description: string;
  stack: string[];
  repo: string;
  demo?: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
  context: string;
  challenge: string;
  work: string[];
  result: string;
  source: string;
};

export const projects: Project[] = [
  {
    slug: 'gymflow', title: 'GymFlow AI', category: 'Desarrollo web',
    type: 'APLICACIÓN WEB · FITNESS', status: 'En desarrollo', visual: 'gym',
    description: 'Del primer entrenamiento al siguiente objetivo. Rutinas, sesiones y progreso en un mismo lugar.',
    stack: ['Astro', 'React', 'NestJS', 'Prisma', 'PostgreSQL'],
    repo: 'https://github.com/Sadek2110/GymFlow',
    context: 'Un proyecto personal para reunir la planificación y el seguimiento del entrenamiento en una aplicación pensada primero para móvil.',
    challenge: 'Relacionar ejercicios, rutinas y sesiones sin complicar el uso diario, manteniendo los datos de cada persona separados.',
    work: ['Frontend con Astro e islas de React, y API independiente con NestJS.', 'Modelado de perfiles, ejercicios, rutinas e historial con Prisma y PostgreSQL.', 'Registro de sesiones y panel de progreso, según la documentación del repositorio.', 'Integración opcional con ReservaGym y configuración de despliegue con Docker.'],
    result: 'El repositorio documenta un MVP con planificación, registro e historial. El proyecto continúa en desarrollo; las recomendaciones con IA no se presentan como una funcionalidad terminada.',
    source: 'README público de GymFlow y documentación personal. Funcionalidades documentadas; sin verificación de una demo en producción.',
  },
  {
    slug: 'fastplay', title: 'FastPlay', category: 'Desarrollo web',
    type: 'PROYECTO FINAL · DAW', status: 'Proyecto académico', visual: 'football',
    description: 'Menos organización, más fútbol. Una plataforma para conectar equipos y competiciones locales.',
    stack: ['PHP', 'SQLite', 'JavaScript', 'MVC'], repo: 'https://github.com/Sadek2110/TFG',
    context: 'Mi trabajo final de Desarrollo de Aplicaciones Web: una plataforma para organizar fútbol amateur con usuarios, equipos, partidos, campos y ligas.',
    challenge: 'Coordinar diferentes roles y calcular las clasificaciones a partir de los resultados, con una estructura de código clara y mantenible.',
    work: ['Arquitectura MVC propia en PHP, con vistas semánticas y JavaScript sin frameworks.', 'Persistencia con SQLite y consultas preparadas mediante PDO.', 'Gestión de equipos, partidos, campos y ligas, con permisos por rol.', 'Autenticación, protección CSRF y validación en el servidor.'],
    result: 'El repositorio del TFG incluye la implementación, datos de demostración e instrucciones para ejecutarlo. Su documentación delimita el alcance del MVP; no incluye pagos ni chat en tiempo real.',
    source: 'README público del repositorio TFG. Estado de entrega académica final pendiente de confirmar; no se afirma un despliegue público.',
  },
  {
    slug: 'reservagym', title: 'ReservaGym', category: 'Automatización',
    type: 'API · AUTOMATIZACIÓN', status: 'Implementación documentada', visual: 'workflow',
    description: 'Una tarea repetitiva, un flujo automático. Reservas deportivas conectadas con Playwright y n8n.',
    stack: ['Node.js', 'Express', 'Playwright', 'Docker', 'n8n'],
    repo: 'https://github.com/Sadek2110/ReservaGym',
    context: 'Una API para automatizar el proceso de reserva de plaza en el gimnasio, preparada para recibir peticiones desde un flujo programado.',
    challenge: 'Recorrer una web de reservas desde el servidor y permitir probar el flujo antes de confirmar una operación real.',
    work: ['API con Express y autenticación mediante token.', 'Navegación automatizada con Playwright y Chromium.', 'Modo dry-run para comprobar el proceso antes de la confirmación final.', 'Dockerfile y documentación de integración con n8n y EasyPanel.'],
    result: 'El repositorio documenta la API, los endpoints de estado y reserva y el despliegue. La ejecución depende de la plataforma externa y de la configuración del usuario; no se afirma disponibilidad continua en producción.',
    source: 'README público de ReservaGym. Implementación documentada; estado final y operación en producción pendientes de confirmar.',
  },
  {
    slug: 'scrapperauto', title: 'ScrapperAuto', category: 'Automatización',
    type: 'EXTRACCIÓN WEB · HERRAMIENTAS', status: 'Estado por confirmar', visual: 'scraper',
    description: 'De una web a información útil. Extracción de contenido y recursos como punto de partida para un rediseño.',
    stack: ['Fastify', 'Playwright', 'Cheerio'],
    repo: 'https://github.com/Sadek2110/ScrapperAuto',
    context: 'Una herramienta para analizar páginas web y organizar el material necesario antes de plantear un rediseño.',
    challenge: 'Separar contenido, datos de contacto e imágenes de la estructura de una página para convertirlos en información reutilizable.',
    work: ['Extracción de contenido y recursos web, según la documentación personal aportada.', 'Fastify, Playwright y Cheerio confirmados en las dependencias del repositorio.', 'Preparación del contenido como entrada para un proceso posterior de rediseño.'],
    result: 'El repositorio público está disponible. El alcance funcional y el estado final están pendientes de confirmación; la generación posterior de webs se considera una línea de evolución.',
    source: 'Archivo Proyectos_GitHub_Sadek_Ben_Jouda.txt y package.json del repositorio público. Tecnologías contrastadas; sin README ni demo verificada.',
  },
];

export const skillGroups = [
  { number: '01', title: 'Desarrollo web', note: 'De la interfaz a los datos.', skills: ['Astro', 'React', 'TypeScript', 'JavaScript', 'PHP', 'Node.js', 'NestJS', 'PostgreSQL', 'SQLite'], project: 'GymFlow AI + FastPlay' },
  { number: '02', title: 'Automatización', note: 'Que lo repetitivo se haga solo.', skills: ['Playwright', 'n8n', 'APIs REST', 'Webhooks', 'Express'], project: 'ReservaGym' },
  { number: '03', title: 'Despliegue', note: 'Del repositorio al servidor.', skills: ['Docker', 'Docker Compose', 'EasyPanel', 'Git', 'GitHub'], project: 'GymFlow AI + ReservaGym' },
];

export const process = [
  { title: 'Entender', text: 'Empezar por una necesidad concreta y decidir qué merece la pena resolver.', example: 'FastPlay: reunir equipos, partidos y clasificación en un mismo lugar.', project: 'fastplay' },
  { title: 'Diseñar', text: 'Dar estructura a la idea: flujos sencillos, datos claros y responsabilidades separadas.', example: 'GymFlow: separar la interfaz, la API y el modelo de entrenamiento.', project: 'gymflow' },
  { title: 'Construir', text: 'Convertirlo en código y comprobar los casos importantes antes de seguir.', example: 'FastPlay: validar permisos, formularios y consultas a la base de datos.', project: 'fastplay' },
  { title: 'Automatizar', text: 'Conectar servicios y quitar trabajo manual donde tiene sentido.', example: 'ReservaGym: activar Playwright desde n8n y probar con dry-run.', project: 'reservagym' },
];

// Archivo secundario: mantiene cuatro proyectos destacados y amplía los casos.
export const moreProjects: Project[] = [
  {
    slug: 'quizjardineria', title: 'QuizJardineria', category: 'Desarrollo web',
    type: 'EDUCACIÓN · CUESTIONARIOS', status: 'Estado por confirmar', visual: 'quiz',
    description: 'Un espacio para crear cuestionarios, practicar y consultar resultados con perfiles de profesor y alumno.',
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL'],
    repo: 'https://github.com/Sadek2110/QuizJardineria',
    context: 'Una plataforma de cuestionarios aplicada a la enseñanza de jardinería, con flujos distintos para profesores y alumnos.',
    challenge: 'Relacionar preguntas, cuestionarios y resultados y ofrecer a cada rol las herramientas que necesita.',
    work: ['Interfaz con Next.js y React; dependencias contrastadas en el repositorio.', 'Modelo de datos con Prisma y PostgreSQL, según el material personal aportado.', 'Creación de preguntas, cuestionarios y seguimiento de resultados descritos en la documentación personal.'],
    result: 'El repositorio está disponible y confirma el uso de Next.js, React y Prisma. El alcance funcional, el estado final y una demo pública quedan pendientes de validación.',
    source: 'Proyectos_GitHub_Sadek_Ben_Jouda.txt y package.json público de QuizJardineria. Sin README ni prueba de la aplicación en ejecución.',
  },
  {
    slug: 'alsa', title: 'ALSA · Gestión de agencias', category: 'Desarrollo web',
    type: 'GESTIÓN · APLICACIÓN WEB', status: 'Estado por confirmar', visual: 'agency',
    description: 'Un panel de gestión para agencias de viajes y transporte marítimo, con área privada y comunicaciones por correo.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Nodemailer'],
    repo: 'https://github.com/Sadek2110/ALSA',
    context: 'Un proyecto de gestión de agencias de viajes y transporte marítimo. Se presenta como proyecto del repositorio personal, sin atribuir una relación comercial con la empresa del mismo nombre.',
    challenge: 'Reunir la gestión interna y las comunicaciones en una aplicación con acceso privado.',
    work: ['Backend con Node.js y Express, contrastado en package.json.', 'Dependencias para PostgreSQL, envío de correo y validación de peticiones presentes en el repositorio.', 'Área privada y gestión de agencias descritas en el material personal.'],
    result: 'El código público permite consultar la estructura del proyecto y sus dependencias. No se afirma una entrega a un cliente, un despliegue en producción ni un estado terminado.',
    source: 'Proyectos_GitHub_Sadek_Ben_Jouda.txt y package.json público de ALSA. Sin README ni demo verificada.',
  },
];

export const allProjects = [...projects, ...moreProjects];

export const infrastructure = {
  title: 'Del código a algo que funciona.',
  description: 'Trabajo con un VPS propio, Docker y EasyPanel para llevar mis aplicaciones más allá del entorno local. Me interesa entender el recorrido completo: construir, conectar y desplegar.',
  layers: [
    { id: 'code', label: '01 / ORIGEN', title: 'Código versionado', tool: 'Git + GitHub', description: 'Repositorios que reúnen el código y las instrucciones de cada proyecto.' },
    { id: 'build', label: '02 / EMPAQUETADO', title: 'Entornos reproducibles', tool: 'Docker', description: 'Contenedores para empaquetar aplicaciones y sus dependencias.' },
    { id: 'deploy', label: '03 / DESPLIEGUE', title: 'Un lugar donde vivir', tool: 'VPS + EasyPanel', description: 'Un entorno propio para gestionar aplicaciones, servicios y dominios.' },
  ],
  flows: [
    { id: 'gymflow', label: 'GymFlow AI', kind: 'APLICACIÓN WEB', nodes: ['Astro + React', 'API NestJS', 'PostgreSQL'], description: 'Interfaz, API y base de datos como servicios separados. La documentación del proyecto incluye su configuración con Docker y EasyPanel.', href: '/proyectos/gymflow/' },
    { id: 'reservagym', label: 'ReservaGym', kind: 'AUTOMATIZACIÓN', nodes: ['n8n', 'API Express', 'Playwright'], description: 'Un flujo programado llama a la API y Playwright recorre la web de reservas. El modo dry-run permite probar antes de confirmar.', href: '/proyectos/reservagym/' },
  ],
};
