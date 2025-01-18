import React, { useState, KeyboardEvent } from 'react';
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';

type PasswordEntryProps = {
  currentStep: number;
  setCurrentStep: () => void;
  passwords: Record<number, { value: string; hint: string }>;
  onFailure: () => void;
};

export const PasswordEntry = ({ 
  currentStep, 
  setCurrentStep, 
  passwords,
  onFailure
}: PasswordEntryProps) => {
  const [password, setPassword] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cleanedPassword = password.replace(/\s+/g, '');
      
      const currentPassword = passwords[currentStep];
      const decodedPassword = decodeBase64(currentPassword.value);
      
      if (cleanedPassword.toLowerCase() === decodedPassword.toLowerCase()) {
        setCurrentStep();
        setPassword("");
      } else {
        onFailure();
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