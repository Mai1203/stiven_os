import { LucideIcon } from 'lucide-react';

export interface Window {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppDefinition {
  id: string;
  icon: LucideIcon;
  label: string;
  component: string;
  title: string;
  size: { width: number; height: number };
}
