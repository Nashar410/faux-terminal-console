import React from 'react';

interface GameOverProps {
  message: string;
  endingMessage?: string;
}

export const GameOver: React.FC<GameOverProps> = ({ message, endingMessage }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[500px] bg-black text-terminal-text">
      <div className="text-2xl mb-4">
        {message}
      </div>
      {endingMessage && (
        <div className="text-xl animate-pulse mt-4">
          {endingMessage}
        </div>
      )}
    </div>
  );
};