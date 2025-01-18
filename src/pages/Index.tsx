import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PasswordEntry } from '@/components/auth/PasswordEntry';
import { FinalPasswordForm } from '@/components/auth/FinalPasswordForm';
import DragDropGame from '@/components/game/DragDropGame';
import { BuridanGame } from '@/components/game/BuridanGame';
import { PlaceholderGame } from '@/components/game/PlaceholderGame';
import { GameScreen } from '@/components/game/GameScreen';
import { useGameProgress } from '@/hooks/useGameProgress';
import { useGameState } from '@/hooks/useGameState';
import { useToast } from '@/hooks/use-toast';
import { GameScreen as GameScreenType } from '@/types/game';
import strings from '@/data/strings.json';

const Index = () => {
  const { toast } = useToast();
  const {
    gameProgress,
    startGame,
    handlePasswordSuccess,
    handlePasswordFailure,
    handleGameCompletion,
    goToScreen
  } = useGameProgress();

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
    startGame: startFinalGame
  } = useGameState();

  const [finalPasswords, setFinalPasswords] = useState({
    determinisme: "",
    dieu: "",
    mechCola: "",
    choix: ""
  });

  const passwords = {
    1: { 
      value: 'YkBzMWwxYw==',
      hint: 'ZMOpdGVybWluaXNtZQ=='
    },
    2: { 
      value: '92:87',
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

  useEffect(() => {
    const handleDebugKeyPress = (event: KeyboardEvent) => {
      // Detect Ctrl+Alt+T
      if (event.ctrlKey && event.altKey && event.key === 't') {
        const screens: GameScreenType[] = [
          'loading',
          'password1',
          'minigame1',
          'password2',
          'minigame2',
          'password3',
          'minigame3',
          'password4',
          'minigame4',
          'finalPassword',
          'finalGame'
        ];

        const screenChoice = prompt(
          `Debug Mode - Choose a screen number:
          0: Loading
          1: Password 1
          2: Minigame 1
          3: Password 2
          4: Minigame 2
          5: Password 3
          6: Minigame 3
          7: Password 4
          8: Minigame 4
          9: Final Password
          10: Final Game`
        );

        const screenIndex = parseInt(screenChoice || '0', 10);
        if (screenIndex >= 0 && screenIndex < screens.length) {
          goToScreen(screens[screenIndex]);
          toast({
            description: `Debug: Navigating to ${screens[screenIndex]}`,
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
        }
      }
    };

    window.addEventListener('keydown', handleDebugKeyPress);
    return () => window.removeEventListener('keydown', handleDebugKeyPress);
  }, [goToScreen, toast]);

  const renderCurrentScreen = () => {
    switch (gameProgress.currentScreen) {
      case 'loading':
        return <LoadingScreen onLoadingComplete={startGame} />;
      
      case 'password1':
        return (
          <PasswordEntry
            currentStep={1}
            setCurrentStep={() => handlePasswordSuccess('password1')}
            passwords={passwords}
            onFailure={handlePasswordFailure}
          />
        );
      
      case 'minigame1':
        return (
          <DragDropGame
            onComplete={() => handleGameCompletion('minigame1')}
          />
        );
      
      case 'password2':
        return (
          <PasswordEntry
            currentStep={2}
            setCurrentStep={() => handlePasswordSuccess('password2')}
            passwords={passwords}
            onFailure={handlePasswordFailure}
          />
        );
      
      case 'minigame2':
        return (
          <BuridanGame
            onComplete={() => handleGameCompletion('minigame2')}
          />
        );
      
      case 'password3':
        return (
          <PasswordEntry
            currentStep={3}
            setCurrentStep={() => handlePasswordSuccess('password3')}
            passwords={passwords}
            onFailure={handlePasswordFailure}
          />
        );
      
      case 'minigame3':
        return (
          <PlaceholderGame
            gameNumber={3}
            onComplete={() => handleGameCompletion('minigame3')}
          />
        );
      
      case 'password4':
        return (
          <PasswordEntry
            currentStep={4}
            setCurrentStep={() => handlePasswordSuccess('password4')}
            passwords={passwords}
            onFailure={handlePasswordFailure}
          />
        );
      
      case 'minigame4':
        return (
          <PlaceholderGame
            gameNumber={4}
            onComplete={() => handleGameCompletion('minigame4')}
          />
        );
      
      case 'finalPassword':
        return (
          <FinalPasswordForm
            finalPasswords={finalPasswords}
            setFinalPasswords={setFinalPasswords}
            onSuccess={() => handlePasswordSuccess('finalPassword')}
          />
        );
      
      case 'finalGame':
        return (
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
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>{strings.console.welcome}</span>
          <span className="terminal-cursor"></span>
        </div>
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default Index;