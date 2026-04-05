import { User, Code2, FolderGit2, Mail, Terminal as TerminalIcon, Gamepad2 } from 'lucide-react';
import AppIcon from './AppIcon';
import { useWindowStore } from '../store/windowStore';

export default function Desktop() {
  const { openWindow } = useWindowStore();

  const apps = [
    {
      icon: User,
      label: 'About Me',
      component: 'about',
      title: 'About Me',
      size: { width: 800, height: 600 },
    },
    {
      icon: Code2,
      label: 'Skills',
      component: 'skills',
      title: 'Skills',
      size: { width: 700, height: 600 },
    },
    {
      icon: FolderGit2,
      label: 'Projects',
      component: 'projects',
      title: 'Projects',
      size: { width: 900, height: 650 },
    },
    {
      icon: Mail,
      label: 'Contact',
      component: 'contact',
      title: 'Contact',
      size: { width: 500, height: 550 },
    },
    {
      icon: TerminalIcon,
      label: 'Terminal',
      component: 'terminal',
      title: 'Terminal',
      size: { width: 800, height: 500 },
    },
    {
      icon: Gamepad2,
      label: 'Snake.io',
      component: 'snake',
      title: 'Snake Game',
      size: { width: 450, height: 600 },
    },
  ];

  const handleOpenApp = (app: typeof apps[0]) => {
    openWindow({
      title: app.title,
      component: app.component,
      position: {
        x: Math.random() * 100 + 100,
        y: Math.random() * 50 + 50,
      },
      size: app.size,
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
      <div className="relative h-[calc(100vh-48px)] p-4 flex flex-col flex-wrap content-start gap-4 items-start select-none">
        {apps.map((app) => (
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
