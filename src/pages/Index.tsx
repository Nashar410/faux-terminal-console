import { useState, useEffect, KeyboardEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GameScreen } from '@/components/game/GameScreen';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const { 
    gameState, 
    isNearPolice, 
    isTimeRunningOut, 
    isExploding, 
    movePlayer,
    showPoliceDialog,
    setShowPoliceDialog,
    handlePoliceConfirm,
    showFirecrackerDialog,
    setShowFirecrackerDialog,
    handleFirecrackerConfirm,
    showArrestDialog,
    setShowArrestDialog
  } = useGameState();

  const { toast } = useToast();

  // Structure contenant les mots de passe et indices encodés en base64
  const passwords = {
    1: { 
      value: 'c2VjcmV0MQ==',     // Encoded password 1
      hint: 'RkxFVVI='           // Encoded hint 1
    },
    2: { 
      value: 'c2VjcmV0Mg==',     // Encoded password 2
      hint: 'TFVORQ=='           // Encoded hint 2
    },
    3: { 
      value: 'c2VjcmV0Mw==',     // Encoded password 3
      hint: 'Q09MTElORQ=='       // Encoded hint 3
    },
    4: { 
      value: 'c2VjcmV0NA==',     // Encoded password 4
      hint: 'QUlHTEU='           // Encoded hint 4
    }
  };

  // Fonction de décodage base64
  const decodeBase64 = (str: string): string => {
    try {
      return atob(str);
    } catch (e) {
      console.error('Erreur de décodage base64:', e);
      return '';
    }
  };

  // Construction du mot de passe final à partir des indices décodés
  const getFinalPassword = () => {
    return Object.values(passwords)
      .map(p => decodeBase64(p.hint))
      .join('');
  };

  useEffect(() => {
    if (showGame && !gameState.gameOver) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const step = 5;
        let newX = gameState.playerX;
        let newY = gameState.playerY;
        let direction: 'left' | 'right' | 'idle' = 'idle';

        switch (e.key) {
          case 'ArrowLeft':
          case 'a':
            newX = Math.max(0, gameState.playerX - step);
            direction = 'left';
            break;
          case 'ArrowRight':
          case 'd':
            newX = Math.min(90, gameState.playerX + step);
            direction = 'right';
            break;
          case 'ArrowUp':
          case 'w':
            newY = Math.max(0, gameState.playerY - step);
            break;
          case 'ArrowDown':
          case 's':
            newY = Math.min(90, gameState.playerY + step);
            break;
        }

        movePlayer(newX, newY, direction);
      };

      window.addEventListener('keydown', handleKeyDown as any);
      return () => window.removeEventListener('keydown', handleKeyDown as any);
    }
  }, [showGame, gameState.gameOver, gameState.playerX, gameState.playerY, movePlayer]);

  // Gestion de la saisie utilisateur et vérification des mots de passe
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Code de triche
      if (password === 'aaaaa') {
        toast({
          description: decodeBase64('TW9kZSB0cmljaGUgYWN0aXbDqSAhIEFjY8OocyBkaXJlY3QgYXUgbWluaS1qZXUuLi4='),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setShowGame(true);
        return;
      }

      if (!showFinalInput) {
        const currentPassword = passwords[currentStep as keyof typeof passwords];
        const decodedPassword = decodeBase64(currentPassword.value);
        
        // Comparaison avec le mot de passe saisi
        if (password === decodedPassword) {
          toast({
            description: `Mot de passe ${currentStep} valide ! Indice : ${decodeBase64(currentPassword.hint)}`,
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });

          if (currentStep === 4) {
            setShowFinalInput(true);
          } else {
            setCurrentStep(prev => prev + 1);
          }
          setPassword("");
        } else {
          toast({
            variant: "destructive",
            description: decodeBase64('TW90IGRlIHBhc3NlIGluY29ycmVjdA=='),
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setPassword("");
        }
      } else {
        // Vérification du mot de passe final
        if (password === getFinalPassword()) {
          toast({
            description: decodeBase64('TW90IGRlIHBhc3NlIGZpbmFsIHZhbGlkw6kgISBQcsOpcGFyZXotdm91cyBhdSBtaW5pIGpldS4uLg=='),
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setShowGame(true);
        } else {
          toast({
            variant: "destructive",
            description: decodeBase64('TW90IGRlIHBhc3NlIGZpbmFsIGluY29ycmVjdA=='),
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setPassword("");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>{decodeBase64('QmllbnZlbnVlIHN1ciBtYSBjb25zb2xlIHNlY3LDqHRl')}</span>
          <span className="terminal-cursor"></span>
        </div>
        
        {!showGame ? (
          !showFinalInput ? (
            <div className="mt-8">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={`Entrez le mot de passe n°${currentStep}...`}
                className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                         focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
                autoFocus
              />
            </div>
          ) : (
            <div className="mt-8">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={decodeBase64('RW50cmV6IGxlIG1vdCBkZSBwYXNzZSBmaW5hbC4uLg==')}
                className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                         focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
                autoFocus
              />
            </div>
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
          />
        )}
      </div>
    </div>
  );
};

export default Index;
