import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';
import { Check } from 'lucide-react';
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
  const [validPasswords, setValidPasswords] = useState({
    determinisme: false,
    dieu: false,
    mechCola: false,
    choix: false
  });

  useEffect(() => {
    const cleanAndValidate = (input: string, target: string) => 
      input.toLowerCase().trim() === target.toLowerCase().trim();

    setValidPasswords({
      determinisme: cleanAndValidate(finalPasswords.determinisme, 'déterminisme'),
      dieu: cleanAndValidate(finalPasswords.dieu, 'dieu'),
      mechCola: cleanAndValidate(finalPasswords.mechCola, 'mech-cola'),
      choix: cleanAndValidate(finalPasswords.choix, 'choix')
    });
  }, [finalPasswords]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(validPasswords).every(valid => valid)) {
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
      setValidPasswords({
        determinisme: false,
        dieu: false,
        mechCola: false,
        choix: false
      });
    }
  };

  const handleChange = (field: keyof typeof finalPasswords, value: string) => {
    setFinalPasswords({ ...finalPasswords, [field]: value });
  };

  const InputWithCheck = ({ 
    id, 
    value, 
    onChange, 
    placeholder, 
    isValid 
  }: {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isValid: boolean;
  }) => (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                 focus:outline-none focus:ring-2 focus:ring-terminal-text px-4 py-2 pr-10"
      />
      {isValid && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Check className="h-4 w-4 text-green-500" />
        </div>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <InputWithCheck
        id="determinisme"
        value={finalPasswords.determinisme}
        onChange={(e) => handleChange('determinisme', e.target.value)}
        placeholder={strings.finalForm.placeholders.first}
        isValid={validPasswords.determinisme}
      />
      <InputWithCheck
        id="dieu"
        value={finalPasswords.dieu}
        onChange={(e) => handleChange('dieu', e.target.value)}
        placeholder={strings.finalForm.placeholders.second}
        isValid={validPasswords.dieu}
      />
      <InputWithCheck
        id="mechCola"
        value={finalPasswords.mechCola}
        onChange={(e) => handleChange('mechCola', e.target.value)}
        placeholder={strings.finalForm.placeholders.third}
        isValid={validPasswords.mechCola}
      />
      <InputWithCheck
        id="choix"
        value={finalPasswords.choix}
        onChange={(e) => handleChange('choix', e.target.value)}
        placeholder={strings.finalForm.placeholders.fourth}
        isValid={validPasswords.choix}
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