import React from 'react';
import { PasswordEntry } from './PasswordEntry';
import { FinalPasswordForm } from './FinalPasswordForm';
import { GameScreenType } from '@/types/game';

type PasswordContainerProps = {
  currentScreen: GameScreenType;
  passwords: Record<number, { value: string; hint: string }>;
  finalPasswords: {
    determinisme: string;
    dieu: string;
    mechCola: string;
    choix: string;
  };
  setFinalPasswords: React.Dispatch<React.SetStateAction<{
    determinisme: string;
    dieu: string;
    mechCola: string;
    choix: string;
  }>>;
  onPasswordSuccess: (screen: GameScreenType) => void;
  onPasswordFailure: () => void;
};

export const PasswordContainer: React.FC<PasswordContainerProps> = ({
  currentScreen,
  passwords,
  finalPasswords,
  setFinalPasswords,
  onPasswordSuccess,
  onPasswordFailure,
}) => {
  if (currentScreen === 'finalPassword') {
    return (
      <FinalPasswordForm
        finalPasswords={finalPasswords}
        setFinalPasswords={setFinalPasswords}
        onSuccess={() => onPasswordSuccess('finalPassword')}
      />
    );
  }

  const step = currentScreen === 'password1' ? 1 :
              currentScreen === 'password2' ? 2 :
              currentScreen === 'password3' ? 3 :
              currentScreen === 'password4' ? 4 : 0;

  if (step === 0) return null;

  return (
    <PasswordEntry
      currentStep={step}
      setCurrentStep={() => onPasswordSuccess(currentScreen)}
      passwords={passwords}
      onFailure={onPasswordFailure}
    />
  );
};