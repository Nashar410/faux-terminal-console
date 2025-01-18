import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text text-terminal-text">
        <DialogTitle className="text-terminal-text">Pétard trouvé</DialogTitle>
        <DialogDescription className="text-terminal-text text-lg">
          Voulez-vous prendre le pétard ? (OUI / NON)
        </DialogDescription>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={onConfirm}
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