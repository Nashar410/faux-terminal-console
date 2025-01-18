import React from 'react';

export const FirecrackerSprite = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    {/* Base */}
    <circle cx="8" cy="8" r="6" fill="#444" stroke="#666" strokeWidth="1" />
    <circle cx="8" cy="8" r="4" fill="#333" />
    
    {/* Core */}
    <circle cx="8" cy="8" r="3" fill="#8B0000" />
    
    {/* Fuse avec animation */}
    <path d="M8,2 C8,2 6,3 8,4 C10,3 8,2 8,2" fill="#888888" stroke="#333" strokeWidth="1" className="animate-pulse" />
    <circle cx="8" cy="2" r="1" fill="#fcd34d" className="animate-pulse" />
    <circle cx="7" cy="1.5" r="0.5" fill="#f59e0b" className="animate-bounce" />
    <circle cx="9" cy="1.5" r="0.5" fill="#f59e0b" className="animate-bounce" />
  </svg>
);