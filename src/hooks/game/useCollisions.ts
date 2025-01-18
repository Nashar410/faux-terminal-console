import { useState } from 'react';
import { Position } from '@/types/game';
import { playSound } from '@/assets/gameSounds';
import { useToast } from '@/hooks/use-toast';

export const useCollisions = () => {
  const [isNearPolice, setIsNearPolice] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const { toast } = useToast();

  const checkCollisions = (
    playerPos: Position,
    policePos: Position,
    buildingPos: Position,
    firecrackerPos: Position & { collected: boolean }
  ) => {
    const distance = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    const distanceToPolice = distance(playerPos.x, playerPos.y, policePos.x, policePos.y);
    const distanceToBuilding = distance(playerPos.x, playerPos.y, buildingPos.x, buildingPos.y);
    
    setIsNearPolice(distanceToPolice < 20);

    const collisions = {
      withPolice: distanceToPolice < 10,
      withBuilding: distanceToBuilding < 10,
      withFirecracker: !firecrackerPos.collected && 
        distance(playerPos.x, playerPos.y, firecrackerPos.x, firecrackerPos.y) < 10
    };

    return collisions;
  };

  const handleExplosion = () => {
    setIsExploding(true);
    playSound('explosion');
    setTimeout(() => setIsExploding(false), 500);
  };

  const showFirecrackerCollectedToast = () => {
    toast({
      description: "Vous avez ramassé le pétard",
      className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
    });
  };

  return {
    isNearPolice,
    isExploding,
    checkCollisions,
    handleExplosion,
    showFirecrackerCollectedToast
  };
};