import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';

const INITIAL_STATE: GameState = {
  playerX: 12,
  playerY: 50,
  playerDirection: 'idle',
  currentFrame: 0,
  firecracker: {
    x: 24,
    y: 20,
    collected: false
  },
  police: {
    x: 48,
    y: 40,
    frame: 0,
    movingDown: true
  },
  building: {
    x: 80,
    y: 80
  },
  timeLeft: 30,
  gameOver: false,
  message: '',
  endingMessage: undefined
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isNearPolice, setIsNearPolice] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showPoliceDialog, setShowPoliceDialog] = useState(false);
  const [showFirecrackerDialog, setShowFirecrackerDialog] = useState(false);
  const [showArrestDialog, setShowArrestDialog] = useState(false);
  const [showBuildingDialog, setShowBuildingDialog] = useState(false);

  const movePlayer = (newX: number, newY: number, direction: 'left' | 'right' | 'idle') => {
    if (!gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        playerX: newX,
        playerY: newY,
        playerDirection: direction,
        currentFrame: (prev.currentFrame + 1) % 2
      }));
    }
  };

  const handlePoliceConfirm = () => {
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      message: "Vous vous êtes rendu aux forces de l'ordre...",
      endingMessage: 'nord'
    }));
    playSound('siren');
  };

  const handleFirecrackerConfirm = () => {
    setGameState(prev => ({
      ...prev,
      firecracker: {
        ...prev.firecracker,
        collected: true
      }
    }));
  };

  const handleBuildingExplosion = () => {
    setIsExploding(true);
    playSound('explosion');
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        message: "Vous avez fait exploser le bâtiment !",
        endingMessage: 'est'
      }));
    }, 1000);
  };

  // Effet pour gérer l'arrestation
  useEffect(() => {
    if (showArrestDialog) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        message: "Vous vous êtes fait arrêter avec le pétard...",
        endingMessage: 'sud'
      }));
    }
  }, [showArrestDialog]);

  return {
    gameState,
    setGameState,
    isNearPolice,
    setIsNearPolice,
    isExploding,
    setIsExploding,
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
    movePlayer,
    handleBuildingExplosion
  };
};