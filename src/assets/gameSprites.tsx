import React, { useEffect, useState } from 'react';

type SpriteFunction = () => JSX.Element;

interface Sprites {
  player: {
    idle: SpriteFunction;
    walkLeft: SpriteFunction;
    walkRight: SpriteFunction;
  };
  police: {
    idle1: SpriteFunction;
    idle2: SpriteFunction;
  };
  firecracker: SpriteFunction;
  building: SpriteFunction;
}

export const sprites: Sprites = {
  player: {
    idle: () => {
      const [isBlinking, setIsBlinking] = useState(false);
      
      useEffect(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 3000);
        return () => clearInterval(blinkInterval);
      }, []);

      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          {/* Corps */}
          <circle cx="16" cy="12" r="6" fill="#FFD7BA" /> {/* Tête */}
          <rect x="12" y="18" width="8" height="12" fill="#4B5563" /> {/* Corps */}
          <rect x="10" y="18" width="2" height="8" fill="#4B5563" /> {/* Bras gauche */}
          <rect x="20" y="18" width="2" height="8" fill="#4B5563" /> {/* Bras droit */}
          {/* Yeux */}
          <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
        </svg>
      );
    },
    walkLeft: () => {
      const [isBlinking, setIsBlinking] = useState(false);
      
      useEffect(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 3000);
        return () => clearInterval(blinkInterval);
      }, []);

      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="12" r="6" fill="#FFD7BA" />
          <rect x="12" y="18" width="8" height="12" fill="#4B5563" />
          <rect x="8" y="18" width="4" height="8" fill="#4B5563" /> {/* Bras gauche étendu */}
          <rect x="20" y="18" width="2" height="8" fill="#4B5563" />
          <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
        </svg>
      );
    },
    walkRight: () => {
      const [isBlinking, setIsBlinking] = useState(false);
      
      useEffect(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 3000);
        return () => clearInterval(blinkInterval);
      }, []);

      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="12" r="6" fill="#FFD7BA" />
          <rect x="12" y="18" width="8" height="12" fill="#4B5563" />
          <rect x="10" y="18" width="2" height="8" fill="#4B5563" />
          <rect x="20" y="18" width="4" height="8" fill="#4B5563" /> {/* Bras droit étendu */}
          <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
        </svg>
      );
    }
  },
  
  police: {
    idle1: () => {
      const [isBlinking, setIsBlinking] = useState(false);
      
      useEffect(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 2500);
        return () => clearInterval(blinkInterval);
      }, []);

      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="12" r="6" fill="#FFD7BA" /> {/* Tête */}
          <rect x="12" y="18" width="8" height="12" fill="#1E3A8A" /> {/* Corps en bleu */}
          <rect x="10" y="18" width="2" height="8" fill="#1E3A8A" />
          <rect x="20" y="18" width="2" height="8" fill="#1E3A8A" />
          <rect x="14" y="6" width="4" height="2" fill="#1E3A8A" /> {/* Casquette */}
          <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <rect x="12" y="20" width="8" height="2" fill="#FDE047" /> {/* Badge */}
        </svg>
      );
    },
    idle2: () => {
      const [isBlinking, setIsBlinking] = useState(false);
      
      useEffect(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 2500);
        return () => clearInterval(blinkInterval);
      }, []);

      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="12" r="6" fill="#FFD7BA" />
          <rect x="12" y="18" width="8" height="12" fill="#1E3A8A" />
          <rect x="10" y="18" width="2" height="8" fill="#1E3A8A" />
          <rect x="20" y="18" width="4" height="8" fill="#1E3A8A" /> {/* Bras droit étendu */}
          <rect x="14" y="6" width="4" height="2" fill="#1E3A8A" />
          <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
          <rect x="12" y="20" width="8" height="2" fill="#FDE047" />
        </svg>
      );
    }
  },
  
  firecracker: () => {
    const [isSparking, setIsSparking] = useState(false);
    
    useEffect(() => {
      const sparkInterval = setInterval(() => {
        setIsSparking(prev => !prev);
      }, 500);
      return () => clearInterval(sparkInterval);
    }, []);

    return (
      <svg width="32" height="32" viewBox="0 0 32 32">
        {/* Partie 1: Cercle extérieur avec ombre */}
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.5"/>
          </filter>
          <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#333', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <circle 
          cx="16" 
          cy="16" 
          r="12" 
          fill="url(#edge)"
          filter="url(#shadow)"
        />
        <circle 
          cx="16" 
          cy="16" 
          r="10" 
          fill="transparent"
          stroke="#000"
          strokeWidth="1"
        />

        {/* Partie 2: Remplissage intérieur */}
        <circle 
          cx="16" 
          cy="16" 
          r="9" 
          fill="#ea384c"
        />

        {/* Partie 3: Mèche */}
        <path 
          d="M16,4 C16,4 13,6 16,8 C19,6 16,4 16,4" 
          fill="#888888"
          stroke="#333"
          strokeWidth="1"
        />
        {isSparking && (
          <>
            <circle cx="16" cy="4" r="1.5" fill="#fcd34d" />
            <circle cx="14" cy="3" r="1" fill="#f59e0b" />
            <circle cx="18" cy="3" r="1" fill="#f59e0b" />
          </>
        )}
      </svg>
    );
  },
  
  building: () => (
    <svg width="32" height="64" viewBox="0 0 32 64">
      <rect x="2" y="4" width="28" height="56" fill="#403E43" rx="2" />
      <rect x="6" y="8" width="6" height="6" fill="#1A1F2C" />
      <rect x="20" y="8" width="6" height="6" fill="#1A1F2C" />
      <rect x="6" y="20" width="6" height="6" fill="#1A1F2C" />
      <rect x="20" y="20" width="6" height="6" fill="#1A1F2C" />
      <rect x="6" y="32" width="6" height="6" fill="#1A1F2C" />
      <rect x="20" y="32" width="6" height="6" fill="#1A1F2C" />
    </svg>
  )
};

// Animation frames for player movement
export const playerFrames = {
  left: [sprites.player.walkLeft, sprites.player.idle],
  right: [sprites.player.walkRight, sprites.player.idle],
  idle: [sprites.player.idle]
};

// Animation frames for police idle animation
export const policeFrames = [sprites.police.idle1, sprites.police.idle2];
