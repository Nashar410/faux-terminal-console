import { useState, useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';
import { useGameTimer } from './game/useGameTimer';
import { usePoliceMovement } from './game/usePoliceMovement';
import { usePlayerAnimation } from './game/usePlayerAnimation';
import { useCollisions } from './game/useCollisions';

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
  message: "",
  endingMessage: undefined
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPoliceDialog, setShowPoliceDialog] = useState(false);
  const [showFirecrackerDialog, setShowFirecrackerDialog] = useState(false);
  const [showArrestDialog, setShowArrestDialog] = useState(false);
  const [showBuildingDialog, setShowBuildingDialog] = useState(false);

  const { timeLeft, isTimeRunningOut } = useGameTimer(hasStarted, gameState.gameOver);
  const police = usePoliceMovement(hasStarted, gameState.gameOver);
  const { currentFrame, playerDirection, setPlayerDirection } = usePlayerAnimation(hasStarted, gameState.gameOver);
  const { 
    isNearPolice, 
    isExploding,
    checkCollisions,
    handleExplosion,
    showFirecrackerCollectedToast
  } = useCollisions();

  useEffect(() => {
    if (hasStarted && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        timeLeft,
        police,
        currentFrame
      }));
    }
  }, [hasStarted, timeLeft, police, currentFrame, gameState.gameOver]);

  useEffect(() => {
    if (hasStarted && timeLeft <= 0 && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        message: "Temps écoulé !",
        endingMessage: "ouest"
      }));
    }
  }, [hasStarted, timeLeft, gameState.gameOver]);

  const startGame = () => {
    setHasStarted(true);
    setGameState(INITIAL_STATE);
    playSound('start');
  };

  const movePlayer = (newX: number, newY: number, direction: 'left' | 'right' | 'idle') => {
    if (!hasStarted) {
      startGame();
    }

    if (gameState.gameOver) return;

    const collisions = checkCollisions(
      { x: newX, y: newY },
      { x: police.x, y: police.y },
      gameState.building,
      gameState.firecracker
    );

    if (collisions.withPolice) {
      if (gameState.firecracker.collected) {
        setShowArrestDialog(true);
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            gameOver: true,
            message: "Vous vous êtes fait arrêter avec le pétard !",
            endingMessage: "sud"
          }));
        }, 2000);
        return;
      } else if (!showPoliceDialog) {
        setShowPoliceDialog(true);
        return;
      }
      return;
    }

    if (collisions.withFirecracker && !showFirecrackerDialog) {
      setShowFirecrackerDialog(true);
      return;
    }

    if (collisions.withBuilding) {
      if (gameState.firecracker.collected) {
        handleExplosion();
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          message: "Boom, vous avez tout fait exploser…",
          endingMessage: "est"
        }));
      } else if (!showBuildingDialog) {
        setShowBuildingDialog(true);
        setTimeout(() => setShowBuildingDialog(false), 5000);
      }
      return;
    }

    setPlayerDirection(direction);
    setGameState(prev => ({
      ...prev,
      playerX: newX,
      playerY: newY,
      playerDirection: direction
    }));
  };

  const handlePoliceConfirm = () => {
    setShowPoliceDialog(false);
    playSound('siren');
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      message: "Vous vous êtes dénoncé aux policiers !",
      endingMessage: "nord"
    }));
  };

  const handleFirecrackerConfirm = () => {
    setShowFirecrackerDialog(false);
    setGameState(prev => ({
      ...prev,
      firecracker: { ...prev.firecracker, collected: true }
    }));
    showFirecrackerCollectedToast();
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
    handleFirecrackerConfirm,
    showArrestDialog,
    setShowArrestDialog,
    showBuildingDialog,
    setShowBuildingDialog,
    startGame
  };
};