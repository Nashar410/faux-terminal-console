import React from 'react';
import DragDropGame from './DragDropGame';
import { BuridanGame } from './BuridanGame';
import { HangmanGame } from './HangmanGame';
import { PlaceholderGame } from './PlaceholderGame';
import { GameScreenType } from '@/types/game';

type GameContainerProps = {
  currentScreen: GameScreenType;
  onGameComplete: (screen: GameScreenType) => void;
};

export const GameContainer: React.FC<GameContainerProps> = ({
  currentScreen,
  onGameComplete,
}) => {
  switch (currentScreen) {
    case 'minigame1':
      return (
        <DragDropGame
          onComplete={() => onGameComplete('minigame1')}
        />
      );
    
    case 'minigame2':
      return (
        <BuridanGame
          onComplete={() => onGameComplete('minigame2')}
        />
      );
    
    case 'minigame3':
      return (
        <HangmanGame
          onComplete={(success) => {
            if (success) {
              onGameComplete('minigame3');
            }
          }}
        />
      );
    
    case 'minigame4':
      return (
        <PlaceholderGame
          gameNumber={4}
          onComplete={() => onGameComplete('minigame4')}
        />
      );
    
    case 'agir':
      return (
        <div className="text-center p-4">
          <p>Mini-jeu en cours de reconstruction</p>
        </div>
      );
    
    default:
      return null;
  }
};