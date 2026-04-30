import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';
import { Window as WindowType } from '../../types';
import { useIsMobile } from '../../hooks/useMediaQuery';

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
  const isMobile = useIsMobile();

  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || (e.target as HTMLElement).closest('.window-controls')) return;

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
      if (isMobile || !isDraggingRef.current || window.isMaximized) return;

      const newX = e.clientX - offsetRef.current.x;
      const newY = Math.max(0, e.clientY - offsetRef.current.y);

      updateWindowPosition(window.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    if (isDraggingRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [window.id, window.isMaximized, updateWindowPosition, isMobile]);

  if (window.isMinimized) return null;

  const windowStyle = (window.isMaximized || isMobile)
    ? { x: 0, y: 0, width: '100vw', height: 'calc(100vh - 48px)', borderRadius: 0 }
    : {
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
        borderRadius: '12px',
      };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        ...windowStyle 
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute glass-card overflow-hidden flex flex-col window-shadow"
      style={{ zIndex: window.zIndex }}
      onClick={() => focusWindow(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`${isMobile ? 'h-12' : 'h-10'} flex items-center justify-between px-4 cursor-default select-none border-b border-white/10 bg-white/5 transition-all`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 w-24">
          {/* Optional Icon could go here */}
        </div>

        {!isMobile && (
          <span className="text-sm font-medium text-white/90 truncate max-w-[200px]">
            {window.title}
          </span>
        )}
        {isMobile && (
          <span className="text-xs font-semibold text-white/70 uppercase tracking-widest truncate max-w-[150px]">
            {window.title}
          </span>
        )}

        <div className="window-controls flex items-center h-full">
          {!isMobile && window.isMinimizable !== false && (
            <button
              onClick={() => minimizeWindow(window.id)}
              className="w-12 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
              title="Minimize"
            >
              <Minus className="w-4 h-4 text-white/80" />
            </button>
          )}
          {!isMobile && window.isMaximizable !== false && (
            <button
              onClick={() => maximizeWindow(window.id)}
              className="w-12 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
              title={window.isMaximized ? "Restore" : "Maximize"}
            >
              {window.isMaximized ? (
                <Copy className="w-3.5 h-3.5 text-white/80" />
              ) : (
                <Square className="w-3.5 h-3.5 text-white/80" />
              )}
            </button>
          )}
          <button
            onClick={() => closeWindow(window.id)}
            className={`${isMobile ? 'w-10 h-10' : 'w-12 h-10'} flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group`}
            title="Close"
          >
            <X className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} text-white/80 group-hover:text-white`} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-black/20 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );
}
