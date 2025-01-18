import { useState } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';

const INITIAL_STATE: GameState = {
  playerX: 20,  // Déplacé à gauche
  playerY: 80,
  playerDirection: 'idle',
  currentFrame: 0,
  firecracker: {
    x: 40,  // Placé après le joueur
    y: 50,
    collected: false
  },
  police: {
    x: 60,  // Placé au milieu
    y: 20,
    frame: 0,
    movingDown: true
  },
  building: {
    x: 80,  // Placé à droite
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
      message: "Vous vous êtes rendu...",
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