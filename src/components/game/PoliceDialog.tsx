import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PoliceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  movePlayerAway: () => void;
}

export const PoliceDialog: React.FC<PoliceDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  movePlayerAway,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      
      if (e.key === 'Escape') {
        onOpenChange(false);
        movePlayerAway();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [open, onOpenChange, movePlayerAway]);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    movePlayerAway();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text text-terminal-text">
        <DialogDescription className="text-terminal-text text-lg">
          Vous voulez vous dénoncer aux policiers ? (OUI / NON)
        </DialogDescription>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={handleConfirm}
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow focus:ring-2 focus:ring-terminal-text focus:outline-none"
            autoFocus
          >
            OUI
          </Button>
          <Button
            onClick={handleCancel}
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow focus:ring-2 focus:ring-terminal-text focus:outline-none"
          >
            NON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};