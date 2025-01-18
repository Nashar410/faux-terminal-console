import React from 'react';
import { sprites } from '@/assets/gameSprites';

type FirecrackerPreviewProps = {
  partsVisible: number;
};

export const FirecrackerPreview: React.FC<FirecrackerPreviewProps> = ({ partsVisible }) => {
  const FirecrackerSprite = sprites.firecracker;
  
  return (
    <div className="flex items-center justify-center">
      {partsVisible > 0 && (
        <div style={{ transform: 'scale(4)', transformOrigin: 'center' }}>
          <FirecrackerSprite />
        </div>
      )}
    </div>
  );
};