import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../store/windowStore';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import SkillsWindow from './windows/SkillsWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import SnakeGame from './windows/SnakeGame';

export default function WindowManager() {
  const { windows } = useWindowStore();

  const getWindowComponent = (component: string) => {
    switch (component) {
      case 'about':
        return <AboutWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'snake':
        return <SnakeGame />;
      default:
        return <div className="p-4 text-white">Unknown application</div>;
    }
  };

  return (
    <AnimatePresence>
      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {getWindowComponent(window.component)}
        </Window>
      ))}
    </AnimatePresence>
  );
}
