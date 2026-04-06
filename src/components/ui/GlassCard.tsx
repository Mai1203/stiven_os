import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function GlassCard({ 
  children, 
  className = '', 
  intensity = 'medium',
  ...props 
}: GlassCardProps) {
  const blurClass = {
    low: 'backdrop-blur-md bg-white/5',
    medium: 'backdrop-blur-xl bg-white/10',
    high: 'backdrop-blur-2xl bg-white/20',
  }[intensity];

  return (
    <motion.div
      className={`rounded-xl border border-white/20 shadow-2xl ${blurClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
