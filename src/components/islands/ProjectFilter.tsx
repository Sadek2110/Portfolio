import React, { useState } from 'react';
import { Search, ExternalLink, Bot, Globe, Dumbbell, CalendarCheck, GraduationCap, Building2, Trophy } from 'lucide-react';

// lucide-react ya no incluye iconos de marca, así que el logo de GitHub va inline.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.2 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'automation' | 'both';
  categoryLabel: string;
  status: 'completado' | 'en-progreso' | 'idea';
  statusLabel: string;
  tech: string[];
  icon: React.ReactNode;
  features: string[];
  repo?: string;
  live?: string;
}

export default function ProjectFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projects: Project[] = [
    {
      id: 1,
      title: "GymFlow AI",
      description: "Aplicación de gimnasio mobile-first en monorepo: registro de usuarios, perfil con historial de peso, catálogo de ejercicios, rutinas, entrenamientos y dashboard de progreso.",
      category: "both",
      categoryLabel: "Web & IA",
      status: "en-progreso",
      statusLabel: "En progreso (MVP 1)",
      tech: ["Astro", "React (Islands)", "NestJS", "Prisma", "PostgreSQL 16", "Tailwind CSS", "Docker"],
      icon: <Dumbbell className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      features: [
        "Monorepo con npm workspaces: API NestJS + Prisma y web Astro/React.",
        "Desarrollo dirigido por tests (TDD) con más de 160 tests en Jest y Vitest.",
        "Stack completo levantable con Docker Compose para self-hosting."
      ],
      repo: "https://github.com/Sadek2110/GymFlow"
    },
    {
      id: 2,
      title: "Gym Reserver API",
      description: "Automatización real que reserva cada mañana mi plaza en la sala Cardio-Fitness del C.D. Díaz Flor de Ceuta, controlando el navegador de forma headless sin intervención humana.",
      category: "automation",
      categoryLabel: "Automatización & IA",
      status: "completado",
      statusLabel: "En producción",
      tech: ["Node.js 22", "Express", "Playwright", "n8n", "Docker", "EasyPanel"],
      icon: <CalendarCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      features: [
        "API protegida con token Bearer y endpoint /health de monitorización.",
        "Modo dryRun que recorre todo el flujo y se detiene antes de confirmar.",
        "Desplegada 24/7 en VPS con Docker e invocada por un webhook programado en n8n."
      ],
      repo: "https://github.com/Sadek2110/ReservaGym"
    },
    {
      id: 3,
      title: "ScrapperAuto",
      description: "API self-hosted de scraping que analiza cualquier web, extrae su contenido estructurado y genera automáticamente prompts de IA listos para rediseñarla.",
      category: "automation",
      categoryLabel: "Automatización & IA",
      status: "completado",
      statusLabel: "Completado",
      tech: ["Fastify", "Playwright", "Cheerio", "Zod", "Docker"],
      icon: <Bot className="w-8 h-8 text-violet-600 dark:text-violet-400" />,
      features: [
        "Doble estrategia: scraper simple con Cheerio y avanzado con Playwright.",
        "Extracción de datos de contacto, metadatos, logos e imágenes.",
        "Detección del tipo de página y validación de entrada con Zod."
      ],
      repo: "https://github.com/Sadek2110/ScrapperAuto"
    },
    {
      id: 4,
      title: "FastPlay — TFG de DAW",
      description: "Plataforma web para organizar fútbol amateur: usuarios, equipos, partidos, campos y ligas con clasificación. Trabajo de fin de grado de 2.º de DAW, escrito sin frameworks.",
      category: "web",
      categoryLabel: "Desarrollo Web",
      status: "completado",
      statusLabel: "Completado (TFG)",
      tech: ["PHP 8", "MVC propio", "SQLite", "PDO", "JavaScript vanilla", "Apache"],
      icon: <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      features: [
        "Framework MVC propio: enrutador, capa de datos, sesiones, CSRF y validador.",
        "Dos niveles de competición (Liga Pro y Liga Amistosa) con clasificación.",
        "Consultas preparadas con PDO, sesiones endurecidas y protección CSRF."
      ],
      repo: "https://github.com/Sadek2110/TFG"
    },
    {
      id: 5,
      title: "Plataforma de Cuestionarios",
      description: "Aplicación docente para crear y corregir cuestionarios de jardinería, con roles diferenciados de profesor y alumno, notas, mensajería y estadísticas de rendimiento.",
      category: "web",
      categoryLabel: "Desarrollo Web",
      status: "completado",
      statusLabel: "Completado",
      tech: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Tailwind CSS", "Docker"],
      icon: <GraduationCap className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      features: [
        "Autenticación con JWT (jose) y contraseñas hasheadas con bcrypt.",
        "Paneles separados: el profesor gestiona preguntas, notas y estadísticas.",
        "API Routes de Next.js sobre Prisma con migraciones y datos de siembra."
      ],
      repo: "https://github.com/Sadek2110/QuizJardineria"
    },
    {
      id: 6,
      title: "ALSA — Gestión de Agencias",
      description: "Panel de gestión para agencias de viajes y transporte marítimo, con área privada, alta de agencias y comunicación por correo con las navieras.",
      category: "web",
      categoryLabel: "Desarrollo Web",
      status: "completado",
      statusLabel: "Completado",
      tech: ["Node.js", "Express", "PostgreSQL", "Helmet", "Nodemailer", "Jest", "Supertest"],
      icon: <Building2 className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
      features: [
        "Autenticación con bcrypt y validación de entrada con express-validator.",
        "Endurecimiento HTTP con Helmet y CORS, más saneado de datos propio.",
        "Suite de tests de integración con Jest y Supertest sobre la API."
      ],
      repo: "https://github.com/Sadek2110/ALSA"
    },
    {
      id: 7,
      title: "Portafolio Web Profesional",
      description: "Este sitio web. Un portafolio optimizado para mostrar habilidades técnicas y personales con un enfoque claro en el rendimiento y una estética Neo-brutalista.",
      category: "both",
      categoryLabel: "Web & IA",
      status: "completado",
      statusLabel: "Completado",
      tech: ["Astro", "React (Islands)", "Tailwind CSS", "Lucide Icons", "Docker", "Nginx"],
      icon: <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      features: [
        "Arquitectura Astro Islands que reduce el Javascript en el cliente.",
        "Simulación interactiva de PowerShell para desplegar información.",
        "Optimización de SEO y rendimiento de carga ultra rápido."
      ],
      repo: "https://github.com/Sadek2110/Portfolio",
      live: "https://portfolio.dksaa.com"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || 
      project.category === selectedCategory || 
      (selectedCategory === 'web' && project.category === 'both') ||
      (selectedCategory === 'automation' && project.category === 'both');
    
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Controles de Filtro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos los proyectos' },
            { id: 'web', label: 'Desarrollo Web' },
            { id: 'automation', label: 'Automatización & IA' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 border-2 border-zinc-950 dark:border-zinc-50 font-bold text-xs md:text-sm transition-all cursor-pointer rounded-none ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#fafafa] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#fafafa] hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Barra de búsqueda */}
        <div className="relative flex items-center max-w-sm w-full">
          <Search className="absolute left-3 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por tecnología o nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-zinc-950 dark:border-zinc-50 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-none shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#fafafa]"
            aria-label="Buscar proyectos"
          />
        </div>
      </div>

      {/* Grid de Proyectos */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="neo-card hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#2563eb] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#18181b] flex flex-col justify-between p-6 rounded-none"
            >
              <div>
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 border-2 border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-950 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    {project.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xxs uppercase font-bold tracking-wider px-2 py-0.5 border border-zinc-950 dark:border-zinc-50 bg-zinc-100 dark:bg-zinc-800">
                      {project.categoryLabel}
                    </span>
                    <span className={`text-xxs font-bold px-2 py-0.5 border border-zinc-950 dark:border-zinc-50 ${
                      project.status === 'completado'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : project.status === 'en-progreso'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {project.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Título y Descripción */}
                <h3 className="text-xl font-bold font-heading mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Características destacadas */}
                <div className="mb-4">
                  <h4 className="text-xs uppercase font-bold text-zinc-950 dark:text-zinc-50 mb-1.5">Características destacadas:</h4>
                  <ul className="list-disc pl-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                    {project.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tecnologías y CTA */}
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map(techName => (
                    <span 
                      key={techName}
                      className="text-xs font-mono px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-none text-zinc-600 dark:text-zinc-300"
                    >
                      {techName}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-zinc-950 dark:text-zinc-50 hover:underline cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Ver código
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Ver en vivo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-none">
          <p className="text-zinc-500 dark:text-zinc-400 font-bold mb-2">No se encontraron proyectos</p>
          <p className="text-xs text-zinc-400">Intenta buscar por otra palabra clave o tecnología.</p>
        </div>
      )}
    </div>
  );
}
