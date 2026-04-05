import { useSystemStore } from './store/systemStore';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';

function App() {
  const { isBooted } = useSystemStore();

  if (!isBooted) {
    return <BootScreen />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden font-mono">
      <Desktop />
      <WindowManager />
      <Taskbar />
    </div>
  );
}

export default App;
