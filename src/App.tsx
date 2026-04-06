import { useSystemStore } from './store/systemStore';
import BootScreen from './components/system/BootScreen';
import LoginScreen from './components/system/LoginScreen';
import Desktop from './components/shell/Desktop';
import Taskbar from './components/shell/Taskbar';
import WindowManager from './components/shell/WindowManager';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { isBooted, isLoggedIn } = useSystemStore();

  return (
    <div className="fixed inset-0 overflow-hidden font-sans select-none bg-black">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : !isLoggedIn ? (
          <LoginScreen key="login" />
        ) : (
          <div key="desktop" className="relative w-full h-full animate-in fade-in duration-1000">
            <Desktop />
            <WindowManager />
            <Taskbar />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
