import { useState, useEffect } from 'react';
import { playSound } from '@/assets/gameSounds';

export const useGameTimer = (hasStarted: boolean, gameOver: boolean) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeRunningOut, setIsTimeRunningOut] = useState(false);

  useEffect(() => {
    if (!hasStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          playSound('siren');
          return 0;
        }
        
        setIsTimeRunningOut(prev <= 10);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, gameOver]);

  return { timeLeft, isTimeRunningOut };
};