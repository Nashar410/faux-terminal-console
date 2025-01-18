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
          2: Jeu de tri des mots
          3: Password 2
          4: Jeu de l'âne de Buridan
          5: Password 3
          6: Jeu du pendu
          7: Password 4
          8: Jeu d'assemblage du pétard
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