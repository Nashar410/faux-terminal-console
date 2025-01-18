import React from 'react';
import { GameScreen } from './GameScreen';
import DragDropGame from './DragDropGame';
import { BuridanGame } from './BuridanGame';
import { PlaceholderGame } from './PlaceholderGame';
import { GameScreenType } from '@/types/game';
import { useGameState } from '@/hooks/useGameState';

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
    isNearPolice,
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
        <PlaceholderGame
          gameNumber={3}
          onComplete={() => onGameComplete('minigame3')}
        />
      );
    
    case 'minigame4':
      return (
        <PlaceholderGame
          gameNumber={4}
          onComplete={() => onGameComplete('minigame4')}
        />
      );
    
    case 'finalGame':
      return (
        <GameScreen
          gameState={gameState}
          isNearPolice={isNearPolice}
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
        />
      );
    
    default:
      return null;
  }
};