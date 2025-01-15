import { useState, KeyboardEvent } from 'react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { toast } = useToast();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (password === 'secret1') {
        setIsPasswordValid(true);
        toast({
          description: "Mot de passe valide ! Indice : FLEUR",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
      } else {
        console.log("Mot de passe incorrect");
        setPassword("");
        toast({
          variant: "destructive",
          description: "Mot de passe incorrect",
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
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
        
        {!isPasswordValid && (
          <div className="mt-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Entrez le mot de passe..."
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