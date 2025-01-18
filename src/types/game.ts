export type Position = {
  x: number;
  y: number;
};

export type GameState = {
  playerX: number;
  playerY: number;
  playerDirection: 'left' | 'right' | 'idle';
  currentFrame: number;
  firecracker: {
    x: number;
    y: number;
    collected: boolean;
  };
  police: {
    x: number;
    y: number;
    frame: number;
    movingDown: boolean;
  };
  building: {
    x: number;
    y: number;
  };
  timeLeft: number;
  gameOver: boolean;
  message: string;
  endingMessage?: string;
};

export type GameScreen = 
  | 'loading'
  | 'password1'
  | 'minigame1'
  | 'password2'
  | 'minigame2'
  | 'password3'
  | 'minigame3'
  | 'password4'
  | 'minigame4'
  | 'finalPassword'
  | 'agir';

// Alias GameScreenType to GameScreen for backward compatibility
export type GameScreenType = GameScreen;

export type GameProgress = {
  currentScreen: GameScreen;
  hints: string[];
  completedGames: GameScreen[];
};

// Add the Word type for the drag and drop game
export type Word = {
  id: string;
  content: string;
  correctColumn: 'positive' | 'negative';
};