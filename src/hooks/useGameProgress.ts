import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GameScreen, GameProgress } from '@/types/game';
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';

const INITIAL_STATE: GameProgress = {
  currentScreen: 'loading',
  hints: [],
  completedGames: [],
};

export const useGameProgress = () => {
  const [gameProgress, setGameProgress] = useState<GameProgress>(INITIAL_STATE);
  const { toast } = useToast();

  const addHint = (hint: string) => {
    setGameProgress(prev => ({
      ...prev,
      hints: [...prev.hints, hint]
    }));
  };

  const markGameCompleted = (screen: GameScreen) => {
    setGameProgress(prev => ({
      ...prev,
      completedGames: [...prev.completedGames, screen]
    }));
  };

  const goToScreen = (screen: GameScreen) => {
    setGameProgress(prev => ({
      ...prev,
      currentScreen: screen
    }));
  };

  const handlePasswordSuccess = (currentScreen: GameScreen) => {
    switch (currentScreen) {
      case 'password1':
        goToScreen('minigame1');
        break;
      case 'password2':
        goToScreen('minigame2');
        break;
      case 'password3':
        goToScreen('minigame3');
        break;
      case 'password4':
        goToScreen('minigame4');
        break;
      case 'finalPassword':
        goToScreen('agir');
        break;
    }
  };

  const handlePasswordFailure = () => {
    toast({
      variant: "destructive",
      description: decodeBase64(strings.console.invalidPassword),
      className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
    });
  };

  const handleGameCompletion = (currentScreen: GameScreen) => {
    markGameCompleted(currentScreen);
    switch (currentScreen) {
      case 'minigame1':
        addHint("Information 1 débloqué");
        goToScreen('password2');
        break;
      case 'minigame2':
        addHint("Information 2 débloqué");
        goToScreen('password3');
        break;
      case 'minigame3':
        addHint("Information 3 débloqué");
        goToScreen('password4');
        break;
      case 'minigame4':
        addHint("Information 4 débloqué");
        goToScreen('finalPassword');
        break;
    }
  };

  const startGame = () => {
    goToScreen('password1');
  };

  return {
    gameProgress,
    startGame,
    handlePasswordSuccess,
    handlePasswordFailure,
    handleGameCompletion,
    goToScreen
  };
};