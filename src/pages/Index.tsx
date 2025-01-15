import { useState, KeyboardEvent } from 'react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showFinalInput, setShowFinalInput] = useState(false);
  const { toast } = useToast();

  const passwords = {
    1: { value: 'secret1', hint: 'FLEUR' },
    2: { value: 'secret2', hint: 'LUNE' },
    3: { value: 'secret3', hint: 'COLLINE' },
    4: { value: 'secret4', hint: 'AIGLE' },
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!showFinalInput && passwords[currentStep as keyof typeof passwords].value === password) {
        // Correct password for current step
        toast({
          description: `Mot de passe ${currentStep} valide ! Indice : ${passwords[currentStep as keyof typeof passwords].hint}`,
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });

        if (currentStep === 4) {
          setShowFinalInput(true);
        } else {
          setCurrentStep(prev => prev + 1);
        }
        setPassword("");
      } else if (showFinalInput) {
        // Handle final password
        toast({
          variant: "destructive",
          description: "Mot de passe final incorrect",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setPassword("");
      } else {
        // Incorrect password
        console.log("Mot de passe incorrect");
        toast({
          variant: "destructive",
          description: "Mot de passe incorrect",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>Bienvenue sur ma console secrète</span>
          <span className="terminal-cursor"></span>
        </div>
        
        {!showFinalInput ? (
          <div className="mt-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Entrez le mot de passe n°${currentStep}...`}
              className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                       focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
              autoFocus
            />
          </div>
        ) : (
          <div className="mt-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Entrez le mot de passe final..."
              className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                       focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;