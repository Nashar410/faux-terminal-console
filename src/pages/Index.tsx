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

  // Structure contenant les mots de passe encodés en base64
  const passwords = {
    1: { 
      value: 'YkBzMWwxYw==',     // b@s1l1c
      hint: ''
    },
    2: { 
      value: 'OTI6ODc=',         // 92:87
      hint: ''
    },
    3: { 
      value: btoa(encodeURIComponent('49crédits')), // Encodage correct avec gestion des accents
      hint: ''
    },
    4: { 
      value: 'OHVyMWRAbg==',     // 8ur1d@n
      hint: ''
    }
  };

  // Fonction de décodage base64 avec gestion des caractères spéciaux
  const decodeBase64 = (str: string): string => {
    try {
      return decodeURIComponent(atob(str));
    } catch (e) {
      console.error('Erreur de décodage base64:', e);
      return '';
    }
  };

  // Construction du mot de passe final à partir de la concaténation des mots de passe
  const getFinalPassword = () => {
    return Object.values(passwords)
      .map(p => decodeBase64(p.value))
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
      // Nettoyage de la saisie (suppression des espaces)
      const cleanedPassword = password.replace(/\s+/g, '');
      
      // Code de triche
      if (cleanedPassword.toLowerCase() === 'aaaaa123!') {
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
        
        // Comparaison avec le mot de passe saisi (insensible à la casse, sans espaces)
        if (cleanedPassword.toLowerCase() === decodedPassword.toLowerCase()) {
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
        if (cleanedPassword.toLowerCase() === getFinalPassword().toLowerCase()) {
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

  // ... keep existing code (render JSX)

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
