import { GameState } from '@/types/game';

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
  | 'finalGame';

export type GameProgress = {
  currentScreen: GameScreen;
  hints: string[];
  completedGames: GameScreen[];
};
