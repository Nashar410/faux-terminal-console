import React from 'react';
import { AssemblyGame } from './AssemblyGame';

type PlaceholderGameProps = {
  gameNumber: number;
  onComplete: () => void;
};

export const PlaceholderGame: React.FC<PlaceholderGameProps> = ({ 
  gameNumber, 
  onComplete 
}) => {
  if (gameNumber === 4) {
    return <AssemblyGame onComplete={onComplete} />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-terminal-text">
      <h2 className="text-2xl font-mono text-terminal-text">Mini-jeu {gameNumber}</h2>
      <p className="text-terminal-text">Ce mini-jeu n'est pas encore implémenté</p>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-terminal-text text-terminal-bg hover:bg-terminal-text/80"
      >
        Simuler victoire
      </button>
    </div>
  );
};