import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '../store/windowStore';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

export default function Window({ window, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;

    focusWindow(window.id);
    isDraggingRef.current = true;

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || window.isMaximized) return;

      const newX = e.clientX - offsetRef.current.x;
      const newY = Math.max(0, e.clientY - offsetRef.current.y);

      updateWindowPosition(window.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window.id, window.isMaximized, updateWindowPosition]);

  if (window.isMinimized) return null;

  const windowStyle = window.isMaximized
    ? { x: 0, y: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : {
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, ...windowStyle }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute bg-[#1a1a1a] border border-[#00ff9f]/30 rounded-lg shadow-2xl overflow-hidden"
      style={{ zIndex: window.zIndex }}
      onClick={() => focusWindow(window.id)}
    >
      <div
        className="h-10 bg-[#0a0a0a] border-b border-[#00ff9f]/30 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm text-[#00ff9f] font-medium">{window.title}</span>

        <div className="window-controls flex items-center gap-2">
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus className="w-4 h-4 text-[#00ff9f]" />
          </button>
          <button
            onClick={() => maximizeWindow(window.id)}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Square className="w-4 h-4 text-[#00ff9f]" />
          </button>
          <button
            onClick={() => closeWindow(window.id)}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-500/20 transition-colors"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
    </motion.div>
  );
}
