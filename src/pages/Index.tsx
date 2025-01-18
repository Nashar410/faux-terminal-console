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
  
  const gameState = useGameState();

  const handleGameStart = () => {
    setShowGame(true);
    gameState.startGame();
  };
  
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
              setShowGame={handleGameStart}
              passwords={passwords}
            />
          ) : (
            <FinalPasswordForm
              finalPasswords={finalPasswords}
              setFinalPasswords={setFinalPasswords}
              onSuccess={handleGameStart}
            />
          )
        ) : (
          <GameScreen 
            gameState={gameState.gameState}
            isNearPolice={gameState.isNearPolice}
            isExploding={gameState.isExploding}
            showPoliceDialog={gameState.showPoliceDialog}
            setShowPoliceDialog={gameState.setShowPoliceDialog}
            handlePoliceConfirm={gameState.handlePoliceConfirm}
            showFirecrackerDialog={gameState.showFirecrackerDialog}
            setShowFirecrackerDialog={gameState.setShowFirecrackerDialog}
            handleFirecrackerConfirm={gameState.handleFirecrackerConfirm}
            showArrestDialog={gameState.showArrestDialog}
            setShowArrestDialog={gameState.setShowArrestDialog}
            showBuildingDialog={gameState.showBuildingDialog}
            setShowBuildingDialog={gameState.setShowBuildingDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Index;