import React, { useState } from 'react';
import { Search, ExternalLink, Bot, Code, Globe, FileSpreadsheet, Trophy } from 'lucide-react';

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
}

export default function ProjectFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const projects: Project[] = [
    {
      id: 1,
      title: "Sistema de Scraping Automático",
      description: "Un flujo inteligente que permite raspar cualquier sitio web enviando una URL a un Bot de Telegram y recibir un informe estructurado directo en Notion o Google Drive.",
      category: "automation",
      categoryLabel: "Automatización & IA",
      status: "idea",
      statusLabel: "Planificado (Idea)",
      tech: ["n8n", "APIs HTTP", "Webhooks", "Telegram Bot", "Google Drive", "Notion"],
      icon: <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      features: [
        "Extracción de datos de contacto, logos e imágenes.",
        "Generación automática de prompts de IA para rediseñar la web.",
        "Guardado y organización automática en Google Drive o Notion."
      ]
    },
    {
      id: 2,
      title: "Bot Personal de Tareas",
      description: "Un asistente en Telegram o WhatsApp diseñado para gestionar tus tareas y recordatorios diarios mediante lenguaje natural e integraciones directas.",
      category: "automation",
      categoryLabel: "Automatización & IA",
      status: "idea",
      statusLabel: "Planificado (Idea)",
      tech: ["n8n", "Telegram Bot", "Google Tasks", "Google Calendar", "VPS"],
      icon: <FileSpreadsheet className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      features: [
        "Añadir, ver y marcar tareas como completadas desde el chat.",
        "Recordatorios proactivos y alertas de eventos diarios.",
        "Sincronización en tiempo real con Google Tasks y Calendar."
      ]
    },
    {
      id: 3,
      title: "Plataforma Web Deportiva Ceuta",
      description: "Una aplicación web integral diseñada para gestionar de forma moderna y centralizada las competiciones locales y campos deportivos en la ciudad de Ceuta.",
      category: "web",
      categoryLabel: "Desarrollo Web",
      status: "idea",
      statusLabel: "Planificado (Idea)",
      tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "GitHub", "VPS"],
      icon: <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      features: [
        "Gestión de equipos, perfiles de jugadores y estadísticas de partidos.",
        "Reserva en tiempo real y mapa de campos deportivos en Ceuta.",
        "Sistema de solicitudes y notificaciones para jugadores."
      ]
    },
    {
      id: 4,
      title: "Portafolio Web Profesional",
      description: "Este sitio web. Un portafolio optimizado para mostrar habilidades técnicas y personales con un enfoque claro en el rendimiento y una estética Neo-brutalista.",
      category: "both",
      categoryLabel: "Web & IA",
      status: "completado",
      statusLabel: "Completado",
      tech: ["Astro", "Tailwind CSS", "React (Islands)", "Lucide Icons", "GitHub"],
      icon: <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      features: [
        "Arquitectura Astro Islands que reduce el Javascript en el cliente.",
        "Simulación interactiva de PowerShell para desplegar información.",
        "Optimización de SEO y rendimiento de carga ultra rápido."
      ]
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
                  <h4 className="text-xs uppercase font-bold text-zinc-950 dark:text-zinc-50 mb-1.5">Características planificadas:</h4>
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
                {project.status === 'completado' && (
                  <a
                    href="#top"
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Ver en vivo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
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
