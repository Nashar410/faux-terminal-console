import React, { useEffect, useState } from 'react';

export const PlayerIdle = () => {
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
      <rect x="20" y="18" width="2" height="8" fill="#4B5563" />
      <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
    </svg>
  );
};

export const PlayerWalkLeft = () => {
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
      <rect x="8" y="18" width="4" height="8" fill="#4B5563" />
      <rect x="20" y="18" width="2" height="8" fill="#4B5563" />
      <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
    </svg>
  );
};

export const PlayerWalkRight = () => {
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
      <rect x="20" y="18" width="4" height="8" fill="#4B5563" />
      <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
    </svg>
  );
};