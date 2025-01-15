import { useState, KeyboardEvent, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { sprites, playerFrames, policeFrames } from '../assets/gameSprites';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameState, setGameState] = useState({
    playerX: 10,
    playerY: 10,
    playerDirection: 'idle' as 'left' | 'right' | 'idle',
    currentFrame: 0,
    firecracker: { x: 30, y: 30, collected: false },
    police: { x: 50, y: 10, frame: 0 },
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
      // Player animation
      const playerAnimation = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          currentFrame: (prev.currentFrame + 1) % 2
        }));
      }, 200);

      // Police animation
      const policeAnimation = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          police: {
            ...prev.police,
            frame: (prev.police.frame + 1) % policeFrames.length
          }
        }));
      }, 500);

      return () => {
        clearInterval(playerAnimation);
        clearInterval(policeAnimation);
      };
    }
  }, [showGame, gameState.gameOver]);

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

      const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (gameState.gameOver) return;

        setGameState(prev => {
          let newX = prev.playerX;
          let newY = prev.playerY;
          let newDirection = prev.playerDirection;
          const step = 5;

          switch (e.key) {
            case 'ArrowLeft':
            case 'a':
              newX = Math.max(0, prev.playerX - step);
              newDirection = 'left';
              break;
            case 'ArrowRight':
            case 'd':
              newX = Math.min(90, prev.playerX + step);
              newDirection = 'right';
              break;
            case 'ArrowUp':
            case 'w':
              newY = Math.max(0, prev.playerY - step);
              break;
            case 'ArrowDown':
            case 's':
              newY = Math.min(90, prev.playerY + step);
              break;
            default:
              newDirection = 'idle';
          }

          // Collision detection
          const distance = (x1: number, y1: number, x2: number, y2: number) => 
            Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          if (distance(newX, newY, prev.police.x, prev.police.y) < 10) {
            return {
              ...prev,
              gameOver: true,
              message: "Vous vous faites arrêter !"
            };
          }

          if (!prev.firecracker.collected && 
              distance(newX, newY, prev.firecracker.x, prev.firecracker.y) < 10) {
            return {
              ...prev,
              playerX: newX,
              playerY: newY,
              playerDirection: newDirection,
              firecracker: { ...prev.firecracker, collected: true }
            };
          }

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
            playerY: newY,
            playerDirection: newDirection
          };
        });
      };

      window.addEventListener('keydown', handleKeyDown as unknown as EventListener);
      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
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
          <div className="mt-8 border-2 border-terminal-text p-4 relative bg-black/50" style={{ height: '500px', width: '100%' }}>
            <div className="absolute top-2 right-2 text-terminal-text">
              Temps restant: {gameState.timeLeft}s
            </div>
            
            {/* Player */}
            <div 
              className="absolute"
              style={{ 
                left: `${gameState.playerX}%`, 
                top: `${gameState.playerY}%`,
                width: '32px',
                height: '32px',
                backgroundImage: `url(${playerFrames[gameState.playerDirection][gameState.currentFrame]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Police */}
            <div 
              className="absolute"
              style={{ 
                left: `${gameState.police.x}%`, 
                top: `${gameState.police.y}%`,
                width: '32px',
                height: '32px',
                backgroundImage: `url(${policeFrames[gameState.police.frame]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Building */}
            <div 
              className="absolute"
              style={{ 
                left: `${gameState.building.x}%`, 
                top: `${gameState.building.y}%`,
                width: '32px',
                height: '64px',
                backgroundImage: `url(${sprites.building})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Firecracker */}
            {!gameState.firecracker.collected && (
              <div 
                className="absolute"
                style={{ 
                  left: `${gameState.firecracker.x}%`, 
                  top: `${gameState.firecracker.y}%`,
                  width: '16px',
                  height: '16px',
                  backgroundImage: `url(${sprites.firecracker})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
            
            {gameState.gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                <div className="text-terminal-text text-2xl animate-pulse">
                  {gameState.message}
                </div>
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
