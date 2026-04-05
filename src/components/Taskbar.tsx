import { useState, useEffect } from 'react';
import { Monitor, Cpu, HardDrive } from 'lucide-react';
import { useWindowStore } from '../store/windowStore';
import { motion } from 'framer-motion';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const { windows, focusWindow } = useWindowStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0a0a0a] border-t border-[#00ff9f]/30 flex items-center px-4 gap-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-[#00ff9f]/10 rounded-lg border border-[#00ff9f]/30">
        <Monitor className="w-4 h-4 text-[#00ff9f]" />
        <span className="text-xs text-[#00ff9f] font-medium">STIVENOS</span>
      </div>

      <div className="flex-1 flex items-center gap-2">
        {windows.map((window) => (
          <motion.button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              window.isMinimized
                ? 'bg-white/5 text-white/50'
                : 'bg-[#00ff9f]/10 text-[#00ff9f] border border-[#00ff9f]/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {window.title}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-xs text-[#00ff9f]/70">
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>2%</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            <span>45%</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-[#00ff9f] font-medium">{formatTime(time)}</div>
          <div className="text-xs text-[#00ff9f]/70">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  );
}
