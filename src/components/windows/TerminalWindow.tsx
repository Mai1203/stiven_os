import { useEffect, useRef, useState } from 'react';
import { useTerminalStore } from '../../store/terminalStore';

export default function TerminalWindow() {
  const { history, executeCommand, navigateHistory } = useTerminalStore();
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCommand = navigateHistory('up');
      setInput(historyCommand);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCommand = navigateHistory('down');
      setInput(historyCommand);
    }
  };

  return (
    <div
      className="h-full bg-black text-[#00ff9f] font-mono p-4 overflow-auto"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((line, index) => (
          <div
            key={index}
            className={`${
              line.type === 'input'
                ? 'text-white'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-[#00ff9f]'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-[#00ff9f]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white"
          autoFocus
        />
      </form>
    </div>
  );
}
