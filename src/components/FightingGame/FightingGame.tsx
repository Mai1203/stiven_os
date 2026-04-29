import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { GameScene } from './GameScene';

export const FightingGame: React.FC = () => {
    const gameRef = useRef<HTMLDivElement>(null);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const handleError = (e: ErrorEvent) => {
            console.error('Global error:', e.error);
            setError(e.error?.message || 'Unknown error');
        };
        window.addEventListener('error', handleError);
        
        if (!gameRef.current) return;

        let game: Phaser.Game;
        try {
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: gameRef.current,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 1000, x: 0 },
                        debug: false
                    }
                },
                scene: [GameScene]
            };
            game = new Phaser.Game(config);
        } catch (e: any) {
            setError(e.message);
        }

        return () => {
            window.removeEventListener('error', handleError);
            if (game) {
                game.destroy(true);
            }
        };
    }, []);

    if (error) {
        return <div className="p-4 bg-red-900 text-white h-full overflow-auto">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">
                Fighting Game 2D
            </h1>
            
            <div className="flex gap-8 mb-6 text-sm bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-blue-400 text-lg mb-2">Player 1 (Azul)</span>
                    <span className="text-gray-300">Movimiento: <kbd className="bg-gray-700 px-2 py-1 rounded">A</kbd> <kbd className="bg-gray-700 px-2 py-1 rounded">D</kbd></span>
                    <span className="text-gray-300 mt-1">Salto: <kbd className="bg-gray-700 px-2 py-1 rounded">W</kbd></span>
                </div>
                
                <div className="w-px bg-gray-700"></div>

                <div className="flex flex-col items-center">
                    <span className="font-bold text-red-400 text-lg mb-2">Player 2 (Rojo)</span>
                    <span className="text-gray-300">Movimiento: <kbd className="bg-gray-700 px-2 py-1 rounded">←</kbd> <kbd className="bg-gray-700 px-2 py-1 rounded">→</kbd></span>
                    <span className="text-gray-300 mt-1">Salto: <kbd className="bg-gray-700 px-2 py-1 rounded">↑</kbd></span>
                </div>
            </div>

            <div 
                ref={gameRef} 
                className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800 ring-4 ring-gray-900/50"
            />
        </div>
    );
};
