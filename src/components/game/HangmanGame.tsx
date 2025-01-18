import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type HangmanGameProps = {
  onComplete: (success: boolean) => void;
};

export const HangmanGame: React.FC<HangmanGameProps> = ({ onComplete }) => {
  const WORD_TO_GUESS = "DETERMINISME";
  const MAX_ERRORS = 3;
  const TOTAL_CREDITS = 600;
  const WRONG_GUESS_COST = 200;
  
  const COST_PER_CORRECT_LETTER = Math.ceil(
    TOTAL_CREDITS / 
    new Set(WORD_TO_GUESS.split('')).size // Nombre de lettres uniques
  ) + 1; // +1 pour rendre la victoire plus difficile
  
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(() => {
    // Révéler la première et dernière lettre, ainsi que toutes les occurrences de la première lettre
    const firstLetter = WORD_TO_GUESS[0];
    const lastLetter = WORD_TO_GUESS[WORD_TO_GUESS.length - 1];
    return new Set([firstLetter, lastLetter]);
  });
  
  const [errors, setErrors] = useState<number>(0);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [credits, setCredits] = useState<number>(600);

  const displayWord = WORD_TO_GUESS.split('').map((letter, index) => 
    guessedLetters.has(letter) || index === 0 || index === WORD_TO_GUESS.length - 1 ? letter : '_'
  ).join(' ');

  const checkWin = useCallback(() => {
    return WORD_TO_GUESS.split('').every(letter => guessedLetters.has(letter));
  }, [guessedLetters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || !currentLetter) return;

    const letter = currentLetter.toUpperCase();
    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters).add(letter);
      setGuessedLetters(newGuessedLetters);
      
      if (!WORD_TO_GUESS.includes(letter)) {
        const newCredits = credits - WRONG_GUESS_COST;
        const newErrors = errors + 1;
        
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
        } else if (checkWin()) {
          setGameStatus('won');
          onComplete(true);
        }
      }
    }
    setCurrentLetter("");
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameStatus !== 'playing') return;
    
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      setCurrentLetter(key);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const form = document.querySelector('form');
      if (form) form.requestSubmit();
    }
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  const creditsGauge = Array(Math.ceil(credits / 100))
    .fill('$')
    .join('');

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-terminal-bg text-terminal-text font-mono border-2 border-terminal-text">
      <h2 className="text-2xl">Le Pendu</h2>
      
      <div className="text-4xl tracking-wider mb-8">
        {displayWord}
      </div>
      
      <div className="w-full max-w-xs space-y-2">
        <div className="text-xl text-center">
          Crédits: {credits}
        </div>
        <Progress value={(credits / TOTAL_CREDITS) * 100} className="h-2" />
        <div className="text-center">
          {creditsGauge || '-'}
        </div>
      </div>

      {gameStatus === 'playing' && (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="text"
            value={currentLetter}
            onChange={(e) => setCurrentLetter(e.target.value.slice(-1).toUpperCase())}
            maxLength={1}
            className="w-16 text-center bg-terminal-bg text-terminal-text border-terminal-text"
            placeholder="?"
          />
          <Button 
            type="submit"
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-text/80"
          >
            Valider
          </Button>
        </form>
      )}

      {gameStatus === 'won' && (
        <div className="text-2xl text-green-500">
          Bravo ! Vous avez deviné le mot... Mais il ne vous reste que {credits} crédits !
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