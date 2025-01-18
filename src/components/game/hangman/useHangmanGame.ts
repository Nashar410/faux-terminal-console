import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GameStatus } from './types';
import { 
  WORD_TO_GUESS, 
  WRONG_GUESS_COST, 
  COST_PER_CORRECT_LETTER, 
  TOTAL_CREDITS,
  MAX_ERRORS 
} from './constants';

export const useHangmanGame = (onComplete: (success: boolean) => void) => {
  const { toast } = useToast();
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(() => {
    const firstLetter = WORD_TO_GUESS[0];
    return new Set([firstLetter]);
  });
  
  const [errors, setErrors] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [credits, setCredits] = useState<number>(TOTAL_CREDITS);

  const getDisplayWord = useCallback(() => {
    return WORD_TO_GUESS.split('').map(letter => 
      guessedLetters.has(letter) ? letter : '_'
    ).join(' ');
  }, [guessedLetters]);

  const isWordComplete = useCallback(() => {
    const visibleLetters = WORD_TO_GUESS.split('').filter(letter => 
      guessedLetters.has(letter)
    ).length;
    return visibleLetters === WORD_TO_GUESS.length;
  }, [guessedLetters]);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing') return;

    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters).add(letter);
      setGuessedLetters(newGuessedLetters);
      
      if (!WORD_TO_GUESS.includes(letter)) {
        const newErrors = errors + 1;
        const newCredits = credits - WRONG_GUESS_COST;
        
        setErrors(newErrors);
        setCredits(newCredits);
        
        if (newErrors >= MAX_ERRORS || newCredits <= 0) {
          setGameStatus('lost');
          onComplete(false);
        }
      } else {
        const newCredits = credits - COST_PER_CORRECT_LETTER;
        setCredits(newCredits);
        
        if (newCredits <= 0) {
          setGameStatus('lost');
          onComplete(false);
        }
      }
    }
  };

  const handleValidateWord = () => {
    setGameStatus('won');
    toast({
      description: "Indice n°3 débloqué : Le mot de passe est lié au déterminisme...",
      className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
    });
    onComplete(true);
  };

  return {
    guessedLetters,
    errors,
    gameStatus,
    credits,
    getDisplayWord,
    isWordComplete,
    handleGuess,
    handleValidateWord
  };
};