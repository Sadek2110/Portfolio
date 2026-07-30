import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ArrowRight } from 'lucide-react';

interface HistoryItem {
  type: 'input' | 'output';
  text: string;
  isHtml?: boolean;
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: 'Windows PowerShell' },
    { type: 'output', text: 'Copyright (C) Microsoft Corporation. Todos los derechos reservados.' },
    { type: 'output', text: 'Instalado Módulos Especializados: SadekAutomation v1.0.0' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Escribe un comando para interactuar (o haz clic en los botones rápidos de abajo):' },
    { type: 'output', text: 'Comandos: sadek.info, sadek.skills, sadek.projects, sadek.goals, sadek.contact, clear, help' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll dentro de la consola (sin mover la página)
  useEffect(() => {
    const el = consoleRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history, isTyping]);

  const focusInput = () => {
    if (window.innerWidth > 768) {
      inputRef.current?.focus();
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response: HistoryItem[] = [];

    switch (trimmedCmd) {
      case 'help':
        response = [
          { type: 'output', text: 'Comandos disponibles:' },
          { type: 'output', text: '  sadek.info     - Información sobre mí y mi perfil académico.' },
          { type: 'output', text: '  sadek.skills   - Mis conocimientos técnicos (Web, IA, Automatización).' },
          { type: 'output', text: '  sadek.projects - Resumen de los proyectos que estoy construyendo.' },
          { type: 'output', text: '  sadek.goals    - Mis objetivos profesionales a corto y largo plazo.' },
          { type: 'output', text: '  sadek.contact  - Mis enlaces y datos de contacto directo.' },
          { type: 'output', text: '  clear          - Limpiar la pantalla de la terminal.' },
          { type: 'output', text: '  help           - Mostrar esta lista de comandos.' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sadek.info':
        response = [
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: 'PERFIL PROFESIONAL: Sadek Ben Jouda' },
          { type: 'output', text: '----------------------------------------' },
          { type: 'output', text: 'Estudios: Grado Superior de Desarrollo de Aplicaciones Web (DAW) en España.' },
          { type: 'output', text: 'Enfoque: Diseñar, configurar, desplegar y mantener flujos de automatizaciones reales,' },
          { type: 'output', text: 'sistemas inteligentes de IA y desarrollo web premium.' },
          { type: 'output', text: 'Entorno favorito: Windows con WSL (Ubuntu) / PowerShell.' }
        ];
        break;
      case 'sadek.skills':
        response = [
          { type: 'output', text: '========================================' },
          { type: 'output', text: 'HABILIDADES TÉCNICAS (Stack Tecnológico)' },
          { type: 'output', text: '========================================' },
          { type: 'output', text: '🤖 Automatizaciones: n8n, Webhooks, APIs HTTP, Bots de Telegram, Flujos de datos.' },
          { type: 'output', text: '💻 Desarrollo Web: PHP, Astro, JavaScript, HTML, CSS, MySQL, PostgreSQL, Node.js.' },
          { type: 'output', text: '🧠 IA Aplicada: MCP (Model Context Protocol), AGENT.md, Arquitectura de Agentes IA,' },
          { type: 'output', text: '                Ingeniería de Prompts, Sistemas Multiagente.' },
          { type: 'output', text: '🔧 Sistemas y DevOps: Git/GitHub, Docker, Docker Compose, EasyPanel, VPS / Servidores Cloud.' }
        ];
        break;
      case 'sadek.projects':
        response = [
          { type: 'output', text: '========================================' },
          { type: 'output', text: 'PROYECTOS Y LÍNEAS DE DESARROLLO' },
          { type: 'output', text: '========================================' },
          { type: 'output', text: '1. Sistema de Scraping Automático  [Estado: Planificado / Idea]' },
          { type: 'output', text: '   - Enviar URL a bot de Telegram y recibir scraping estructurado en Drive/Notion.' },
          { type: 'output', text: '2. Bot Personal de Tareas          [Estado: Planificado / Idea]' },
          { type: 'output', text: '   - Integrado en Telegram para gestionar recordatorios y sincronizarse con Google Tasks.' },
          { type: 'output', text: '3. Plataforma Deportiva Ceuta     [Estado: Planificado / Idea]' },
          { type: 'output', text: '   - Portal web para gestionar reservas de campos deportivos, estadísticas, equipos y partidos.' },
          { type: 'output', text: '4. Portafolio Web Premium          [Estado: ¡Completado!]' },
          { type: 'output', text: '   - Diseñado con Astro + React (Islands) usando el Neo-brutalismo y optimización SEO.' }
        ];
        break;
      case 'sadek.goals':
        response = [
          { type: 'output', text: '>> OBJETIVOS PRINCIPALES:' },
          { type: 'output', text: '  - Llegar a crear automatizaciones profesionales y robustas desplegadas en servidores propios.' },
          { type: 'output', text: '  - Aprender a crear sistemas multiagente donde la IA colabore en el desarrollo y revisión de proyectos.' },
          { type: 'output', text: '  - Afianzar conocimientos de despliegue, seguridad y bases de datos relacionales.' }
        ];
        break;
      case 'sadek.contact':
        response = [
          { type: 'output', text: '>> CONTACTO DIRECTO:' },
          { type: 'output', text: '  - GitHub: https://github.com/SadekBJ' },
          { type: 'output', text: '  - Email: contacto@sadek.dev (Simulado)' },
          { type: 'output', text: '  - Telegram: @sadek_dev (Simulado)' },
          { type: 'output', text: '  - Ubicación: Ceuta / España' }
        ];
        break;
      default:
        response = [
          { type: 'output', text: `CommandNotFoundException: El comando "${cmd}" no se reconoce.` },
          { type: 'output', text: 'Escribe "help" para ver los comandos válidos.' }
        ];
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd },
      ...response
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputVal.trim() !== '') {
        executeCommand(inputVal);
        setInputVal('');
      }
    }
  };

  const handleQuickCommand = (cmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < cmd.length) {
        currentText += cmd[currentText.length];
        setInputVal(currentText);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          executeCommand(cmd);
          setInputVal('');
          setIsTyping(false);
        }, 150);
      }
    }, 40);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Botones de Comandos Rápidos */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {['sadek.info', 'sadek.skills', 'sadek.projects', 'sadek.goals', 'sadek.contact', 'help', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCommand(cmd)}
            disabled={isTyping}
            className="px-3 py-1.5 border border-zinc-950 dark:border-zinc-50 bg-white dark:bg-zinc-900 text-xs md:text-sm font-mono font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] disabled:opacity-50"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Ventana de Terminal */}
      <div 
        onClick={focusInput}
        className="w-full neo-border-thick bg-[#012456] dark:bg-[#0c0d1e] text-zinc-100 font-mono text-xs md:text-sm rounded-none shadow-[8px_8px_0px_0px_#18181b] dark:shadow-[8px_8px_0px_0px_#fafafa] overflow-hidden"
      >
        {/* Barra superior */}
        <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-2 flex items-center justify-between border-b-2 border-zinc-950 dark:border-zinc-50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-800 dark:text-blue-400" />
            <span className="font-bold text-xs select-none">Windows PowerShell: C:\Users\sadek\portfolio</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 bg-zinc-400 dark:bg-zinc-600 border border-zinc-500 rounded-none"></div>
            <div className="w-3 h-3 bg-zinc-400 dark:bg-zinc-600 border border-zinc-500 rounded-none"></div>
            <div className="w-3 h-3 bg-red-500 border border-red-600 rounded-none"></div>
          </div>
        </div>

        {/* Consola de Salida */}
        <div ref={consoleRef} className="p-4 h-[350px] md:h-[400px] overflow-y-auto flex flex-col gap-1.5 selection:bg-blue-600 selection:text-white">
          {history.map((item, idx) => {
            if (item.type === 'input') {
              return (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-[#00ffff] font-bold">PS C:\Users\sadek\portfolio&gt;</span>
                  <span className="text-white font-bold">{item.text}</span>
                </div>
              );
            } else {
              return (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {item.text}
                </div>
              );
            }
          })}
          
          {isTyping && (
            <div className="flex items-center gap-1">
              <span className="text-[#00ffff] font-bold">PS C:\Users\sadek\portfolio&gt;</span>
              <span className="text-white font-bold">{inputVal}</span>
              <span className="w-1.5 h-4 bg-white animate-pulse"></span>
            </div>
          )}

          {!isTyping && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[#00ffff] font-bold">PS C:\Users\sadek\portfolio&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent border-none outline-none text-white font-mono flex-1 caret-white focus:ring-0 focus:border-none p-0 m-0"
                aria-label="PowerShell Input"
                placeholder="Escribe un comando..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
