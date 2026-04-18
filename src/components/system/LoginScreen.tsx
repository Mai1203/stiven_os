import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Wifi, Volume2 } from 'lucide-react';
import { useSystemStore } from '../../store/systemStore';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useSystemStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  const HEX_PATH = "M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#1A1A2E]">
      {/* Background with heavy blur and pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110 blur-3xl opacity-40"
        style={{ backgroundImage: 'url(/wallpaper.png)' }}
      />
      
      {/* Dynamic background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6C5CE7]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00CEC9]/5 rounded-full blur-[120px]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-md p-8"
      >
        <div className="mb-8 relative group">
          {/* Hexagon Outer Glow */}
          <div className="absolute inset-0 bg-[#6C5CE7]/30 blur-2xl group-hover:bg-[#00CEC9]/20 transition-colors duration-500" />
          
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D2B6E" />
                  <stop offset="100%" stopColor="#6C5CE7" />
                </linearGradient>
              </defs>
              <path
                d={HEX_PATH}
                fill="url(#avatarGradient)"
                stroke="#6C5CE7"
                strokeWidth="2"
                className="transition-colors duration-500"
              />
              <foreignObject x="25" y="25" width="50" height="50">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-20 h-20 text-[#F7F7FC]/40" />
                </div>
              </foreignObject>
            </svg>
          </div>
          
          {/* Online status indicator - Hexagonal */}
          <div className="absolute bottom-4 right-4 w-7 h-7">
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <path
                  d={HEX_PATH}
                  fill="#00CEC9"
                  stroke="#1A1A2E"
                  strokeWidth="15"
                />
             </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#F7F7FC] mb-2 uppercase tracking-[0.2em] font-outfit">
          Stiven Dev
        </h1>
        <p className="text-[#6C5CE7] text-sm mb-12 font-semibold tracking-widest uppercase">
          Software Engineer
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              autoFocus
              className="w-full bg-[#2D2B6E]/20 backdrop-blur-xl border border-[#6C5CE7]/30 rounded-xl px-6 py-4 text-[#F7F7FC] focus:outline-none focus:ring-2 focus:ring-[#00CEC9]/40 focus:border-[#00CEC9]/50 transition-all placeholder:text-[#F7F7FC]/20"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#6C5CE7] hover:bg-[#00CEC9] text-[#F7F7FC] rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-[#00CEC9]/20"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="button"
              className="text-[#F7F7FC]/30 text-xs hover:text-[#00CEC9] transition-colors uppercase tracking-widest"
            >
              System Recovery
            </button>
          </div>
        </form>

        <div className="mt-16 flex items-center gap-10">
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#2D2B6E]/40 border border-[#6C5CE7]/20 flex items-center justify-center group-hover:border-[#00CEC9]/50 transition-all">
              <Wifi className="w-5 h-5 text-[#F7F7FC]/60 group-hover:text-[#00CEC9]" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[#2D2B6E]/40 border border-[#6C5CE7]/20 flex items-center justify-center group-hover:border-[#00CEC9]/50 transition-all">
              <Volume2 className="w-5 h-5 text-[#F7F7FC]/60 group-hover:text-[#00CEC9]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
