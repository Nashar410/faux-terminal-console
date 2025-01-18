import React, { useState, KeyboardEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';

type PasswordEntryProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setShowFinalInput: (show: boolean) => void;
  setShowGame: (show: boolean) => void;
  passwords: Record<number, { value: string; hint: string }>;
};

export const PasswordEntry = ({ 
  currentStep, 
  setCurrentStep, 
  setShowFinalInput,
  setShowGame,
  passwords 
}: PasswordEntryProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cleanedPassword = password.replace(/\s+/g, '');
      
      if (cleanedPassword.toLowerCase() === 'aaaaa123!') {
        toast({
          description: decodeBase64(strings.console.cheatMode),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setShowGame(true);
        return;
      }

      const currentPassword = passwords[currentStep];
      const decodedPassword = decodeBase64(currentPassword.value);
      const decodedHint = decodeBase64(currentPassword.hint);
      
      if (cleanedPassword.toLowerCase() === decodedPassword.toLowerCase()) {
        toast({
          description: `Mot de passe ${currentStep} valide ! Indice : ${decodedHint}`,
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });

        if (currentStep === 4) {
          setShowFinalInput(true);
        } else {
          setCurrentStep(currentStep + 1);
        }
        setPassword("");
      } else {
        toast({
          variant: "destructive",
          description: decodeBase64(strings.console.invalidPassword),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setPassword("");
      }
    }
  };

  return (
    <div className="mt-8">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={`${strings.console.passwordPrompt}${currentStep}...`}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2"
        autoFocus
      />
    </div>
  );
};