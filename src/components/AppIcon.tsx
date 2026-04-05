import { motion } from 'framer-motion';
import { Video as LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export default function AppIcon({ icon: Icon, label, onClick }: AppIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/5 transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00ff9f]/20 to-[#00ff9f]/5 border border-[#00ff9f]/30 flex items-center justify-center group-hover:border-[#00ff9f]/60 transition-colors">
        <Icon className="w-8 h-8 text-[#00ff9f]" />
      </div>
      <span className="text-sm text-white/90 font-medium">{label}</span>
    </motion.button>
  );
}
