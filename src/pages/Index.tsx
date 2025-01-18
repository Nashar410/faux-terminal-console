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

  const passwords = {
    1: { value: 'secret1', hint: 'FLEUR' },
    2: { value: 'secret2', hint: 'LUNE' },
    3: { value: 'secret3', hint: 'COLLINE' },
    4: { value: 'secret4', hint: 'AIGLE' },
  };

  const getFinalPassword = () => {
    return Object.values(passwords)
      .map(p => p.hint)
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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Cheat code
      if (password === 'aaaaa') {
        toast({
          description: "Mode triche activé ! Accès direct au mini-jeu...",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setShowGame(true);
        return;
      }

      if (!showFinalInput && passwords[currentStep as keyof typeof passwords].value === password) {
        toast({
          description: `Mot de passe ${currentStep} valide ! Indice : ${passwords[currentStep as keyof typeof passwords].hint}`,
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });

        if (currentStep === 4) {
          setShowFinalInput(true);
        } else {
          setCurrentStep(prev => prev + 1);
        }
        setPassword("");
      } else if (showFinalInput) {
        if (password === getFinalPassword()) {
          toast({
            description: "Mot de passe final validé ! Préparez-vous au mini jeu...",
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setShowGame(true);
        } else {
          toast({
            variant: "destructive",
            description: "Mot de passe final incorrect",
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setPassword("");
        }
      } else {
        toast({
          variant: "destructive",
          description: "Mot de passe incorrect",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setPassword("");
      }
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
                placeholder="Entrez le mot de passe final..."
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