import React from 'react';
import { Position } from '@/types/game';

type SpriteProps = {
  position: Position;
  sprite: () => JSX.Element;
  size?: { width: number; height: number };
  className?: string;
  scale?: number;
};

export const Sprite: React.FC<SpriteProps> = ({ 
  position, 
  sprite: SpriteComponent,
  size = { width: 32, height: 32 }, 
  className = '',
  scale = 2
}) => {
  if (typeof SpriteComponent !== 'function') {
    console.error('Sprite component received invalid sprite:', SpriteComponent);
    return null;
  }

  return (
    <div 
      className={`absolute ${className}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        width: `${size.width * scale}px`,
        height: `${size.height * scale}px`,
        transform: `translate(-${50/scale}%, -${50/scale}%)`,
      }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <SpriteComponent />
      </div>
    </div>
  );
};