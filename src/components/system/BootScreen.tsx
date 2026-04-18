import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '../../store/systemStore';

const HEX_POINTS = "46,4 88,27 88,73 46,96 4,73 4,27";

function StivenosLogo() {
  return (
    <div className="relative">
      <svg
        width="138"
        height="150"
        viewBox="0 0 92 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexágono relleno */}
        <motion.polygon
          points={HEX_POINTS}
          fill="#2D2B6E"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Hexágono outline que se dibuja */}
        <motion.polygon
          points={HEX_POINTS}
          fill="none"
          stroke="#6C5CE7"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
        />

        {/* Onda cian principal */}
        <motion.path
          d="M24,50 Q35,34 46,50 Q57,66 68,50"
          fill="none"
          stroke="#00CEC9"
          strokeWidth="2.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
        />

        {/* Onda cian secundaria */}
        <motion.path
          d="M14,55 Q30,32 46,55 Q62,78 78,55"
          fill="none"
          stroke="#00CEC9"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        />

        {/* Punto central */}
        <motion.circle
          cx="46"
          cy="50"
          r="4"
          fill="#F7F7FC"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.6, ease: 'backOut' }}
        />
      </svg>

      {/* Aura de fondo */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(108,92,231,0.25) 0%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.4, 1.2] }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

export default function BootScreen() {
  const [phase, setPhase] = useState<'logo' | 'loading' | 'ready'>('logo');
  const { setBooted } = useSystemStore();

  useEffect(() => {
    const logoTimeout = setTimeout(() => setPhase('loading'), 2000);
    const timeout = setTimeout(() => setPhase('ready'), 5000);
    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (phase === 'ready') {
      const bootTimeout = setTimeout(() => setBooted(true), 1000);
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
            className="flex flex-col items-center gap-12"
          >
            {/* Logo Stivenos — Concepto A */}
            <StivenosLogo />

            {/* Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl font-bold tracking-widest text-white mt-2"
            >
              STIVEN<span style={{ 
                color: '#6C5CE7',
                textShadow: '0 0 20px rgba(108, 92, 231, 0.3)'
              }}>OS</span>
            </motion.h1>

            {/* Spinner de carga */}
            {phase === 'loading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative w-14 h-14">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-start justify-center"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }}
                    >
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-white/40 text-sm tracking-[0.3em] uppercase font-medium">
                  Loading Experience
                </span>
              </motion.div>
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