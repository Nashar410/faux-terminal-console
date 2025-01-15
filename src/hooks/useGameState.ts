import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';

const INITIAL_STATE: GameState = {
  playerX: 10,
  playerY: 10,
  playerDirection: 'idle',
  currentFrame: 0,
  firecracker: { x: 30, y: 30, collected: false },
  police: { x: 50, y: 10, frame: 0 },
  building: { x: 70, y: 10 },
  timeLeft: 30,
  gameOver: false,
  message: ""
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isNearPolice, setIsNearPolice] = useState(false);
  const [isTimeRunningOut, setIsTimeRunningOut] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasPlayerMoved, setHasPlayerMoved] = useState(false);

  // Effet pour démarrer le jeu après 5 secondes d'inactivité
  useEffect(() => {
    if (!hasStarted) {
      const inactivityTimer = setTimeout(() => {
        if (!hasPlayerMoved) {
          playSound('start');
          setHasStarted(true);
        }
      }, 5000);

      return () => clearTimeout(inactivityTimer);
    }
  }, [hasStarted, hasPlayerMoved]);

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

      // Animation du policier (ralentie)
      const policeAnimation = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          police: { ...prev.police, frame: prev.police.frame === 0 ? 1 : 0 }
        }));
      }, 1000);

      // Animation du joueur (ralentie)
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
    // Démarrer le jeu au premier mouvement si ce n'est pas déjà fait
    if (!hasStarted && !hasPlayerMoved) {
      setHasPlayerMoved(true);
      setHasStarted(true);
      playSound('start');
    }

    const distance = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    setGameState(prev => {
      const distanceToPolice = distance(newX, newY, prev.police.x, prev.police.y);
      setIsNearPolice(distanceToPolice < 20);

      if (distanceToPolice < 10) {
        playSound('siren');
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
          playerDirection: direction,
          firecracker: { ...prev.firecracker, collected: true }
        };
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

  return {
    gameState,
    isNearPolice,
    isTimeRunningOut,
    isExploding,
    movePlayer
  };
};