import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';

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
        description: decodeBase64('TW90IGRlIHBhc3NlIGZpbmFsIHZhbGlkw6kgISBQcsOpcGFyZXotdm91cyBhdSBtaW5pIGpldS4uLg=='),
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      onSuccess();
    } else {
      toast({
        variant: "destructive",
        description: decodeBase64('TW90IGRlIHBhc3NlIGZpbmFsIGluY29ycmVjdA=='),
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

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input
        type="text"
        value={finalPasswords.determinisme}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, determinisme: e.target.value })}
        placeholder="Premier indice..."
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
      />
      <input
        type="text"
        value={finalPasswords.dieu}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, dieu: e.target.value })}
        placeholder="Deuxième indice..."
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
      />
      <input
        type="text"
        value={finalPasswords.mechCola}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, mechCola: e.target.value })}
        placeholder="Troisième indice..."
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
      />
      <input
        type="text"
        value={finalPasswords.choix}
        onChange={(e) => setFinalPasswords({ ...finalPasswords, choix: e.target.value })}
        placeholder="Quatrième indice..."
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
      />
      <button
        type="submit"
        className="w-full bg-terminal-text text-terminal-bg font-mono py-2 hover:bg-opacity-90 transition-opacity"
      >
        Valider
      </button>
    </form>
  );
};