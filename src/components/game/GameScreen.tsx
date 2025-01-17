import React, { useMemo } from 'react';
import { Sprite } from './Sprite';
import { sprites, playerFrames, policeFrames } from '@/assets/gameSprites';
import { GameState } from '@/types/game';
import { PoliceDialog } from './PoliceDialog';

type GameScreenProps = {
  gameState: GameState;
  isNearPolice: boolean;
  isExploding: boolean;
  showPoliceDialog: boolean;
  setShowPoliceDialog: (show: boolean) => void;
  handlePoliceConfirm: () => void;
};

export const GameScreen: React.FC<GameScreenProps> = ({ 
  gameState, 
  isNearPolice, 
  isExploding,
  showPoliceDialog,
  setShowPoliceDialog,
  handlePoliceConfirm
}) => {
  const SPRITE_SCALE = 2;

  const currentPlayerSprite = useMemo(() => {
    const direction = gameState.playerDirection;
    const frame = gameState.currentFrame;
    return playerFrames[direction]?.[frame] || playerFrames.idle[0];
  }, [gameState.playerDirection, gameState.currentFrame]);

  const currentPoliceSprite = useMemo(() => {
    return policeFrames[gameState.police.frame] || policeFrames[0];
  }, [gameState.police.frame]);

  return (
    <div className="relative">
      <div className="flex justify-between mb-4 text-terminal-text">
        <div className="text-xl font-mono">
          Temps restant: {gameState.timeLeft}s
        </div>
        {gameState.firecracker.collected && (
          <div className="flex items-center gap-2">
            <span>Inventaire:</span>
            <div className="w-8 h-8">
              <sprites.firecracker />
            </div>
          </div>
        )}
      </div>

      <div className={`border-2 border-terminal-text p-4 relative bg-black/50 h-[500px] w-full
                    ${isExploding ? 'screen-flash' : ''}`}>
        <Sprite 
          position={{ x: gameState.playerX, y: gameState.playerY }}
          sprite={currentPlayerSprite}
          className={isNearPolice ? 'danger-flash' : ''}
          scale={SPRITE_SCALE}
        />
        
        <Sprite 
          position={{ x: gameState.police.x, y: gameState.police.y }}
          sprite={currentPoliceSprite}
          scale={SPRITE_SCALE}
        />
        
        <Sprite 
          position={{ x: gameState.building.x, y: gameState.building.y }}
          sprite={sprites.building}
          size={{ width: 32, height: 64 }}
          scale={SPRITE_SCALE}
          className={isExploding ? 'explosion' : ''}
        />
        
        {!gameState.firecracker.collected && (
          <Sprite 
            position={{ x: gameState.firecracker.x, y: gameState.firecracker.y }}
            sprite={sprites.firecracker}
            size={{ width: 16, height: 16 }}
            scale={SPRITE_SCALE}
          />
        )}
        
        {gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90">
            <div className="text-terminal-text text-2xl animate-pulse">
              {gameState.message}
            </div>
          </div>
        )}
        
        <div className="absolute bottom-2 left-2 text-terminal-text text-sm">
          Utilisez les flèches ou WASD pour vous déplacer
        </div>

        <PoliceDialog
          open={showPoliceDialog}
          onOpenChange={setShowPoliceDialog}
          onConfirm={handlePoliceConfirm}
        />
      </div>
    </div>
  );
};