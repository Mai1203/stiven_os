import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useSystemStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For portfolio purposes, any login works
    setLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background with heavy blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110 blur-2xl"
        style={{ backgroundImage: 'url(/wallpaper.png)' }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center w-full max-w-md p-8"
      >
        <div className="mb-8 relative">
          <div className="w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <User className="w-24 h-24 text-white/50" />
            </div>
          </div>
          {/* Online status indicator */}
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-sky-500 border-4 border-[#1a1a1a] rounded-full shadow-lg" />
        </div>

        <h1 className="text-4xl font-bold font-outfit text-white mb-2 uppercase tracking-widest">
          Stiven Dev
        </h1>
        <p className="text-white/60 text-sm mb-12 font-medium">Software Engineer</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              autoFocus
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-white/30"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 hover:bg-sky-400 text-white rounded-md flex items-center justify-center transition-colors shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="button"
              className="text-white/40 text-xs hover:text-white transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </form>

        <div className="mt-auto pt-24 flex items-center gap-8 opacity-60">
          <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper icons (reusing logic or icons)
import { Wifi, Volume2 } from 'lucide-react';
