import { ExternalLink, Github, Calendar } from 'lucide-react';

export default function ProjectsWindow() {
  const projects = [
    {
      title: 'Enterprise Sales Automation',
      description:
        'Comprehensive sales automation system handling customer management, inventory tracking, and analytics. Built with microservices architecture for high scalability.',
      tech: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      year: '2024',
      highlights: ['10,000+ daily transactions', '99.9% uptime', 'Real-time analytics'],
    },
    {
      title: 'Inventory Management System',
      description:
        'Real-time inventory tracking system with barcode scanning, automated reordering, and multi-warehouse support.',
      tech: ['Python', 'FastAPI', 'MongoDB', 'React', 'WebSockets'],
      year: '2023',
      highlights: ['Multi-warehouse support', 'Barcode integration', 'Predictive analytics'],
    },
    {
      title: 'StivenOS Portfolio',
      description:
        'Interactive portfolio designed as a functional operating system within the browser. Demonstrates advanced frontend skills and creative thinking.',
      tech: ['React', 'TypeScript', 'Framer Motion', 'Zustand', 'Tailwind'],
      year: '2024',
      highlights: ['Window management', 'Terminal emulator', 'Drag & drop'],
    },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold text-[#00ff9f] mb-6">Featured Projects</h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white/5 border border-[#00ff9f]/20 rounded-lg p-6 hover:border-[#00ff9f]/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-[#00ff9f]">{project.title}</h3>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Calendar className="w-3 h-3" />
                <span>{project.year}</span>
              </div>
            </div>

            <p className="text-white/80 mb-4 leading-relaxed">{project.description}</p>

            <div className="mb-4">
              <div className="text-sm text-white/60 mb-2">Key Highlights:</div>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 bg-[#00ff9f]/10 text-[#00ff9f] text-xs rounded"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-white/60 mb-2">Technologies:</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-1 px-3 py-1 bg-[#00ff9f]/10 hover:bg-[#00ff9f]/20 text-[#00ff9f] text-sm rounded transition-colors">
                <Github className="w-4 h-4" />
                View Code
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 text-white text-sm rounded transition-colors">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
