import { useState, useEffect, KeyboardEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GameScreen } from '@/components/game/GameScreen';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [password, setPassword] = useState("");
  const [showFinalInput, setShowFinalInput] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [finalPasswords, setFinalPasswords] = useState({
    determinisme: "",
    dieu: "",
    mechCola: "",
    choix: ""
  });
  
  const { 
    gameState, 
    isNearPolice, 
    isTimeRunningOut, 
    isExploding, 
    movePlayer,
    showPoliceDialog,
    setShowPoliceDialog,
    handlePoliceConfirm,
    showFirecrackerDialog,
    setShowFirecrackerDialog,
    handleFirecrackerConfirm,
    showArrestDialog,
    setShowArrestDialog,
    startGame
  } = useGameState();

  const { toast } = useToast();

  // Structure contenant les mots de passe encodés en base64
  const passwords = {
    1: { 
      value: 'YkBzMWwxYw==',     // b@s1l1c
      hint: 'déterminisme'
    },
    2: { 
      value: 'OTI6ODc=',         // 92:87
      hint: 'dieu'
    },
    3: { 
      value: btoa(unescape(encodeURIComponent('49crédits'))), 
      hint: 'Mech-Cola'
    },
    4: { 
      value: 'OHVyMWRAbg==',     // 8ur1d@n
      hint: 'choix'
    }
  };

  // Démarrer le jeu quand showGame devient true
  useEffect(() => {
    if (showGame) {
      startGame();
    }
  }, [showGame]);

  // Gestion des touches pour le mouvement du joueur
  useEffect(() => {
    if (!showGame) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const speed = 2;
      let newX = gameState.playerX;
      let newY = gameState.playerY;
      let direction: 'left' | 'right' | 'idle' = 'idle';

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = Math.max(0, gameState.playerX - speed);
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = Math.min(100, gameState.playerX + speed);
          direction = 'right';
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = Math.max(0, gameState.playerY - speed);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = Math.min(100, gameState.playerY + speed);
          break;
      }

      if (newX !== gameState.playerX || newY !== gameState.playerY) {
        movePlayer(newX, newY, direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGame, gameState.playerX, gameState.playerY, movePlayer]);

  // Fonction de décodage base64 avec gestion des caractères spéciaux
  const decodeBase64 = (str: string): string => {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      console.error('Erreur de décodage base64:', e);
      return '';
    }
  };

  // Gestion de la saisie utilisateur et vérification des mots de passe
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Nettoyage de la saisie (suppression des espaces)
      const cleanedPassword = password.replace(/\s+/g, '');
      
      // Code de triche
      if (cleanedPassword.toLowerCase() === 'aaaaa123!') {
        toast({
          description: decodeBase64('TW9kZSB0cmljaGUgYWN0aXbDqSAhIEFjY8OocyBkaXJlY3QgYXUgbWluaS1qZXUuLi4='),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setShowGame(true);
        return;
      }

      if (!showFinalInput) {
        const currentPassword = passwords[currentStep as keyof typeof passwords];
        const decodedPassword = decodeBase64(currentPassword.value);
        
        // Comparaison avec le mot de passe saisi (insensible à la casse, sans espaces)
        if (cleanedPassword.toLowerCase() === decodedPassword.toLowerCase()) {
          toast({
            description: `Mot de passe ${currentStep} valide ! Indice : ${currentPassword.hint}`,
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });

          if (currentStep === 4) {
            setShowFinalInput(true);
          } else {
            setCurrentStep(prev => prev + 1);
          }
          setPassword("");
        } else {
          toast({
            variant: "destructive",
            description: decodeBase64('TW90IGRlIHBhc3NlIGluY29ycmVjdA=='),
            className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
          });
          setPassword("");
        }
      }
    }
  };

  const handleFinalPasswordSubmit = (e: React.FormEvent) => {
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
      setShowGame(true);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="typing-animation inline-block mb-4">
          <span>{decodeBase64('QmllbnZlbnVlIHN1ciBtYSBjb25zb2xlIHNlY3LDqHRl')}</span>
          <span className="terminal-cursor"></span>
        </div>
        
        {!showGame ? (
          !showFinalInput ? (
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
            <form onSubmit={handleFinalPasswordSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                value={finalPasswords.determinisme}
                onChange={(e) => setFinalPasswords(prev => ({ ...prev, determinisme: e.target.value }))}
                placeholder="Premier indice..."
                className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                         focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
              />
              <input
                type="text"
                value={finalPasswords.dieu}
                onChange={(e) => setFinalPasswords(prev => ({ ...prev, dieu: e.target.value }))}
                placeholder="Deuxième indice..."
                className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                         focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
              />
              <input
                type="text"
                value={finalPasswords.mechCola}
                onChange={(e) => setFinalPasswords(prev => ({ ...prev, mechCola: e.target.value }))}
                placeholder="Troisième indice..."
                className="w-full bg-terminal-bg text-terminal-text font-mono border border-terminal-text 
                         focus:outline-none focus:ring-1 focus:ring-terminal-text px-4 py-2"
              />
              <input
                type="text"
                value={finalPasswords.choix}
                onChange={(e) => setFinalPasswords(prev => ({ ...prev, choix: e.target.value }))}
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
          )
        ) : (
          <GameScreen 
            gameState={gameState}
            isNearPolice={isNearPolice}
            isExploding={isExploding}
            showPoliceDialog={showPoliceDialog}
            setShowPoliceDialog={setShowPoliceDialog}
            handlePoliceConfirm={handlePoliceConfirm}
            showFirecrackerDialog={showFirecrackerDialog}
            setShowFirecrackerDialog={setShowFirecrackerDialog}
            handleFirecrackerConfirm={handleFirecrackerConfirm}
            showArrestDialog={showArrestDialog}
            setShowArrestDialog={setShowArrestDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Index;