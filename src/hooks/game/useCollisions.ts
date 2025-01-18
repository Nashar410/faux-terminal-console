import { useEffect } from 'react';
import { GameState } from '@/types/game';
import { playSound } from '@/assets/gameSounds';

const POLICE_THRESHOLD = 15;
const FIRECRACKER_THRESHOLD = 8; // Réduit de 15 à 8 pour une hitbox plus précise
const BUILDING_THRESHOLD = 15;

export const useCollisions = (
  gameState: GameState,
  setIsNearPolice: (near: boolean) => void,
  setShowPoliceDialog: (show: boolean) => void,
  setShowFirecrackerDialog: (show: boolean) => void,
  setShowArrestDialog: (show: boolean) => void,
  setShowBuildingDialog: (show: boolean) => void,
  handleBuildingExplosion: () => void
) => {
  useEffect(() => {
    if (gameState.gameOver) return;

    const checkCollisions = () => {
      // Distance avec le policier
      const policeDistance = Math.sqrt(
        Math.pow(gameState.playerX - gameState.police.x, 2) +
        Math.pow(gameState.playerY - gameState.police.y, 2)
      );

      // Distance avec le pétard
      const firecrackerDistance = Math.sqrt(
        Math.pow(gameState.playerX - gameState.firecracker.x, 2) +
        Math.pow(gameState.playerY - gameState.firecracker.y, 2)
      );

      // Distance avec le bâtiment
      const buildingDistance = Math.sqrt(
        Math.pow(gameState.playerX - gameState.building.x, 2) +
        Math.pow(gameState.playerY - gameState.building.y, 2)
      );

      // Gestion des collisions avec le policier
      if (policeDistance < POLICE_THRESHOLD) {
        setIsNearPolice(true);
        if (gameState.firecracker.collected) {
          playSound('siren');
          setShowArrestDialog(true);
        } else {
          setShowPoliceDialog(true);
        }
      } else {
        setIsNearPolice(false);
        setShowPoliceDialog(false);
      }

      // Gestion des collisions avec le pétard
      if (!gameState.firecracker.collected && firecrackerDistance < FIRECRACKER_THRESHOLD) {
        setShowFirecrackerDialog(true);
      } else {
        setShowFirecrackerDialog(false); // Ferme la boîte de dialogue si on s'éloigne
      }

      // Gestion des collisions avec le bâtiment
      if (gameState.firecracker.collected && buildingDistance < BUILDING_THRESHOLD) {
        setShowBuildingDialog(true);
        handleBuildingExplosion();
      }
    };

    checkCollisions();
  }, [
    gameState,
    setIsNearPolice,
    setShowPoliceDialog,
    setShowFirecrackerDialog,
    setShowArrestDialog,
    setShowBuildingDialog,
    handleBuildingExplosion
  ]);
};