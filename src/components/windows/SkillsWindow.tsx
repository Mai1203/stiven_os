import { Server, LayoutGrid as Layout, Wrench, Database } from 'lucide-react';

export default function SkillsWindow() {
  const skillCategories = [
    {
      icon: Server,
      title: 'Backend',
      color: '#00ff9f',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Python', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'REST APIs', level: 95 },
        { name: 'GraphQL', level: 85 },
        { name: 'Microservices', level: 90 },
      ],
    },
    {
      icon: Database,
      title: 'Database',
      color: '#00ccff',
      skills: [
        { name: 'PostgreSQL', level: 95 },
        { name: 'MongoDB', level: 90 },
        { name: 'Redis', level: 85 },
        { name: 'MySQL', level: 90 },
      ],
    },
    {
      icon: Layout,
      title: 'Frontend',
      color: '#ff00ff',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 95 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      icon: Wrench,
      title: 'DevOps',
      color: '#ffaa00',
      skills: [
        { name: 'Docker', level: 90 },
        { name: 'Kubernetes', level: 80 },
        { name: 'CI/CD', level: 85 },
        { name: 'AWS', level: 85 },
        { name: 'GCP', level: 80 },
      ],
    },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold text-[#00ff9f] mb-6">Technical Skills</h1>

      <div className="grid grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" style={{ color: category.color }} />
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
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
