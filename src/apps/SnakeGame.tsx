import { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RefreshCw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback(() => {
    let newFood: { x: number; y: number };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) break;
    }
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(prev => {
      const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

      // Check collisions
      if (
        head.x < 0 || head.x >= GRID_SIZE || 
        head.y < 0 || head.y >= GRID_SIZE ||
        prev.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
        return prev;
      }

      const newSnake = [head, ...prev];
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 font-sans bg-black/40" ref={gameRef}>
      <div className="flex justify-between w-full max-w-[400px] mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Score</span>
          <span className="text-xl font-bold text-sky-400">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/40 uppercase tracking-widest text-right">Best</span>
          <div className="flex items-center gap-1.5 text-xl font-bold text-fuchsia-400">
            <Trophy className="w-4 h-4" />
            {highScore}
          </div>
        </div>
      </div>

      <div 
        className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        style={{ width: 400, height: 400 }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute rounded-[4px] transition-all duration-150 ${i === 0 ? 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] z-10' : 'bg-sky-500/60'}`}
            style={{
              width: 18,
              height: 18,
              left: segment.x * 20 + 1,
              top: segment.y * 20 + 1,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-fuchsia-500 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.6)] animate-pulse"
          style={{
            width: 14,
            height: 14,
            left: food.x * 20 + 3,
            top: food.y * 20 + 3,
          }}
        />

        {/* Overlays */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold font-outfit mb-4 uppercase tracking-widest">Snake Game</h2>
            <p className="text-white/60 text-xs mb-8">Use arrow keys to move. Don't hit the walls or yourself!</p>
            <button 
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-2 px-6 py-2 bg-sky-500 hover:bg-sky-400 text-black rounded-lg font-bold transition-all"
            >
              <Play className="w-4 h-4" />
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-red-500/20 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center border border-red-500/50 rounded-xl">
            <h2 className="text-3xl font-black font-outfit mb-2 text-red-100 uppercase italic">Game Over</h2>
            <p className="text-white/80 text-sm mb-6">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-white/80 rounded-lg font-bold transition-all shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">
        Move: Arrow Keys | Reset: R
      </div>
    </div>
  );
}
