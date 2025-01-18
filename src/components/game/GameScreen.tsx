import React from 'react';
import { GameState } from '@/types/game';
import { PoliceDialog } from './PoliceDialog';
import { FirecrackerDialog } from './FirecrackerDialog';
import { ArrestDialog } from './ArrestDialog';
import { BuildingDialog } from './BuildingDialog';
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
  useGameTimer(gameState, setGameState);
  usePoliceMovement(gameState, setGameState);
  useCollisions(
    gameState,
    setIsNearPolice,
    setShowPoliceDialog,
    setShowFirecrackerDialog,
    setShowArrestDialog,
    setShowBuildingDialog,
    handleBuildingExplosion
  );
  usePlayerMovement(gameState, !gameState.gameOver, movePlayer);

  const movePlayerAway = () => {
    const offset = 20;
    const newX = gameState.playerX > 50 ? gameState.playerX - offset : gameState.playerX + offset;
    movePlayer(newX, gameState.playerY, 'idle');
  };

  if (gameState.gameOver) {
    return (
      <div className="relative flex items-center justify-center h-[500px] bg-black text-terminal-text">
        <div className="text-2xl animate-pulse">
          {gameState.message}
        </div>
      </div>
    );
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

        <PoliceDialog
          open={showPoliceDialog}
          onOpenChange={setShowPoliceDialog}
          onConfirm={handlePoliceConfirm}
          movePlayerAway={movePlayerAway}
        />

        <FirecrackerDialog
          open={showFirecrackerDialog}
          onOpenChange={setShowFirecrackerDialog}
          onConfirm={handleFirecrackerConfirm}
          movePlayerAway={movePlayerAway}
        />

        <ArrestDialog
          open={showArrestDialog}
          onOpenChange={setShowArrestDialog}
        />

        <BuildingDialog
          open={showBuildingDialog}
          onOpenChange={setShowBuildingDialog}
        />
      </div>
    </div>
  );
};