import React from 'react';
import { Sprite } from './Sprite';
import { sprites, playerFrames, policeFrames } from '@/assets/gameSprites';
import { GameState } from '@/types/game';

type GameScreenProps = {
  gameState: GameState;
  isNearPolice: boolean;
  isExploding: boolean;
};

export const GameScreen: React.FC<GameScreenProps> = ({ gameState, isNearPolice, isExploding }) => {
  const SPRITE_SCALE = 2; // Facteur de zoom global

  return (
    <div className={`mt-8 border-2 border-terminal-text p-4 relative bg-black/50 h-[500px] w-full
                    ${isExploding ? 'screen-flash' : ''}`}>
      {/* Player */}
      <Sprite 
        position={{ x: gameState.playerX, y: gameState.playerY }}
        sprite={playerFrames[gameState.playerDirection][gameState.currentFrame]}
        className={isNearPolice ? 'danger-flash' : ''}
        scale={SPRITE_SCALE}
      />
      
      {/* Police */}
      <Sprite 
        position={{ x: gameState.police.x, y: gameState.police.y }}
        sprite={policeFrames[gameState.police.frame]}
        scale={SPRITE_SCALE}
      />
      
      {/* Building */}
      <Sprite 
        position={{ x: gameState.building.x, y: gameState.building.y }}
        sprite={sprites.building}
        size={{ width: 32, height: 64 }}
        scale={SPRITE_SCALE}
        className={isExploding ? 'explosion' : ''}
      />
      
      {/* Firecracker */}
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
    </div>
  );
};