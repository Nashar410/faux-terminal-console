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
  isNearPolice: boolean;
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
};

export const GameScreen: React.FC<GameScreenProps> = ({ 
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
  setShowBuildingDialog
}) => {
  // Initialisation des hooks de jeu
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
  usePlayerMovement(gameState, true, movePlayer);

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

        {gameState.gameOver && gameState.endingMessage && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-terminal-text text-xl">
            {gameState.endingMessage}
          </div>
        )}

        <PoliceDialog
          open={showPoliceDialog}
          onOpenChange={setShowPoliceDialog}
          onConfirm={handlePoliceConfirm}
        />

        <FirecrackerDialog
          open={showFirecrackerDialog}
          onOpenChange={setShowFirecrackerDialog}
          onConfirm={handleFirecrackerConfirm}
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