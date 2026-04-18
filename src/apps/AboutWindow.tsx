import { User, Briefcase, GraduationCap, Code, Award, Target, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export default function AboutWindow() {
  const stats = [
    { label: 'Experience', value: '1+ Years', icon: Briefcase, color: 'text-sky-400' },
    { label: 'Projects', value: '4+ Done', icon: Target, color: 'text-[#00ff9f]' },
    { label: 'Tech Stack', value: '10+ Tools', icon: Code, color: 'text-fuchsia-400' },
  ];

  const infoBlocks = [
    {
      icon: User,
      title: 'About Me',
      description: 'Computer Engineer with deep expertise in backend systems and software architecture. Passionate about building scalable, high-performance applications that solve real-world problems.',
      color: 'bg-sky-500/10',
      iconColor: 'text-sky-400',
    },
    // {
    //   icon: Code,
    //   title: 'Specialization',
    //   description: 'Backend architecture, microservices, API design, and database optimization. Extensive experience in building enterprise-level sales and automation systems.',
    //   color: 'bg-[#00ff9f]/10',
    //   iconColor: 'text-[#00ff9f]',
    // },
    // {
    //   icon: Award,
    //   title: 'Experience',
    //   description: '5+ years developing complex systems including inventory management, sales automation, and distributed architectures. Strong focus on code quality and system reliability.',
    //   color: 'bg-fuchsia-500/10',
    //   iconColor: 'text-fuchsia-400',
    // },
    {
      icon: GraduationCap,
      title: 'Education',
      description: "Computer engineer, graduated from AUNAR (Corporación Universitaria Autónoma de Nariño). Continuous learning, always exploring the latest trends in software development and cloud technologies.",
      color: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleContactClick = () => {
    // This is a placeholder, normally you would open the contact window
    // In a real scenario, we could use the windowStore to open it
    console.log('Contact Me clicked');
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-8 text-white max-w-4xl mx-auto space-y-8 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 border-b border-white/5 pb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-[#00ff9f] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 overflow-hidden relative z-10 shadow-2xl">
            <img 
              src="/profile.jpeg" 
              alt="Profile" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center border-4 border-[#1a1a1a] z-20">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          </div>
        </motion.div>

        <div className="text-center md:text-left space-y-2">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            Stiven Dev
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-sky-400 font-medium font-outfit uppercase tracking-[0.2em]"
          >
            Full Stack Developer
          </motion.p>
          <motion.div variants={itemVariants} className="pt-2">
            <GlassButton variant="primary" size="sm" onClick={handleContactClick}>
              <Coffee className="w-4 h-4" />
              Let's Talk
            </GlassButton>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <GlassCard 
            key={i} 
            variants={itemVariants}
            intensity="low" 
            className="p-4 flex flex-col items-center justify-center text-center group hover:bg-white/[0.08]"
          >
            <stat.icon className={`w-6 h-6 mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
            <span className="text-xl font-bold font-outfit">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</span>
          </GlassCard>
        ))}
      </div>

      {/* Information Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoBlocks.map((block, i) => (
          <GlassCard 
            key={i} 
            variants={itemVariants}
            intensity="low"
            className="p-5 flex flex-col gap-4 group hover:bg-white/[0.08] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${block.color} flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                <block.icon className={`w-5 h-5 ${block.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold">{block.title}</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed min-h-[60px]">
              {block.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
}
