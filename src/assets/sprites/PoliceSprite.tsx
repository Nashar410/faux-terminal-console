import React, { useEffect, useState } from 'react';

export const PoliceIdle1 = () => {
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
      <rect x="20" y="18" width="2" height="8" fill="#1E3A8A" />
      <rect x="14" y="6" width="4" height="2" fill="#1E3A8A" />
      <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <rect x="12" y="20" width="8" height="2" fill="#FDE047" />
    </svg>
  );
};

export const PoliceIdle2 = () => {
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
      <rect x="20" y="18" width="4" height="8" fill="#1E3A8A" />
      <rect x="14" y="6" width="4" height="2" fill="#1E3A8A" />
      <circle cx="14" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <circle cx="18" cy="11" r="1" fill={isBlinking ? "#FFD7BA" : "#000"} />
      <rect x="12" y="20" width="8" height="2" fill="#FDE047" />
    </svg>
  );
};