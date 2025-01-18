import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';

type FinalPasswordFormProps = {
  finalPasswords: {
    determinisme: string;
    dieu: string;
    mechCola: string;
    choix: string;
  };
  setFinalPasswords: (passwords: {
    determinisme: string;
    dieu: string;
    mechCola: string;
    choix: string;
  }) => void;
  onSuccess: () => void;
};

export const FinalPasswordForm = ({ 
  finalPasswords, 
  setFinalPasswords, 
  onSuccess 
}: FinalPasswordFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      finalPasswords.determinisme.toLowerCase() === 'déterminisme' &&
      finalPasswords.dieu.toLowerCase() === 'dieu' &&
      finalPasswords.mechCola.toLowerCase() === 'mech-cola' &&
      finalPasswords.choix.toLowerCase() === 'choix'
    ) {
      toast({
        description: decodeBase64(strings.console.finalPasswordValid),
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      onSuccess();
    } else {
      toast({
        variant: "destructive",
        description: decodeBase64(strings.console.finalPasswordInvalid),
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      setFinalPasswords({
        determinisme: "",
        dieu: "",
        mechCola: "",
        choix: ""
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextFieldId: string | null) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextFieldId) {
        const nextField = document.getElementById(nextFieldId);
        nextField?.focus();
      } else {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input
        id="determinisme"
        type="text"
        value={finalPasswords.determinisme}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, determinisme: e.target.value })}
        onKeyDown={(e) => handleKeyDown(e, 'dieu')}
        placeholder={strings.finalForm.placeholders.first}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2"
        autoFocus
      />
      <input
        id="dieu"
        type="text"
        value={finalPasswords.dieu}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, dieu: e.target.value })}
        onKeyDown={(e) => handleKeyDown(e, 'mechCola')}
        placeholder={strings.finalForm.placeholders.second}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2"
      />
      <input
        id="mechCola"
        type="text"
        value={finalPasswords.mechCola}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, mechCola: e.target.value })}
        onKeyDown={(e) => handleKeyDown(e, 'choix')}
        placeholder={strings.finalForm.placeholders.third}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2"
      />
      <input
        id="choix"
        type="text"
        value={finalPasswords.choix}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, choix: e.target.value })}
        onKeyDown={(e) => handleKeyDown(e, null)}
        placeholder={strings.finalForm.placeholders.fourth}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2"
      />
      <button
        type="submit"
        className="w-full bg-terminal-text text-terminal-bg font-mono py-2 hover:bg-opacity-90 
                 transition-opacity focus:outline-none focus:ring-2 focus:ring-terminal-text"
      >
        {strings.finalForm.submit}
      </button>
    </form>
  );
};