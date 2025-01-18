import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import strings from '@/data/strings.json';

interface ArrestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ArrestDialog: React.FC<ArrestDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text text-terminal-text">
        <DialogDescription className="text-terminal-text text-lg">
          {strings.game.dialogs.police.arrest}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};