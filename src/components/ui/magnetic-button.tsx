'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from './button'

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number
}

export function MagneticButton({ 
  children, 
  magneticStrength = 30,
  className = '',
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = Math.max(rect.width, rect.height)
    
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance
      setPosition({
        x: (deltaX * strength * magneticStrength) / maxDistance,
        y: (deltaY * strength * magneticStrength) / maxDistance,
      })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Button
        ref={ref}
        className={`transition-all duration-200 hover:scale-105 ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}