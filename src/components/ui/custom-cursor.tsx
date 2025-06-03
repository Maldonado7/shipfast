'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      )
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white mix-blend-difference rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 28,
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Inner cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 2000, 
          damping: 50,
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Trailing effect */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-[9998] hidden lg:block"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 1000, 
          damping: 30,
          opacity: { duration: 0.3 }
        }}
      />
    </>
  )
}