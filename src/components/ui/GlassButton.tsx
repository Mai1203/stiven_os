import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type CombinedProps = ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<'button'>;

interface GlassButtonProps extends CombinedProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function GlassButton({ 
  children, 
  variant = 'secondary', 
  size = 'md',
  className = '', 
  ...props 
}: GlassButtonProps) {
  const variantClasses = {
    primary: 'bg-sky-500 hover:bg-sky-400 text-black border-sky-400',
    secondary: 'bg-white/10 hover:bg-white/20 border-white/20 text-white',
    ghost: 'bg-transparent hover:bg-white/5 border-transparent text-white/70 hover:text-white',
    danger: 'bg-red-500/20 hover:bg-red-500/40 border-red-500/50 text-red-100',
  }[variant];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-bold',
  }[size];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg border transition-all flex items-center justify-center gap-2 ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
