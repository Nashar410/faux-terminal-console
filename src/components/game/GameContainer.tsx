import React from 'react';
import DragDropGame from './DragDropGame';
import { BuridanGame } from './BuridanGame';
import { HangmanGame } from './HangmanGame';
import { PlaceholderGame } from './PlaceholderGame';
import { GameScreen } from './GameScreen';
import { useGameState } from '@/hooks/game/useGameState';
import { GameScreenType } from '@/types/game';

type GameContainerProps = {
  currentScreen: GameScreenType;
  onGameComplete: (screen: GameScreenType) => void;
};

export const GameContainer: React.FC<GameContainerProps> = ({
  currentScreen,
  onGameComplete,
}) => {
  const {
    gameState,
    setGameState,
    isNearPolice,
    setIsNearPolice,
    isExploding,
    showPoliceDialog,
    setShowPoliceDialog,
    handlePoliceConfirm,
    showFirecrackerDialog,
    setShowFirecrackerDialog,
    handleFirecrackerConfirm,
    showArrestDialog,
    setShowArrestDialog,
    showBuildingDialog,
    setShowBuildingDialog,
    movePlayer,
    handleBuildingExplosion
  } = useGameState();

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
        <GameScreen
          gameState={gameState}
          setGameState={setGameState}
          isNearPolice={isNearPolice}
          setIsNearPolice={setIsNearPolice}
          isExploding={isExploding}
          showPoliceDialog={showPoliceDialog}
          setShowPoliceDialog={setShowPoliceDialog}
          handlePoliceConfirm={handlePoliceConfirm}
          showFirecrackerDialog={showFirecrackerDialog}
          setShowFirecrackerDialog={setShowFirecrackerDialog}
          handleFirecrackerConfirm={handleFirecrackerConfirm}
          showArrestDialog={showArrestDialog}
          setShowArrestDialog={setShowArrestDialog}
          showBuildingDialog={showBuildingDialog}
          setShowBuildingDialog={setShowBuildingDialog}
          movePlayer={movePlayer}
          handleBuildingExplosion={handleBuildingExplosion}
        />
      );
    
    default:
      return null;
  }
};