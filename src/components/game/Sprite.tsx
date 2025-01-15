import React from 'react';
import { Position } from '@/types/game';

type SpriteProps = {
  position: Position;
  sprite: () => JSX.Element;
  size?: { width: number; height: number };
  className?: string;
};

export const Sprite: React.FC<SpriteProps> = ({ 
  position, 
  sprite,
  size = { width: 32, height: 32 }, 
  className = '' 
}) => {
  return (
    <div 
      className={`absolute ${className}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {sprite()}
    </div>
  );
};