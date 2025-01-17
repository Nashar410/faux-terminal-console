import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';
import { useToast } from '@/hooks/use-toast';

const INITIAL_STATE: GameState = {
  playerX: 10,
  playerY: 10,
  playerDirection: 'idle',
  currentFrame: 0,
  firecracker: { x: 30, y: 30, collected: false },
  police: { x: 50, y: 10, frame: 0, movingDown: true },
  building: { x: 70, y: 10 },
  timeLeft: 30,
  gameOver: false,
  message: ""
};

const MIN_POLICE_Y = 10;
const MAX_POLICE_Y = 50;
const POLICE_SPEED = 0.5;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isNearPolice, setIsNearPolice] = useState(false);
  const [isTimeRunningOut, setIsTimeRunningOut] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPoliceDialog, setShowPoliceDialog] = useState(false);
  const [showFirecrackerDialog, setShowFirecrackerDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (hasStarted && !gameState.gameOver) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 0) {
            clearInterval(timer);
            playSound('siren');
            return {
              ...prev,
              gameOver: true,
              message: "Vous vous êtes fait arrêter !"
            };
          }
          
          setIsTimeRunningOut(prev.timeLeft <= 10);
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);

      // Animation du policier
      const policeAnimation = setInterval(() => {
        setGameState(prev => {
          let newY = prev.police.y;
          if (prev.police.movingDown) {
            newY = Math.min(MAX_POLICE_Y, prev.police.y + POLICE_SPEED);
            if (newY >= MAX_POLICE_Y) {
              return {
                ...prev,
                police: { ...prev.police, y: newY, movingDown: false, frame: prev.police.frame === 0 ? 1 : 0 }
              };
            }
          } else {
            newY = Math.max(MIN_POLICE_Y, prev.police.y - POLICE_SPEED);
            if (newY <= MIN_POLICE_Y) {
              return {
                ...prev,
                police: { ...prev.police, y: newY, movingDown: true, frame: prev.police.frame === 0 ? 1 : 0 }
              };
            }
          }
          return {
            ...prev,
            police: { ...prev.police, y: newY, frame: prev.police.frame === 0 ? 1 : 0 }
          };
        });
      }, 50);

      // Animation du joueur
      const playerAnimation = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          currentFrame: (prev.currentFrame + 1) % 2
        }));
      }, 500);

      return () => {
        clearInterval(timer);
        clearInterval(policeAnimation);
        clearInterval(playerAnimation);
      };
    }
  }, [hasStarted, gameState.gameOver]);

  const movePlayer = (newX: number, newY: number, direction: 'left' | 'right' | 'idle') => {
    if (!hasStarted) {
      setHasStarted(true);
      playSound('start');
    }

    const distance = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    setGameState(prev => {
      const distanceToPolice = distance(newX, newY, prev.police.x, prev.police.y);
      setIsNearPolice(distanceToPolice < 20);

      if (distanceToPolice < 10) {
        if (!showPoliceDialog) {
          setShowPoliceDialog(true);
          return prev;
        }
        return prev;
      }

      if (!prev.firecracker.collected && 
          distance(newX, newY, prev.firecracker.x, prev.firecracker.y) < 10) {
        if (!showFirecrackerDialog) {
          setShowFirecrackerDialog(true);
          return prev;
        }
        return prev;
      }

      if (prev.firecracker.collected && 
          distance(newX, newY, prev.building.x, prev.building.y) < 10) {
        setIsExploding(true);
        playSound('explosion');
        setTimeout(() => setIsExploding(false), 500);
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
        playerDirection: direction
      };
    });
  };

  const handlePoliceConfirm = () => {
    setShowPoliceDialog(false);
    playSound('siren');
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      message: "Vous vous faites arrêter !"
    }));
  };

  const handleFirecrackerConfirm = () => {
    setShowFirecrackerDialog(false);
    setGameState(prev => ({
      ...prev,
      firecracker: { ...prev.firecracker, collected: true }
    }));
    toast({
      description: "Vous avez ramassé le pétard",
      className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
    });
  };

  return {
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
    handleFirecrackerConfirm
  };
};
