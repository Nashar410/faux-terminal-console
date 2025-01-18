import { PlayerIdle, PlayerWalkLeft, PlayerWalkRight } from './sprites/PlayerSprite';
import { PoliceIdle1, PoliceIdle2 } from './sprites/PoliceSprite';
import { BuildingSprite } from './sprites/BuildingSprite';

export const sprites = {
  player: {
    idle: PlayerIdle,
    walkLeft: PlayerWalkLeft,
    walkRight: PlayerWalkRight
  },
  police: {
    idle1: PoliceIdle1,
    idle2: PoliceIdle2
  },
  building: BuildingSprite
};

// Animation frames for player movement
export const playerFrames = {
  left: [sprites.player.walkLeft, sprites.player.idle],
  right: [sprites.player.walkRight, sprites.player.idle],
  idle: [sprites.player.idle]
};

// Animation frames for police idle animation
export const policeFrames = [sprites.police.idle1, sprites.police.idle2];