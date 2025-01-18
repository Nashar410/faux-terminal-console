import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import strings from '@/data/strings.json';

interface FirecrackerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const FirecrackerDialog: React.FC<FirecrackerDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open) return;
      
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [open, onOpenChange]);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);  // Ferme la fenêtre après confirmation
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text text-terminal-text">
        <DialogTitle className="text-terminal-text">{strings.game.dialogs.firecracker.title}</DialogTitle>
        <DialogDescription className="text-terminal-text text-lg">
          {strings.game.dialogs.firecracker.question}
        </DialogDescription>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={handleConfirm}  // Utilise le nouveau handler
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow focus:ring-2 focus:ring-terminal-text focus:outline-none"
            autoFocus
          >
            OUI
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow focus:ring-2 focus:ring-terminal-text focus:outline-none"
          >
            NON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};