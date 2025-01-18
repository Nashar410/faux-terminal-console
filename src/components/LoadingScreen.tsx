import { useState, useEffect } from 'react';
import strings from '@/data/strings.json';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= strings.loadingScreen.messages.length) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 1000); // Délai de 1 seconde après le dernier message
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, strings.loadingScreen.messages[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, Math.random() * 300 + 400); // Délai aléatoire entre 400ms et 700ms

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