import { useState, useEffect } from 'react';
import { Position } from '@/types/game';

const MIN_POLICE_Y = 10;
const MAX_POLICE_Y = 50;
const POLICE_SPEED = 0.5;

export const usePoliceMovement = (hasStarted: boolean, gameOver: boolean) => {
  const [police, setPolice] = useState<{
    x: number;
    y: number;
    frame: number;
    movingDown: boolean;
  }>({ x: 50, y: 10, frame: 0, movingDown: true });

  useEffect(() => {
    if (!hasStarted || gameOver) return;

    const policeAnimation = setInterval(() => {
      setPolice(prev => {
        let newY = prev.y;
        if (prev.movingDown) {
          newY = Math.min(MAX_POLICE_Y, prev.y + POLICE_SPEED);
          if (newY >= MAX_POLICE_Y) {
            return {
              ...prev,
              y: newY,
              movingDown: false,
              frame: prev.frame === 0 ? 1 : 0
            };
          }
        } else {
          newY = Math.max(MIN_POLICE_Y, prev.y - POLICE_SPEED);
          if (newY <= MIN_POLICE_Y) {
            return {
              ...prev,
              y: newY,
              movingDown: true,
              frame: prev.frame === 0 ? 1 : 0
            };
          }
        }
        return {
          ...prev,
          y: newY,
          frame: prev.frame === 0 ? 1 : 0
        };
      });
    }, 50);

    return () => clearInterval(policeAnimation);
  }, [hasStarted, gameOver]);

  return police;
};