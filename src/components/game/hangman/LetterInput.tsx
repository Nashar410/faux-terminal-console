import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LetterInputProps = {
  onSubmit: (letter: string) => void;
};

export const LetterInput: React.FC<LetterInputProps> = ({ onSubmit }) => {
  const [currentLetter, setCurrentLetter] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLetter) {
      onSubmit(currentLetter.toUpperCase());
      setCurrentLetter("");
    }
  };

  return (
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
  );
};