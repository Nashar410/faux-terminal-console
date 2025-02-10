import React, { useState, useCallback, memo } from 'react';
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

type PasswordState = {
  determinisme: string;
  dieu: string;
  mechCola: string;
  choix: string;
};

const InputWithCheck = memo(({ 
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
}) => {
  return (
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
});

InputWithCheck.displayName = 'InputWithCheck';

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

  const cleanAndValidate = useCallback((input: string, target: string) => {
    return input.toLowerCase().trim() === decodeBase64(target).toLowerCase().trim();
  }, []);

  const validatePasswords = useCallback(() => {
    const newValidPasswords = {
      determinisme: cleanAndValidate(finalPasswords.determinisme, strings.finalForm.hints.determinisme),
      dieu: cleanAndValidate(finalPasswords.dieu, strings.finalForm.hints.dieu),
      mechCola: cleanAndValidate(finalPasswords.mechCola, strings.finalForm.hints.mechCola),
      choix: cleanAndValidate(finalPasswords.choix, strings.finalForm.hints.choix)
    };
    setValidPasswords(newValidPasswords);
    return Object.values(newValidPasswords).every(valid => valid);
  }, [finalPasswords, cleanAndValidate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePasswords()) {
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

  const handleChange = useCallback((field: keyof PasswordState, value: string) => {
    setFinalPasswords({
      ...finalPasswords,
      [field]: value
    });
  }, [setFinalPasswords, finalPasswords]);

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
        value={finalPasswords.choix}
        onChange={(e) => handleChange('mechCola', e.target.value)}
        placeholder={strings.finalForm.placeholders.third}
        isValid={validPasswords.choix}
      />
      <InputWithCheck
        id="choix"
        value={finalPasswords.mechCola}
        onChange={(e) => handleChange('choix', e.target.value)}
        placeholder={strings.finalForm.placeholders.fourth}
        isValid={validPasswords.mechCola}
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
