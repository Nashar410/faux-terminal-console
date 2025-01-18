import React from 'react';

export const Base = () => (
  <>
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.7"/>
      </filter>
      <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#111', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: '#222', stopOpacity: 0.8 }} />
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
      stroke="#333"
      strokeWidth="1.5"
    />
  </>
);