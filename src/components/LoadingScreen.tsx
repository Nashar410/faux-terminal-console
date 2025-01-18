import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Initialisation du système...",
  "Activation du mode furtif...",
  "Chargement des modules de sécurité...",
  "Scan des réseaux environnants...",
  "Cryptage des communications...",
  "Établissement des connexions sécurisées...",
  "Vérification de l'intégrité du système...",
  "Mode intraçable activé",
  "Démarrage de la console secrète..."
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= LOADING_MESSAGES.length) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, LOADING_MESSAGES[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, Math.random() * 300 + 400); // Temps aléatoire entre 400ms et 700ms

    return () => clearTimeout(timer);
  }, [currentIndex, onLoadingComplete]);

  return (
    <div className="min-h-screen bg-terminal-bg p-4 font-mono text-terminal-text">
      <div className="max-w-2xl mx-auto">
        {displayedMessages.map((message, index) => (
          <div 
            key={index} 
            className="typing-animation mb-2"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <span className="text-terminal-text">$ {message}</span>
          </div>
        ))}
        <div className="terminal-cursor h-4"></div>
      </div>
    </div>
  );
};