import React from 'react';

interface GameOverProps {
  message: string;
}

export const GameOver: React.FC<GameOverProps> = ({ message }) => {
  return (
    <div className="relative flex items-center justify-center h-[500px] bg-black text-terminal-text">
      <div className="text-2xl animate-pulse">
        {message}
      </div>
    </div>
  );
};