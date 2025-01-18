import React from 'react';
import { PoliceDialog } from '../PoliceDialog';
import { FirecrackerDialog } from '../FirecrackerDialog';
import { ArrestDialog } from '../ArrestDialog';
import { BuildingDialog } from '../BuildingDialog';
import { INITIAL_PLAYER_POSITION } from '@/constants/gameConstants';

interface DialogManagerProps {
  showPoliceDialog: boolean;
  setShowPoliceDialog: (show: boolean) => void;
  showFirecrackerDialog: boolean;
  setShowFirecrackerDialog: (show: boolean) => void;
  showArrestDialog: boolean;
  setShowArrestDialog: (show: boolean) => void;
  showBuildingDialog: boolean;
  setShowBuildingDialog: (show: boolean) => void;
  handlePoliceConfirm: () => void;
  handleFirecrackerConfirm: () => void;
  movePlayer: (x: number, y: number, direction: 'left' | 'right' | 'idle') => void;
}

export const DialogManager: React.FC<DialogManagerProps> = ({
  showPoliceDialog,
  setShowPoliceDialog,
  showFirecrackerDialog,
  setShowFirecrackerDialog,
  showArrestDialog,
  setShowArrestDialog,
  showBuildingDialog,
  setShowBuildingDialog,
  handlePoliceConfirm,
  handleFirecrackerConfirm,
  movePlayer,
}) => {
  const resetPlayerPosition = () => {
    movePlayer(INITIAL_PLAYER_POSITION.x, INITIAL_PLAYER_POSITION.y, 'idle');
  };

  return (
    <>
      <PoliceDialog
        open={showPoliceDialog}
        onOpenChange={setShowPoliceDialog}
        onConfirm={handlePoliceConfirm}
        movePlayerAway={resetPlayerPosition}
      />

      <FirecrackerDialog
        open={showFirecrackerDialog}
        onOpenChange={setShowFirecrackerDialog}
        onConfirm={handleFirecrackerConfirm}
        movePlayerAway={resetPlayerPosition}
      />

      <ArrestDialog
        open={showArrestDialog}
        onOpenChange={setShowArrestDialog}
      />

      <BuildingDialog
        open={showBuildingDialog}
        onOpenChange={setShowBuildingDialog}
      />
    </>
  );
};