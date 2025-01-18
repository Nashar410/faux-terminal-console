import { useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';

const COLLISION_THRESHOLD = 8;

export const useCollisions = (
  gameState: GameState,
  setIsNearPolice: (near: boolean) => void,
  setShowPoliceDialog: (show: boolean) => void,
  setShowFirecrackerDialog: (show: boolean) => void,
  setShowArrestDialog: (show: boolean) => void,
  setShowBuildingDialog: (show: boolean) => void,
  handleBuildingExplosion: () => void,
) => {
  useEffect(() => {
    if (gameState.gameOver) return;

    const distanceToPolice = Math.sqrt(
      Math.pow(gameState.playerX - gameState.police.x, 2) +
      Math.pow(gameState.playerY - gameState.police.y, 2)
    );

    const distanceToFirecracker = Math.sqrt(
      Math.pow(gameState.playerX - gameState.firecracker.x, 2) +
      Math.pow(gameState.playerY - gameState.firecracker.y, 2)
    );

    const distanceToBuilding = Math.sqrt(
      Math.pow(gameState.playerX - gameState.building.x, 2) +
      Math.pow(gameState.playerY - gameState.building.y, 2)
    );

    // Collision avec le policier
    if (distanceToPolice < COLLISION_THRESHOLD) {
      setIsNearPolice(true);
      if (gameState.firecracker.collected) {
        playSound('siren');
        setShowArrestDialog(true);
      } else {
        setShowPoliceDialog(true);
      }
    } else {
      setIsNearPolice(false);
    }

    // Collision avec le pétard
    if (!gameState.firecracker.collected && distanceToFirecracker < COLLISION_THRESHOLD) {
      setShowFirecrackerDialog(true);
    }

    // Collision avec le bâtiment
    if (gameState.firecracker.collected && distanceToBuilding < COLLISION_THRESHOLD) {
      setShowBuildingDialog(true);
      handleBuildingExplosion();
    }
  }, [
    gameState.playerX,
    gameState.playerY,
    gameState.firecracker.collected,
    gameState.gameOver,
    setIsNearPolice,
    setShowPoliceDialog,
    setShowFirecrackerDialog,
    setShowArrestDialog,
    setShowBuildingDialog,
    handleBuildingExplosion,
  ]);
};