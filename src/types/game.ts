export type GameState = {
  playerX: number;
  playerY: number;
  playerDirection: 'left' | 'right' | 'idle';
  currentFrame: number;
  firecracker: { x: number; y: number; collected: boolean };
  police: { x: number; y: number; frame: number; movingDown: boolean };
  building: { x: number; y: number };
  timeLeft: number;
  gameOver: boolean;
  message: string;
};

export type Position = {
  x: number;
  y: number;
};