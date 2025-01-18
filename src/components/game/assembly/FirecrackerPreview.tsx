import React from 'react';
import { Base } from './firecrackerParts/Base';
import { Core } from './firecrackerParts/Core';
import { Fuse } from './firecrackerParts/Fuse';

type FirecrackerPreviewProps = {
  partsVisible: number;
};

export const FirecrackerPreview: React.FC<FirecrackerPreviewProps> = ({ partsVisible }) => {
  return (
    <div className="flex items-center justify-center">
      {partsVisible > 0 && (
        <div style={{ transform: 'scale(4)', transformOrigin: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            {partsVisible >= 1 && <Base />}
            {partsVisible >= 2 && <Core />}
            {partsVisible >= 3 && <Fuse />}
          </svg>
        </div>
      )}
    </div>
  );
};