import { ExternalLink, Github, Layout, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsWindow() {
  const projects = [
    {
      title: 'Enterprise Sales Automation',
      description:
        'Comprehensive sales automation system handling customer management, inventory tracking, and analytics. Built with microservices architecture.',
      tech: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
      year: '2024',
      gradient: 'from-blue-500 to-indigo-600',
      icon: Layout,
    },
    {
      title: 'Inventory Management Pro',
      description:
        'Real-time inventory tracking system with barcode scanning and automated reordering. High-performance Python backend.',
      tech: ['Python', 'FastAPI', 'MongoDB', 'React'],
      year: '2023',
      gradient: 'from-fuchsia-500 to-purple-600',
      icon: Database,
    },
    {
      title: 'StivenOS Portfolio',
      description:
        'Interactive portfolio designed as a functional operating system within the browser. Demonstrates advanced frontend skills.',
      tech: ['React', 'TypeScript', 'Framer Motion', 'Zustand'],
      year: '2024',
      gradient: 'from-sky-400 to-blue-500',
      icon: Zap,
    },
  ];

  return (
    <div className="p-8 pb-24 text-white font-sans max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-outfit mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Featured Projects
        </h1>
        <div className="h-1 w-20 bg-sky-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-sky-500/10"
          >
            {/* Visual Header */}
            <div className={`h-32 bg-gradient-to-br ${project.gradient} p-6 relative flex items-end overflow-hidden`}>
              <div className="absolute top-4 right-4 text-white/20 transform group-hover:scale-110 transition-transform">
                <project.icon size={80} />
              </div>
              <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">
                {project.year}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold font-outfit text-white mb-3 group-hover:text-sky-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-white/70 uppercase tracking-tighter"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-semibold transition-all">
                  <Github size={14} />
                  Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-400 text-black rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  <ExternalLink size={14} />
                  Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
