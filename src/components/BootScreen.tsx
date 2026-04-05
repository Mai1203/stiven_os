import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/systemStore';

const bootMessages = [
  'Initializing StivenOS...',
  'Loading kernel modules...',
  'Mounting file systems...',
  'Starting system services...',
  'Initializing network interfaces...',
  'Loading user environment...',
  'Starting window manager...',
  'Loading desktop environment...',
  'System ready.',
  '',
  'Welcome to StivenOS v1.0',
  'Press any key to continue...',
];

export default function BootScreen() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { setBooted, setBootProgress } = useSystemStore();

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
        setProgress(((currentMessageIndex + 1) / bootMessages.length) * 100);
        setBootProgress(((currentMessageIndex + 1) / bootMessages.length) * 100);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [currentMessageIndex, setBootProgress]);

  useEffect(() => {
    const handleKeyPress = () => {
      if (currentMessageIndex >= bootMessages.length) {
        setBooted(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMessageIndex, setBooted]);

  useEffect(() => {
    if (currentMessageIndex >= bootMessages.length) {
      const autoBootTimeout = setTimeout(() => {
        setBooted(true);
      }, 2000);

      return () => clearTimeout(autoBootTimeout);
    }
  }, [currentMessageIndex, setBooted]);

  return (
    <div className="fixed inset-0 bg-black text-[#00ff9f] font-mono flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-4xl font-bold mb-2 text-center">STIVENOS</div>
          <div className="text-sm text-center opacity-70">Boot Sequence v1.0</div>
        </motion.div>

        <div className="space-y-1 mb-8 h-64 overflow-hidden">
          {displayedMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                message.includes('Welcome') || message.includes('Press any key')
                  ? 'text-[#00ff9f] font-bold'
                  : 'text-[#00ff9f] opacity-80'
              }`}
            >
              {message && `[${new Date().toLocaleTimeString()}] ${message}`}
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs opacity-70">
            <span>Loading system...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00ff9f]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {currentMessageIndex >= bootMessages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-center mt-8 text-sm"
          >
            Press any key to continue...
          </motion.div>
        )}
      </div>
    </div>
  );
}
