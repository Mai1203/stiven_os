import { ExternalLink, Github, Layout, Store, Database, Gamepad2, Utensils, Dumbbell, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
  gradient: string;
  icon: LucideIcon;
  github: string;
  demo: string | null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden hover:bg-white/[0.06] transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(14,165,233,0.1)] hover:-translate-y-1"
    >
      {/* Visual Header */}
      <div className={`h-40 bg-gradient-to-br ${project.gradient} p-8 relative flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 text-white drop-shadow-2xl"
        >
          <project.icon size={80} strokeWidth={1.5} />
        </motion.div>
        <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 text-white/90 shadow-xl">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-outfit text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-blue-400 transition-all duration-300">
          {project.title}
        </h3>

        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 flex-grow font-light">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-200 uppercase tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] hover:border-white/[0.2] rounded-xl text-sm font-semibold text-white/90 transition-all duration-300"
                >
                  <Github size={16} />
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsWindow() {
  const projects: Project[] = [
    {
      title: 'E-commerce Lady Nails',
      description:
        'E-commerce para venta de productos de manicura y pedicura: interfaz moderna con categorías, carrusel de productos, detalles de artículos y carrito de compras funcional. Integrado con IA para recomendaciones de productos en livechat y asistente virtual.',
      tech: ['Medusa', 'PostgreSQL', 'JWT', 'TailwindCSS', 'Next.js'],
      year: '2026',
      gradient: 'from-sky-400 to-blue-500',
      icon: Store,
      github: '',
      demo: 'https://ladynails.vercel.app/',
    },
    {
      title: 'Tupla Core Web',
      description:
        'Portafolio web moderno construido con Next.js y TailwindCSS que presenta equipos y perfiles profesionales mediante una experiencia visual pulida. Incluye componentes reutilizables, animaciones de scroll (AOS), secciones responsivas para proyectos y testimonios, optimización para rendimiento y SEO, y un diseño pensado para convertir visitas en contactos.',
      tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'AOS'],
      year: '2026',
      gradient: 'from-purple-500 to-pink-600',
      icon: Layout,
      github: '',
      demo: 'https://tuplacore.vercel.app',
    },
    {
      title: 'FastFood App',
      description:
        'Aplicación frontend moderna creada con Svelte que simula una experiencia de pedido rápido para restaurantes: interfaz responsiva, hero animado con GSAP, y arquitectura de proyecto preparada para monorepo con pnpm. Incluye configuración de Vite, TailwindCSS y scripts de build listos para desplegar en Vercel; ideal como plantilla para prototipos de e‑commerce de comida rápida o MVPs de delivery.',
      tech: ['Svelte', 'Vite', 'TailwindCSS', 'GSAP'],
      year: '2026',
      gradient: 'from-orange-400 to-red-500',
      icon: Utensils,
      github: 'https://github.com/Mai1203/fastfood-app',
      demo: 'https://fastfood-app-sigma.vercel.app',
    },
    {
      title: 'Project Gimnasio App',
      description:
        'Plataforma de gestión para gimnasios y centros deportivos: panel administrativo y experiencia para usuarios que permite gestionar membresías, reservas de clases, rutinas personalizadas y seguimiento de progreso. Diseñada como base escalable para integrar pagos, notificaciones y analítica de uso; ideal para lanzar un MVP de gestión deportiva o una app de entrenamiento comunitario.',
      tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
      year: '2025',
      gradient: 'from-green-400 to-emerald-600',
      icon: Dumbbell,
      github: 'https://github.com/Mai1203/project-gimnasio-app',
      demo: 'https://powergym-gamma.vercel.app/',
    },
    {
      title: 'Gamification App',
      description:
        'Plataforma interactiva para gamificar tareas y procesos de aprendizaje: sistema de XP, logros y recompensas que motiva la continuidad. Arquitectura basada en componentes reutilizables con TypeScript y Vite, UI construida con TailwindCSS, y flujos pensados para maximizar retención mediante microfeedback, progresión visual y métricas de rendimiento.',
      tech: ['TypeScript', 'Vite', 'TailwindCSS', 'HTML'],
      year: '2025',
      gradient: 'from-rose-500 to-violet-600',
      icon: Gamepad2,
      github: 'https://github.com/Mai1203/gamification-app',
      demo: 'https://edocode.vercel.app',
    },
    {
      title: 'Aqueducto Manager',
      description:
        'Panel administrativo inicial para la gestión de sistemas de acueducto: dashboard con KPIs, CRUD para entidades clave, y plantilla escalable lista para integrar sensores o APIs. Construido con Next.js y TypeScript, con estilos en TailwindCSS; ideal como base para añadir monitoreo en tiempo real, alertas y control de usuarios.',
      tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostCSS'],
      year: '2024',
      gradient: 'from-cyan-500 to-blue-600',
      icon: Database,
      github: 'https://github.com/Mai1203/aqueducto-mananger',
      demo: null,
    },
  ];

  return (
    <div className="p-6 md:p-10 pb-20 md:pb-32 text-white font-sans max-w-7xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-4 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent tracking-tight">
          Featured Projects
        </h1>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
          Explora mis proyectos recientes, desde aplicaciones web modernas hasta plataformas completas. Cada uno representa un desafío único y una solución innovadora.
        </p>
        <div className="h-1.5 w-24 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
