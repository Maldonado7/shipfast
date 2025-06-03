'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  size: number
  duration: number
  delay: number
  x: number
  y: number
  color: string
  shape: 'circle' | 'square' | 'triangle'
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const colors = [
      'from-purple-400/10 to-pink-400/10',
      'from-cyan-400/10 to-blue-400/10',
      'from-green-400/10 to-emerald-400/10',
      'from-yellow-400/10 to-orange-400/10',
      'from-red-400/10 to-pink-400/10',
    ]

    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle']

    const newElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 50,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))

    setElements(newElements)
  }, [])

  const getShapeClasses = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'rounded-full'
      case 'square':
        return 'rounded-lg'
      case 'triangle':
        return 'rounded-lg transform rotate-45'
      default:
        return 'rounded-full'
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute bg-gradient-to-br ${element.color} blur-3xl ${getShapeClasses(element.shape)}`}
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            rotate: element.shape === 'triangle' ? [45, 135, 225, 315, 45] : [0, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Additional geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-2 border-purple-500/20 rounded-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border-2 border-cyan-500/20 rounded-full"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [0, 200, -200, 0],
          y: [0, -200, 200, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 retro-grid" />
      <motion.div 
        className="absolute inset-0 cyber-grid"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}