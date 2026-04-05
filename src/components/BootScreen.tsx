import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '../store/systemStore';

export default function BootScreen() {
  const [phase, setPhase] = useState<'logo' | 'loading' | 'ready'>('logo');
  const { setBooted } = useSystemStore();

  useEffect(() => {
    // Phase 1: Logo animation
    const logoTimeout = setTimeout(() => setPhase('loading'), 2000);

    // Phase 2: Loading simulation
    const timeout = setTimeout(() => {
      setPhase('ready');
    }, 5000);

    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(timeout);
    };
  }, []);

  // Auto-boot when ready
  useEffect(() => {
    if (phase === 'ready') {
      const bootTimeout = setTimeout(() => {
        setBooted(true);
      }, 1000);
      return () => clearTimeout(bootTimeout);
    }
  }, [phase, setBooted]);

  return (
    <div className="fixed inset-0 bg-[#000] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'logo' || phase === 'loading' ? (
          <motion.div
            key="boot-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center"
          >
            {/* Windows-style Logo Animation */}
            <div className="relative mb-12">
              <motion.div
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="grid grid-cols-2 gap-1.5 w-24 h-24"
              >
                <div className="bg-sky-500 rounded-sm shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
                <div className="bg-sky-500 rounded-sm shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
                <div className="bg-sky-500 rounded-sm shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
                <div className="bg-sky-500 rounded-sm shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
              </motion.div>
              
              {/* Glowing aura */}
              <div className="absolute inset-0 bg-sky-500/20 blur-3xl -z-10 rounded-full" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold font-outfit tracking-widest text-white mb-16"
            >
              STIVEN<span className="text-sky-500">OS</span>
            </motion.h1>

            {phase === 'loading' && (
              <div className="flex flex-col items-center gap-4">
                {/* Windows 11 style loading spinner */}
                <div className="relative w-12 h-12">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-start justify-center"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-white/40 text-xs tracking-widest uppercase font-medium mt-4">
                  Loading Experience
                </span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 text-sm font-medium tracking-widest uppercase"
          >
            Starting System...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
