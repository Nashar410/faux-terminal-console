import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { GameContainer } from '@/components/game/GameContainer';
import { PasswordContainer } from '@/components/auth/PasswordContainer';
import { useGameProgress } from '@/hooks/useGameProgress';
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

  const [finalPasswords, setFinalPasswords] = useState({
    determinisme: "",
    dieu: "",
    mechCola: "",
    choix: ""
  });

  const passwords = {
    1: { 
      value: strings.passwords["1"],
      hint: strings.finalForm.hints.determinisme
    },
    2: { 
      value: strings.passwords["2"],
      hint: strings.finalForm.hints.dieu
    },
    3: { 
      value: strings.passwords["3"],
      hint: strings.finalForm.hints.mechCola
    },
    4: { 
      value: strings.passwords["4"],
      hint: strings.finalForm.hints.choix
    }
  };

    useEffect(() => {
        let macKeyPressCount = 0;
        let macKeyPressTimer: NodeJS.Timeout | null = null;

        const handleDebugKeyPress = (event: KeyboardEvent) => {
            // Raccourci Windows/Linux : Ctrl + Alt + T
            if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
                triggerDebugMode();
            }

            // Raccourci Mac (ou autre OS) : Appuyer 5 fois sur "D" rapidement
            if (event.code === 'KeyD') {
                macKeyPressCount++;

                if (macKeyPressTimer) {
                    clearTimeout(macKeyPressTimer);
                }

                macKeyPressTimer = setTimeout(() => {
                    macKeyPressCount = 0;
                }, 1000); // Réinitialise après 1 seconde d'inactivité

                if (macKeyPressCount >= 5) {
                    macKeyPressCount = 0;
                    triggerDebugMode();
                }
            }
        };

        const triggerDebugMode = () => {
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
                'agir'
            ];

            const screenChoice = prompt(
                `Debug Mode - Choose a screen number:
      0: Loading
      1: Password 1
      2: Jeu de tri des mots
      3: Password 2
      4: Jeu de l'âne de Buridan
      5: Password 3
      6: Jeu du pendu
      7: Password 4
      8: Jeu d'assemblage du pétard
      9: Final Password
      10: Agir`
            );

            const screenIndex = parseInt(screenChoice || '0', 10);
            if (screenIndex >= 0 && screenIndex < screens.length) {
                goToScreen(screens[screenIndex]);
                toast({
                    description: `Debug: Navigating to ${screens[screenIndex]}`,
                    className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
                });
            }
        };

        window.addEventListener('keydown', handleDebugKeyPress);
        return () => {
            window.removeEventListener('keydown', handleDebugKeyPress);
        };
    }, [goToScreen, toast]);

    return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>{strings.console.welcome}</span>
          <span className="terminal-cursor"></span>
        </div>
        
        {gameProgress.currentScreen === 'loading' ? (
          <LoadingScreen onLoadingComplete={startGame} />
        ) : (
          <>
            <PasswordContainer
              currentScreen={gameProgress.currentScreen}
              passwords={passwords}
              finalPasswords={finalPasswords}
              setFinalPasswords={setFinalPasswords}
              onPasswordSuccess={handlePasswordSuccess}
              onPasswordFailure={handlePasswordFailure}
            />
            <GameContainer
              currentScreen={gameProgress.currentScreen}
              onGameComplete={handleGameCompletion}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
