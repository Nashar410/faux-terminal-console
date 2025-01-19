import React from 'react';
import { GameState } from '@/types/game';
import { GameOver } from './GameOver';
import { DialogManager } from './dialogs/DialogManager';
import { GameOverlay } from './screen/GameOverlay';
import { GameSprites } from './screen/GameSprites';
import { useGameTimer } from '@/hooks/game/useGameTimer';
import { usePoliceMovement } from '@/hooks/game/usePoliceMovement';
import { useCollisions } from '@/hooks/game/useCollisions';
import { usePlayerMovement } from '@/hooks/usePlayerMovement';

type GameScreenProps = {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  isNearPolice: boolean;
  setIsNearPolice: (near: boolean) => void;
  isExploding: boolean;
  showPoliceDialog: boolean;
  setShowPoliceDialog: (show: boolean) => void;
  handlePoliceConfirm: () => void;
  showFirecrackerDialog: boolean;
  setShowFirecrackerDialog: (show: boolean) => void;
  handleFirecrackerConfirm: () => void;
  showArrestDialog: boolean;
  setShowArrestDialog: (show: boolean) => void;
  showBuildingDialog: boolean;
  setShowBuildingDialog: (show: boolean) => void;
  movePlayer: (newX: number, newY: number, direction: 'left' | 'right' | 'idle') => void;
  handleBuildingExplosion: () => void;
};

export const GameScreen: React.FC<GameScreenProps> = ({
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
}) => {
  const isPaused = showPoliceDialog || showFirecrackerDialog || showArrestDialog || showBuildingDialog;

  useGameTimer(gameState, setGameState, isPaused);
  usePoliceMovement(gameState, setGameState, isPaused);
  useCollisions(
    gameState,
    setIsNearPolice,
    setShowPoliceDialog,
    setShowFirecrackerDialog,
    setShowArrestDialog,
    setShowBuildingDialog,
    handleBuildingExplosion
  );
  usePlayerMovement(gameState, !gameState.gameOver && !isPaused, movePlayer);

  if (gameState.gameOver) {
    return <GameOver message={gameState.message} endingMessage={gameState.endingMessage} />;
  }

  return (
    <div className="relative">
      <GameOverlay gameState={gameState} timeLeft={gameState.timeLeft} />

      <div className={`border-2 border-terminal-text p-4 relative bg-black/50 h-[500px] w-full
                    ${isExploding ? 'screen-flash' : ''}`}>
        <GameSprites
          gameState={gameState}
          isNearPolice={isNearPolice}
          isExploding={isExploding}
        />

        <DialogManager
          showPoliceDialog={showPoliceDialog}
          setShowPoliceDialog={setShowPoliceDialog}
          showFirecrackerDialog={showFirecrackerDialog}
          setShowFirecrackerDialog={setShowFirecrackerDialog}
          showArrestDialog={showArrestDialog}
          setShowArrestDialog={setShowArrestDialog}
          showBuildingDialog={showBuildingDialog}
          setShowBuildingDialog={setShowBuildingDialog}
          handlePoliceConfirm={handlePoliceConfirm}
          handleFirecrackerConfirm={handleFirecrackerConfirm}
          movePlayer={movePlayer}
        />
      </div>
    </div>
  );
};