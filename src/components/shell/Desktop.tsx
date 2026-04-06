import AppIcon from './AppIcon';
import { useWindowStore } from '../../store/windowStore';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { APPS } from '../../config/apps';
import { AppDefinition } from '../../types';

export default function Desktop() {
  const { openWindow } = useWindowStore();
  const isMobile = useIsMobile();

  const handleOpenApp = (app: AppDefinition) => {
    openWindow({
      title: app.title,
      component: app.component,
      position: isMobile 
        ? { x: 0, y: 0 } 
        : {
            x: Math.random() * 100 + 100,
            y: Math.random() * 50 + 50,
          },
      size: app.size,
      isMaximized: isMobile,
    });
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url(/wallpaper.png)' }}
      />
      
      {/* Overlay for glass effect contrast */}
      <div className="absolute inset-0 bg-black/10 backdrop-brightness-90" />

      {/* Desktop Icons Grid */}
      <div className="relative h-[calc(100vh-48px)] p-2 md:p-4 flex flex-col flex-wrap content-start gap-2 md:gap-4 items-start select-none">
        {APPS.map((app) => (
          <AppIcon
            key={app.label}
            icon={app.icon}
            label={app.label}
            onClick={() => handleOpenApp(app)}
          />
        ))}
      </div>
    </div>
  );
}
