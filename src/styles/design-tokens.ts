export const designTokens = {
  colors: {
    // Y2K inspired palette
    neonPink: '#FF10F0',
    electricBlue: '#00D4FF',
    cyberLime: '#BFFF00',
    digitalPurple: '#8B00FF',
    
    // Brutalist palette
    brutalBlack: '#000000',
    brutalWhite: '#FFFFFF',
    brutalGray: '#808080',
    
    // Organic palette
    earthBrown: '#8B4513',
    skyBlue: '#87CEEB',
    leafGreen: '#228B22',
    
    // Gaming inspired
    neonGreen: '#39FF14',
    cyberYellow: '#FFFF00',
    matrixGreen: '#00FF41',
    synthPurple: '#B026FF',
  },
  
  gradients: {
    y2k: 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)',
    cyber: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    neon: 'linear-gradient(45deg, #FF10F0, #00D4FF)',
    gaming: 'linear-gradient(to right, #8B00FF, #FF10F0)',
  },
  
  animations: {
    microInteraction: '0.2s ease-out',
    smoothScroll: '0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    glitch: '0.3s steps(2, end)',
    bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  spacing: {
    section: 'clamp(5rem, 10vw, 8rem)',
    container: 'min(90rem, 100% - 3rem)',
  },
  
  typography: {
    brutalist: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: '900',
      letterSpacing: '-0.02em',
    },
    gaming: {
      fontFamily: 'Space Grotesk, monospace',
      fontWeight: '700',
      letterSpacing: '0.1em',
    },
  },
  
  effects: {
    neoShadow: '4px 4px 0px 0px #000',
    neoShadowHover: '6px 6px 0px 0px #000',
    glowPurple: '0 0 20px rgba(139, 0, 255, 0.5)',
    glowPink: '0 0 20px rgba(255, 16, 240, 0.5)',
  },
}

export type DesignTokens = typeof designTokens