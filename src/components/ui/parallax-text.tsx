'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxTextProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxText({ children, speed = 0.5, className = '' }: ParallaxTextProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 }
      case 'down': return { y: -50, x: 0 }
      case 'left': return { y: 0, x: 50 }
      case 'right': return { y: 0, x: -50 }
      default: return { y: 50, x: 0 }
    }
  }

  const initial = getInitialPosition()

  return (
    <motion.div
      className={className}
      initial={{ ...initial, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}