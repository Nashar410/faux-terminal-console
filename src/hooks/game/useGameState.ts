import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';
import {
  INITIAL_PLAYER_POSITION,
  INITIAL_POLICE_POSITION,
  INITIAL_FIRECRACKER_POSITION,
  INITIAL_BUILDING_POSITION,
  GAME_DURATION
} from '@/constants/gameConstants';

const createInitialState = (): GameState => ({
  playerX: INITIAL_PLAYER_POSITION.x,
  playerY: INITIAL_PLAYER_POSITION.y,
  playerDirection: 'idle',
  currentFrame: 0,
  firecracker: {
    x: INITIAL_FIRECRACKER_POSITION.x,
    y: INITIAL_FIRECRACKER_POSITION.y,
    collected: false
  },
  police: {
    x: INITIAL_POLICE_POSITION.x,
    y: INITIAL_POLICE_POSITION.y,
    frame: 0,
    movingDown: true
  },
  building: {
    x: INITIAL_BUILDING_POSITION.x,
    y: INITIAL_BUILDING_POSITION.y
  },
  timeLeft: GAME_DURATION,
  gameOver: false,
  message: '',
  endingMessage: undefined
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
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
      endingMessage: decodeBase64(strings.game.endings["1"])
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
        endingMessage: decodeBase64(strings.game.endings["2"])
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
        endingMessage: decodeBase64(strings.game.endings["3"])
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