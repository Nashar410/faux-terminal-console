import React from 'react';

export const Base = () => (
  <>
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
  </>
);