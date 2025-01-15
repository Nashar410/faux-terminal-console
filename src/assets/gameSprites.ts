import React from 'react';

// SVG Components
export const sprites = {
  player: {
    idle: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
        <rect x="12" y="12" width="8" height="4" fill="#403E43" />
      </svg>
    ),
    walkLeft: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
        <rect x="12" y="12" width="8" height="4" fill="#403E43" />
        <rect x="6" y="16" width="4" height="4" fill="#8E9196" />
      </svg>
    ),
    walkRight: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="8" y="8" width="16" height="16" fill="#8E9196" rx="2" />
        <rect x="12" y="12" width="8" height="4" fill="#403E43" />
        <rect x="22" y="16" width="4" height="4" fill="#8E9196" />
      </svg>
    )
  },
  
  police: {
    idle1: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="8" y="8" width="16" height="16" fill="#1A1F2C" rx="2" />
        <rect x="12" y="12" width="8" height="4" fill="#ea384c" />
      </svg>
    ),
    idle2: () => (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="8" y="8" width="16" height="16" fill="#1A1F2C" rx="2" />
        <rect x="12" y="12" width="8" height="4" fill="#ea384c" />
        <rect x="20" y="16" width="4" height="4" fill="#ea384c" />
      </svg>
    )
  },
  
  firecracker: () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="4" y="4" width="8" height="8" fill="#ea384c" rx="1" />
      <rect x="6" y="2" width="4" height="2" fill="#8E9196" />
    </svg>
  ),
  
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