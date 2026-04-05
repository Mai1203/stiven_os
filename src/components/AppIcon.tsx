import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export default function AppIcon({ icon: Icon, label, onClick }: AppIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all group w-24"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-14 h-14 rounded-2xl glass-morphism flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        <Icon className="w-7 h-7 text-white/90 drop-shadow-sm group-hover:scale-110 transition-transform" />
      </div>
      <span className="text-[11px] text-white/90 font-medium text-center leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] drop-shadow-md">
        {label}
      </span>
    </motion.button>
  );
}
