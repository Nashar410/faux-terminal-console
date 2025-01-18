export type GameStatus = 'playing' | 'won' | 'lost';

export type HangmanProps = {
  onComplete: (success: boolean) => void;
};