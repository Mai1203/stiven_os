import { User, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function AboutWindow() {
  return (
    <div className="p-8 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00ff9f] mb-2">Stiven</h1>
        <p className="text-lg text-white/70">Senior Full Stack Developer</p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-[#00ff9f]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-white/80 leading-relaxed">
              Computer Engineer with deep expertise in backend systems and software architecture.
              Passionate about building scalable, high-performance applications that solve real-world problems.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
            <Code className="w-6 h-6 text-[#00ff9f]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Specialization</h3>
            <p className="text-white/80 leading-relaxed">
              Backend architecture, microservices, API design, and database optimization.
              Extensive experience in building enterprise-level sales and automation systems.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-6 h-6 text-[#00ff9f]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p className="text-white/80 leading-relaxed">
              5+ years developing complex systems including inventory management, sales automation,
              and distributed architectures. Strong focus on code quality and system reliability.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-[#00ff9f]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <p className="text-white/80 leading-relaxed">
              Bachelor's Degree in Computer Engineering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
