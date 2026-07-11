import { Server, LayoutGrid as Layout, Wrench, Database } from 'lucide-react';

export default function SkillsWindow() {
  const skillCategories = [
    {
      icon: Server,
      title: 'Backend',
      color: '#00ff9f',
      skills: [
        { name: 'Node.js', level: 100 },
        { name: 'Python', level: 100 },
        { name: 'Java', level: 70 },
        { name: 'REST APIs', level: 100 },
        { name: 'GraphQL', level: 50 },
        { name: 'Microservices', level: 90 },
      ],
    },
    {
      icon: Database,
      title: 'Database',
      color: '#00ccff',
      skills: [
        { name: 'PostgreSQL', level: 100 },
        { name: 'Redis', level: 60 },
        { name: 'MySQL', level: 100 },
        { name: 'Firebase', level: 90 },
        { name: 'Supabase', level: 100 },
        { name: 'SQLite', level: 100 },
      ],
    },
    {
      icon: Layout,
      title: 'Frontend',
      color: '#ff00ff',
      skills: [
        { name: 'React', level: 100 },
        { name: 'TypeScript', level: 100 },
        { name: 'Next.js', level: 100 },
        { name: 'Tailwind CSS', level: 100 },
      ],
    },
    {
      icon: Wrench,
      title: 'DevOps',
      color: '#ffaa00',
      skills: [
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 60 },
        { name: 'CI/CD', level: 70 },
        { name: 'GCP', level: 50 },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8 text-white">
      <h1 className="text-xl md:text-2xl font-bold text-[#00ff9f] mb-4 md:mb-6">Technical Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-8">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Icon className="w-5 h-5" style={{ color: category.color }} />
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-3 pb-2">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-[13px] md:text-sm mb-1">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: category.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
