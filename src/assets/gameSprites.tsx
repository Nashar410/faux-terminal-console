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
          <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
          <rect x="12" y="12" width="8" height="4" fill={isBlinking ? "#8E9196" : "#403E43"} />
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
          <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
          <rect x="12" y="12" width="8" height="4" fill={isBlinking ? "#8E9196" : "#403E43"} />
          <rect x="6" y="16" width="4" height="4" fill="#8E9196" />
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
          <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
          <rect x="12" y="12" width="8" height="4" fill={isBlinking ? "#8E9196" : "#403E43"} />
          <rect x="22" y="16" width="4" height="4" fill="#8E9196" />
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
          <rect x="8" y="8" width="16" height="16" fill="#1A1F2C" rx="2" />
          <rect x="12" y="12" width="8" height="4" fill={isBlinking ? "#1A1F2C" : "#ea384c"} />
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
          <rect x="8" y="8" width="16" height="16" fill="#1A1F2C" rx="2" />
          <rect x="12" y="12" width="8" height="4" fill={isBlinking ? "#1A1F2C" : "#ea384c"} />
          <rect x="20" y="16" width="4" height="4" fill="#ea384c" />
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
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="4" y="4" width="8" height="8" fill="#ea384c" rx="1" />
        <rect x="6" y="2" width="4" height="2" fill={isSparking ? "#ea384c" : "#8E9196"} />
        {isSparking && (
          <rect x="7" y="0" width="2" height="2" fill="#ea384c" />
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