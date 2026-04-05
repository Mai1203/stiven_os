import { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Search } from 'lucide-react';
import { useWindowStore } from '../store/windowStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const { windows, focusWindow, focusedWindowId } = useWindowStore();
  const [isStartOpen, setIsStartOpen] = useState(false);

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
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 z-[9999] select-none">
      {/* Taskbar Background (Glass) */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl border-t border-white/10" />

      {/* Left side (Empty for Win 11 style) */}
      <div className="w-48 hidden md:block" />

      {/* Centered Icons */}
      <div className="flex-1 flex justify-center items-center gap-1 relative z-10">
        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsStartOpen(!isStartOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors group"
        >
          <div className="grid grid-cols-2 gap-0.5 p-1 w-6 h-6">
            <div className="bg-sky-400 rounded-sm group-hover:bg-sky-300" />
            <div className="bg-sky-400 rounded-sm group-hover:bg-sky-300" />
            <div className="bg-sky-400 rounded-sm group-hover:bg-sky-300" />
            <div className="bg-sky-400 rounded-sm group-hover:bg-sky-300" />
          </div>
        </motion.button>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        >
          <Search className="w-5 h-5 text-white/80" />
        </motion.button>

        {/* Running apps icons */}
        <div className="flex items-center gap-1 mx-2">
          {windows.map((window) => (
            <motion.button
              key={window.id}
              onClick={() => focusWindow(window.id)}
              className="relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`w-6 h-6 rounded-sm bg-gradient-to-br from-indigo-500/50 to-purple-500/50 flex items-center justify-center border border-white/20`}>
                <span className="text-[10px] font-bold text-white uppercase">{window.title[0]}</span>
              </div>
              
              {/* Active/Minimized Indicators */}
              <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 ${
                focusedWindowId === window.id ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/40 group-hover:w-3'
              }`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* System Tray (Right Side) */}
      <div className="relative z-10 w-48 flex justify-end items-center gap-1">
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default">
          <Wifi className="w-3.5 h-3.5 text-white/80" />
          <Volume2 className="w-3.5 h-3.5 text-white/80" />
          <Battery className="w-3.5 h-3.5 text-white/80" />
        </div>
        
        <div className="flex flex-col items-end px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default">
          <span className="text-[11px] font-medium text-white/90">{formatTime(time)}</span>
          <span className="text-[11px] text-white/60">{formatDate(time)}</span>
        </div>
      </div>

      {/* Start Menu Placeholder (Will implement as separate component) */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[520px] h-[600px] glass-card rounded-xl p-6 z-[10000] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold font-outfit">Pinned Apps</h2>
              <button className="text-xs px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors">All apps &gt;</button>
            </div>
            
            <div className="grid grid-cols-6 gap-y-8 gap-x-2">
              {/* Placeholder Icons in Start Menu */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-sky-400 to-indigo-500 opacity-80" />
                  </div>
                  <span className="text-[11px] text-white/80">App {i}</span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20" />
                <span className="text-xs font-medium uppercase tracking-wider">Stiven Dev</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <div className="w-4 h-4 border-2 border-white/40 rounded-full relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white/80" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
