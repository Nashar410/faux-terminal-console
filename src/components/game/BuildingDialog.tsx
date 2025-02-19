import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import strings from '@/data/strings.json';

type BuildingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BuildingDialog = ({ open, onOpenChange }: BuildingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-terminal-bg border-terminal-text">
        <DialogDescription className="text-terminal-text text-center">
          {strings.game.dialogs.building.message}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};