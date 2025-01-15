import { useState, KeyboardEvent, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameState, setGameState] = useState({
    playerX: 10,
    playerY: 10,
    firecracker: { x: 30, y: 30, collected: false },
    police: { x: 50, y: 10 },
    building: { x: 70, y: 10 },
    timeLeft: 30,
    gameOver: false,
    message: ""
  });

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
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 0) {
            clearInterval(timer);
            return {
              ...prev,
              gameOver: true,
              message: "Vous vous êtes fait arrêter !"
            };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (gameState.gameOver) return;

        setGameState(prev => {
          let newX = prev.playerX;
          let newY = prev.playerY;
          const step = 5;

          switch (e.key) {
            case 'ArrowLeft':
            case 'a':
              newX = Math.max(0, prev.playerX - step);
              break;
            case 'ArrowRight':
            case 'd':
              newX = Math.min(90, prev.playerX + step);
              break;
            case 'ArrowUp':
            case 'w':
              newY = Math.max(0, prev.playerY - step);
              break;
            case 'ArrowDown':
            case 's':
              newY = Math.min(90, prev.playerY + step);
              break;
          }

          // Collision detection
          const distance = (x1: number, y1: number, x2: number, y2: number) => 
            Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          // Police collision
          if (distance(newX, newY, prev.police.x, prev.police.y) < 10) {
            return {
              ...prev,
              gameOver: true,
              message: "Vous vous faites arrêter !"
            };
          }

          // Firecracker collection
          if (!prev.firecracker.collected && 
              distance(newX, newY, prev.firecracker.x, prev.firecracker.y) < 10) {
            return {
              ...prev,
              playerX: newX,
              playerY: newY,
              firecracker: { ...prev.firecracker, collected: true }
            };
          }

          // Building collision with firecracker
          if (prev.firecracker.collected && 
              distance(newX, newY, prev.building.x, prev.building.y) < 10) {
            return {
              ...prev,
              gameOver: true,
              message: "Boom, vous avez tout fait exploser… défaite !"
            };
          }

          return {
            ...prev,
            playerX: newX,
            playerY: newY
          };
        });
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showGame, gameState.gameOver]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
        console.log("Mot de passe incorrect");
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
          <div className="mt-8 border border-terminal-text p-4 relative" style={{ height: '400px' }}>
            <div className="absolute top-2 right-2 text-terminal-text">
              Temps restant: {gameState.timeLeft}s
            </div>
            
            {/* Player */}
            <div 
              className="absolute w-4 h-4 bg-terminal-text"
              style={{ left: `${gameState.playerX}%`, top: `${gameState.playerY}%` }}
            >P</div>
            
            {/* Police */}
            <div 
              className="absolute w-4 h-4 text-terminal-text"
              style={{ left: `${gameState.police.x}%`, top: `${gameState.police.y}%` }}
            >👮</div>
            
            {/* Building */}
            <div 
              className="absolute w-8 h-16 text-terminal-text"
              style={{ left: `${gameState.building.x}%`, top: `${gameState.building.y}%` }}
            >🏢</div>
            
            {/* Firecracker */}
            {!gameState.firecracker.collected && (
              <div 
                className="absolute w-4 h-4 text-terminal-text"
                style={{ left: `${gameState.firecracker.x}%`, top: `${gameState.firecracker.y}%` }}
              >🧨</div>
            )}
            
            {gameState.gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-terminal-bg bg-opacity-90">
                <div className="text-terminal-text text-xl">{gameState.message}</div>
              </div>
            )}
            
            <div className="absolute bottom-2 left-2 text-terminal-text text-sm">
              Utilisez les flèches ou WASD pour vous déplacer
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;