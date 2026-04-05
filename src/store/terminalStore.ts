import { create } from 'zustand';

export interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

interface TerminalStore {
  history: TerminalLine[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
  addLine: (line: TerminalLine) => void;
  setCurrentInput: (input: string) => void;
  executeCommand: (command: string) => void;
  clearHistory: () => void;
  navigateHistory: (direction: 'up' | 'down') => string;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  history: [
    { type: 'output', content: 'Welcome to StivenOS Terminal v1.0' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ],
  currentInput: '',
  commandHistory: [],
  historyIndex: -1,

  addLine: (line) =>
    set((state) => ({
      history: [...state.history, line],
    })),

  setCurrentInput: (input) =>
    set({ currentInput: input }),

  clearHistory: () =>
    set({
      history: [
        { type: 'output', content: 'Welcome to StivenOS Terminal v1.0' },
        { type: 'output', content: 'Type "help" for available commands' },
        { type: 'output', content: '' },
      ],
    }),

  navigateHistory: (direction) => {
    const state = get();
    if (state.commandHistory.length === 0) return '';

    let newIndex = state.historyIndex;
    if (direction === 'up') {
      newIndex = newIndex === -1 ? state.commandHistory.length - 1 : Math.max(0, newIndex - 1);
    } else {
      newIndex = newIndex === -1 ? -1 : Math.min(state.commandHistory.length - 1, newIndex + 1);
      if (newIndex === state.commandHistory.length - 1) newIndex = -1;
    }

    set({ historyIndex: newIndex });
    return newIndex === -1 ? '' : state.commandHistory[newIndex];
  },

  executeCommand: (command) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    set((state) => ({
      history: [...state.history, { type: 'input', content: `$ ${trimmedCommand}` }],
      commandHistory: [...state.commandHistory, trimmedCommand],
      historyIndex: -1,
    }));

    const output = executeCommand(trimmedCommand);

    set((state) => ({
      history: [...state.history, ...output],
    }));
  },
}));

function executeCommand(command: string): TerminalLine[] {
  const args = command.toLowerCase().split(' ');
  const cmd = args[0];

  switch (cmd) {
    case 'help':
      return [
        { type: 'output', content: 'Available commands:' },
        { type: 'output', content: '' },
        { type: 'output', content: '  help              - Show this help message' },
        { type: 'output', content: '  about             - About Stiven' },
        { type: 'output', content: '  skills            - Technical skills' },
        { type: 'output', content: '  projects          - View projects' },
        { type: 'output', content: '  contact           - Contact information' },
        { type: 'output', content: '  clear             - Clear terminal' },
        { type: 'output', content: '  whoami            - Current user info' },
        { type: 'output', content: '  sudo hire me      - Special command ;)' },
        { type: 'output', content: '' },
      ];

    case 'whoami':
      return [
        { type: 'output', content: 'guest@stivenos' },
        { type: 'output', content: '' },
      ];

    case 'about':
      return [
        { type: 'output', content: 'ABOUT STIVEN' },
        { type: 'output', content: '=============' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Senior Full Stack Developer' },
        { type: 'output', content: 'Computer Engineer specializing in backend systems' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Expert in designing complex systems, sales automation,' },
        { type: 'output', content: 'and building scalable architectures.' },
        { type: 'output', content: '' },
      ];

    case 'skills':
      return [
        { type: 'output', content: 'TECHNICAL SKILLS' },
        { type: 'output', content: '================' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Backend:' },
        { type: 'output', content: '  • Node.js, Python, Java' },
        { type: 'output', content: '  • REST APIs, GraphQL, Microservices' },
        { type: 'output', content: '  • PostgreSQL, MongoDB, Redis' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Frontend:' },
        { type: 'output', content: '  • React, TypeScript, Next.js' },
        { type: 'output', content: '  • Tailwind CSS, Framer Motion' },
        { type: 'output', content: '' },
        { type: 'output', content: 'DevOps:' },
        { type: 'output', content: '  • Docker, Kubernetes' },
        { type: 'output', content: '  • CI/CD, AWS, GCP' },
        { type: 'output', content: '' },
      ];

    case 'projects':
      return [
        { type: 'output', content: 'FEATURED PROJECTS' },
        { type: 'output', content: '=================' },
        { type: 'output', content: '' },
        { type: 'output', content: '1. Sales Automation System' },
        { type: 'output', content: '   Enterprise-level automation platform' },
        { type: 'output', content: '' },
        { type: 'output', content: '2. Inventory Management System' },
        { type: 'output', content: '   Real-time tracking and analytics' },
        { type: 'output', content: '' },
        { type: 'output', content: '3. StivenOS' },
        { type: 'output', content: '   Interactive portfolio as an OS' },
        { type: 'output', content: '' },
      ];

    case 'contact':
      return [
        { type: 'output', content: 'CONTACT INFORMATION' },
        { type: 'output', content: '===================' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Email: stiven@example.com' },
        { type: 'output', content: 'GitHub: github.com/stiven' },
        { type: 'output', content: 'LinkedIn: linkedin.com/in/stiven' },
        { type: 'output', content: '' },
      ];

    case 'clear':
      useTerminalStore.getState().clearHistory();
      return [];

    case 'sudo':
      if (args[1] === 'hire' && args[2] === 'me') {
        return [
          { type: 'output', content: '🚀 ACCESS GRANTED 🚀' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Initiating hiring protocol...' },
          { type: 'output', content: '✓ Technical skills: EXCEPTIONAL' },
          { type: 'output', content: '✓ Problem solving: OUTSTANDING' },
          { type: 'output', content: '✓ Team fit: PERFECT' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Status: READY TO START! 💼' },
          { type: 'output', content: '' },
        ];
      }
      return [
        { type: 'error', content: `sudo: ${args.slice(1).join(' ')}: command not found` },
        { type: 'output', content: '' },
      ];

    default:
      return [
        { type: 'error', content: `Command not found: ${cmd}` },
        { type: 'output', content: 'Type "help" for available commands' },
        { type: 'output', content: '' },
      ];
  }
}
