'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { GlitchText, TypewriterText } from '@/components/ui/glitch-text'
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black cursor-none">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
          animate={{
            background: [
              'linear-gradient(45deg, #8B00FF, #FF10F0)',
              'linear-gradient(45deg, #FF10F0, #00D4FF)',
              'linear-gradient(45deg, #00D4FF, #BFFF00)',
              'linear-gradient(45deg, #BFFF00, #8B00FF)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Cyber grid pattern overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white mb-8 border border-white/20 neo-brutal-shadow-white">
            <Sparkles className="w-4 h-4 animate-pulse-glow" />
            <TypewriterText text="Welcome to the Future" speed={100} delay={1000} />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-6xl md:text-9xl font-black mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="text-white mb-4">
            <GlitchText text="NEXT.JS" glitchIntensity={0.05} />
          </div>
          <div className="text-4xl md:text-6xl gradient-text-y2k">
            2025 Template
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mb-4">
            Experience the future of web development with{' '}
            <span className="text-shimmer font-bold">cutting-edge design</span>,{' '}
            <span className="glow-purple px-2 rounded">blazing-fast performance</span>, and{' '}
            <span className="gradient-text-y2k">unmatched developer experience</span>.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <MagneticButton 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg neo-brutal-shadow glow-purple"
            asChild
          >
            <Link href="/dashboard">
              <Rocket className="mr-2 h-5 w-5" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          
          <MagneticButton 
            size="lg" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
            asChild
          >
            <Link href="/docs">
              <Zap className="mr-2 h-5 w-5" />
              View Demo
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {[
            { value: '99%', label: 'Performance' },
            { value: '<100ms', label: 'Load Time' },
            { value: '10k+', label: 'Developers' },
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-2xl md:text-4xl font-black text-white mb-2 group-hover:gradient-text-y2k transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-purple-500/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-pink-500/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-cyan-500/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-orange-500/30" />
    </section>
  )
}