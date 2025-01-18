import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LetterInput } from './hangman/LetterInput';
import { StatusDisplay } from './hangman/StatusDisplay';
import { useHangmanGame } from './hangman/useHangmanGame';
import type { HangmanProps } from './hangman/types';

export const HangmanGame: React.FC<HangmanProps> = ({ onComplete }) => {
  const {
    guessedLetters,
    errors,
    gameStatus,
    credits,
    getDisplayWord,
    isWordComplete,
    handleGuess,
    handleValidateWord
  } = useHangmanGame(onComplete);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing' || isWordComplete()) return;
      
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [gameStatus, isWordComplete, handleGuess]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-terminal-bg text-terminal-text font-mono border-2 border-terminal-text">
      <h2 className="text-2xl">Le Pendu</h2>
      
      <div className="text-4xl tracking-wider mb-8">
        {getDisplayWord()}
      </div>
      
      <StatusDisplay credits={credits} errors={errors} />

      {gameStatus === 'playing' && !isWordComplete() && (
        <LetterInput onSubmit={handleGuess} />
      )}

      {gameStatus === 'playing' && isWordComplete() && (
        <Button 
          onClick={handleValidateWord}
          className="bg-terminal-text text-terminal-bg hover:bg-terminal-text/80"
        >
          Valider le mot
        </Button>
      )}

      {gameStatus === 'won' && (
        <div className="text-2xl text-green-500">
          Bravo ! Vous avez deviné le mot avec {credits} crédits !
        </div>
      )}
      
      {gameStatus === 'lost' && (
        <div className="text-2xl text-red-500">
          Perdu !
        </div>
      )}
    </div>
  );
};