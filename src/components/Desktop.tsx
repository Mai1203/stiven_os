import { User, Code2, FolderGit2, Mail, Terminal as TerminalIcon } from 'lucide-react';
import AppIcon from './AppIcon';
import { useWindowStore } from '../store/windowStore';

export default function Desktop() {
  const { openWindow } = useWindowStore();

  const apps = [
    {
      icon: User,
      label: 'About.me',
      component: 'about',
      title: 'About Me',
      size: { width: 600, height: 500 },
    },
    {
      icon: Code2,
      label: 'Skills.exe',
      component: 'skills',
      title: 'Skills',
      size: { width: 700, height: 600 },
    },
    {
      icon: FolderGit2,
      label: 'Projects.app',
      component: 'projects',
      title: 'Projects',
      size: { width: 800, height: 600 },
    },
    {
      icon: Mail,
      label: 'Contact.sh',
      component: 'contact',
      title: 'Contact',
      size: { width: 500, height: 400 },
    },
    {
      icon: TerminalIcon,
      label: 'Terminal',
      component: 'terminal',
      title: 'Terminal',
      size: { width: 800, height: 500 },
    },
  ];

  const handleOpenApp = (app: typeof apps[0]) => {
    openWindow({
      title: app.title,
      component: app.component,
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 50,
      },
      size: app.size,
    });
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #00ff9f 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative grid grid-cols-5 gap-4 p-8">
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
