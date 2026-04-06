import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import Window from './Window';

// Lazy load app components
const AboutWindow = lazy(() => import('../../apps/AboutWindow'));
const SkillsWindow = lazy(() => import('../../apps/SkillsWindow'));
const ProjectsWindow = lazy(() => import('../../apps/ProjectsWindow'));
const ContactWindow = lazy(() => import('../../apps/ContactWindow'));
const TerminalWindow = lazy(() => import('../../apps/TerminalWindow'));
const SnakeGame = lazy(() => import('../../apps/SnakeGame'));

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  about: AboutWindow,
  skills: SkillsWindow,
  projects: ProjectsWindow,
  contact: ContactWindow,
  terminal: TerminalWindow,
  snake: SnakeGame,
};

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <AnimatePresence>
      {windows.map((window) => {
        const Component = APP_COMPONENTS[window.component];
        
        return (
          <Window key={window.id} window={window}>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
              </div>
            }>
              {Component ? <Component /> : <div className="p-4 text-white">Application Not Found</div>}
            </Suspense>
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
