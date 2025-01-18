import { useState, useEffect } from 'react';

export const usePlayerAnimation = (hasStarted: boolean, gameOver: boolean) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [playerDirection, setPlayerDirection] = useState<'left' | 'right' | 'idle'>('idle');

  useEffect(() => {
    if (!hasStarted || gameOver) return;

    const playerAnimation = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 2);
    }, 500);

    return () => clearInterval(playerAnimation);
  }, [hasStarted, gameOver]);

  return { currentFrame, playerDirection, setPlayerDirection };
};