'use client'

import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
  glitchFrequency?: number
}

export function GlitchText({ 
  text, 
  className = '', 
  glitchIntensity = 0.1,
  glitchFrequency = 100 
}: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const glitchChance = Math.random()
      if (glitchChance < glitchIntensity) {
        setIsGlitching(true)
        const glitchIndex = Math.floor(Math.random() * text.length)
        const glitchChar = String.fromCharCode(33 + Math.random() * 94)
        const newText = text.split('')
        newText[glitchIndex] = glitchChar
        setGlitchText(newText.join(''))
        
        setTimeout(() => {
          setGlitchText(text)
          setIsGlitching(false)
        }, 100)
      }
    }, glitchFrequency)
    
    return () => clearInterval(interval)
  }, [text, glitchIntensity, glitchFrequency])
  
  return (
    <span className={`relative inline-block ${className}`}>
      <span 
        className={`relative z-10 transition-all duration-100 ${
          isGlitching ? 'text-red-500' : ''
        }`}
      >
        {glitchText}
      </span>
      <span 
        className={`absolute top-0 left-0 -ml-0.5 text-cyan-500 opacity-70 ${
          isGlitching ? 'animate-glitch-1' : ''
        }`}
      >
        {text}
      </span>
      <span 
        className={`absolute top-0 left-0 ml-0.5 text-red-500 opacity-70 ${
          isGlitching ? 'animate-glitch-2' : ''
        }`}
      >
        {text}
      </span>
    </span>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterText({ 
  text, 
  className = '', 
  speed = 50,
  delay = 0 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed, isTyping])

  return (
    <span className={`${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}