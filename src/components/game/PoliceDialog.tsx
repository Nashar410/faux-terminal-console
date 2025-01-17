import React from 'react';
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
}

export const PoliceDialog: React.FC<PoliceDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text text-terminal-text">
        <DialogDescription className="text-terminal-text text-lg">
          Vous voulez vous dénoncer aux policiers ? (OUI / NON)
        </DialogDescription>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={onConfirm}
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow"
          >
            OUI
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-terminal-text text-terminal-bg hover:bg-terminal-glow"
          >
            NON
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};