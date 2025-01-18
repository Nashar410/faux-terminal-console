import { useState } from 'react';
import { GameScreen } from '@/components/game/GameScreen';
import { useGameState } from '@/hooks/useGameState';
import { PasswordEntry } from '@/components/auth/PasswordEntry';
import { FinalPasswordForm } from '@/components/auth/FinalPasswordForm';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [finalPasswords, setFinalPasswords] = useState({
    determinisme: "",
    dieu: "",
    mechCola: "",
    choix: ""
  });
  
  const { 
    gameState, 
    isNearPolice, 
    isExploding, 
    movePlayer,
    showPoliceDialog,
    setShowPoliceDialog,
    handlePoliceConfirm,
    showFirecrackerDialog,
    setShowFirecrackerDialog,
    handleFirecrackerConfirm,
    showArrestDialog,
    setShowArrestDialog,
    showBuildingDialog,
    setShowBuildingDialog,
    startGame
  } = useGameState();

  const passwords = {
    1: { 
      value: 'YkBzMWwxYw==',
      hint: 'ZMOpdGVybWluaXNtZQ=='
    },
    2: { 
      value: 'OTI6ODc=',
      hint: 'ZGlldQ=='
    },
    3: { 
      value: btoa(unescape(encodeURIComponent('49crédits'))),
      hint: 'TWVjaC1Db2xh'
    },
    4: { 
      value: 'OHVyMWRAbg==',
      hint: 'Y2hvaXg='
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>Bienvenue sur ma console secrète</span>
          <span className="terminal-cursor"></span>
        </div>
        
        {!showGame ? (
          !showFinalInput ? (
            <PasswordEntry
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              setShowFinalInput={setShowFinalInput}
              setShowGame={setShowGame}
              passwords={passwords}
            />
          ) : (
            <FinalPasswordForm
              finalPasswords={finalPasswords}
              setFinalPasswords={setFinalPasswords}
              onSuccess={() => setShowGame(true)}
            />
          )
        ) : (
          <GameScreen 
            gameState={gameState}
            isNearPolice={isNearPolice}
            isExploding={isExploding}
            showPoliceDialog={showPoliceDialog}
            setShowPoliceDialog={setShowPoliceDialog}
            handlePoliceConfirm={handlePoliceConfirm}
            showFirecrackerDialog={showFirecrackerDialog}
            setShowFirecrackerDialog={setShowFirecrackerDialog}
            handleFirecrackerConfirm={handleFirecrackerConfirm}
            showArrestDialog={showArrestDialog}
            setShowArrestDialog={setShowArrestDialog}
            showBuildingDialog={showBuildingDialog}
            setShowBuildingDialog={setShowBuildingDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Index;