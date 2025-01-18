import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HangmanGameProps = {
  onComplete: (success: boolean) => void;
};

export const HangmanGame: React.FC<HangmanGameProps> = ({ onComplete }) => {
  const WORD_TO_GUESS = "DETERMINISME";
  const MAX_ERRORS = 6;
  
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<number>(0);
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Convertit le mot en tableau de lettres masquées ou révélées
  const displayWord = WORD_TO_GUESS.split('').map(letter => 
    guessedLetters.has(letter) ? letter : '_'
  ).join(' ');

  // Vérifie si toutes les lettres ont été trouvées
  const checkWin = useCallback(() => {
    return WORD_TO_GUESS.split('').every(letter => guessedLetters.has(letter));
  }, [guessedLetters]);

  // Gère la soumission d'une lettre
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || !currentLetter) return;

    const letter = currentLetter.toUpperCase();
    if (!guessedLetters.has(letter)) {
      const newGuessedLetters = new Set(guessedLetters).add(letter);
      setGuessedLetters(newGuessedLetters);
      
      if (!WORD_TO_GUESS.includes(letter)) {
        const newErrors = errors + 1;
        setErrors(newErrors);
        if (newErrors >= MAX_ERRORS) {
          setGameStatus('lost');
          onComplete(false);
        }
      } else if (checkWin()) {
        setGameStatus('won');
        onComplete(true);
      }
    }
    setCurrentLetter("");
  };

  // Gère l'entrée clavier
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameStatus !== 'playing') return;
    
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      setCurrentLetter(key);
    }
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-terminal-bg text-terminal-text font-mono border-2 border-terminal-text">
      <h2 className="text-2xl">Le Pendu</h2>
      
      <div className="text-4xl tracking-wider mb-8">
        {displayWord}
      </div>
      
      <div className="text-xl">
        Erreurs: {errors}/{MAX_ERRORS}
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
        <div className="text-2xl text-green-500">Victoire !</div>
      )}
      
      {gameStatus === 'lost' && (
        <div className="text-2xl text-red-500">
          Perdu ! Le mot était : {WORD_TO_GUESS}
        </div>
      )}
    </div>
  );
};