import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import strings from '@/data/strings.json';
import { decodeBase64 } from '@/utils/encoding';

type Position = 'center' | 'left' | 'right';

type BuridanGameProps = {
  onComplete: () => void;
};

export const BuridanGame: React.FC<BuridanGameProps> = ({ onComplete }) => {
  const [position, setPosition] = useState<Position>('center');
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver) {
      endGame(false);
    }
  }, [timeLeft, gameOver]);

  const moveLeft = () => {
    if (gameOver) return;
    setPosition('left');
    if (position === 'center') {
      endGame(false);
    }
  };

  const moveRight = () => {
    if (gameOver) return;
    setPosition('right');
    if (position === 'center') {
      endGame(true);
    }
  };

  const endGame = (won: boolean) => {
    setGameOver(true);
    setHasWon(won);
    toast({
      title: won ? "Bravo !" : "Vous avez échoué",
      description: won ? decodeBase64(strings.game.buridan.success) : decodeBase64(strings.game.buridan.failure),
      className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
    });
    if (won) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="text-xl font-mono text-terminal-text">
        Temps restant: {timeLeft}s
      </div>

      <div className="relative w-full max-w-2xl h-64 border-2 border-terminal-text">
        {/* Left target - Water */}
        <div 
          onClick={moveLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 border border-terminal-text flex items-center justify-center cursor-pointer hover:bg-terminal-text/10"
        >
          Eau
        </div>

        {/* Right target - Food */}
        <div 
          onClick={moveRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 border border-terminal-text flex items-center justify-center cursor-pointer hover:bg-terminal-text/10"
        >
          Bouffe
        </div>

        {/* Donkey */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-all duration-300
            ${position === 'left' ? 'left-24' : position === 'right' ? 'right-24' : 'left-1/2 -translate-x-1/2'}`}
        >
          ÂNE
        </div>
      </div>

      <div className="text-sm font-mono text-terminal-text">
        Utilisez les flèches gauche/droite ou cliquez sur une cible
      </div>

      {gameOver && (
        <div className="text-xl font-mono text-terminal-text animate-pulse">
          {hasWon ? "Bravo !" : "Vous avez échoué"}
        </div>
      )}
    </div>
  );
};
