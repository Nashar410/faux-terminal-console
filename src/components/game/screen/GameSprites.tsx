import React, { useMemo } from 'react';
import { Sprite } from '../Sprite';
import { sprites, playerFrames, policeFrames } from '@/assets/gameSprites';
import { GameState } from '@/types/game';

type GameSpritesProps = {
  gameState: GameState;
  isNearPolice: boolean;
  isExploding: boolean;
};

export const GameSprites: React.FC<GameSpritesProps> = ({
  gameState,
  isNearPolice,
  isExploding
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
    <>
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
    </>
  );
};