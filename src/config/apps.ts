import { User, Code2, FolderGit2, Mail, Terminal as TerminalIcon, Gamepad2 } from 'lucide-react';
import { AppDefinition } from '../types';

export const APPS: AppDefinition[] = [
  {
    id: 'about',
    icon: User,
    label: 'About Me',
    component: 'about',
    title: 'About Me',
    size: { width: 800, height: 600 },
  },
  {
    id: 'skills',
    icon: Code2,
    label: 'Skills',
    component: 'skills',
    title: 'Skills',
    size: { width: 700, height: 600 },
  },
  {
    id: 'projects',
    icon: FolderGit2,
    label: 'Projects',
    component: 'projects',
    title: 'Projects',
    size: { width: 900, height: 650 },
  },
  {
    id: 'contact',
    icon: Mail,
    label: 'Contact',
    component: 'contact',
    title: 'Contact',
    size: { width: 500, height: 550 },
  },
  {
    id: 'terminal',
    icon: TerminalIcon,
    label: 'Terminal',
    component: 'terminal',
    title: 'Terminal',
    size: { width: 800, height: 500 },
  },
  {
    id: 'snake',
    icon: Gamepad2,
    label: 'Snake.io',
    component: 'snake',
    title: 'Snake Game',
    size: { width: 450, height: 600 },
  },
  {
    id: 'fighting',
    icon: Gamepad2,
    label: 'Fighters',
    component: 'fighting',
    title: 'Fighting Game',
    size: { width: 850, height: 750 },
  },
];
