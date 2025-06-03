'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { GlitchText } from '@/components/ui/glitch-text'
import { ScrollReveal } from '@/components/ui/parallax-text'
import { Zap, ChevronRight, Gamepad2, Rocket, Stars } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'

export function CTASection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section 
      ref={containerRef}
      className="relative py-40 px-6 overflow-hidden bg-black"
    >
      {/* Animated background layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900" />
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500 rounded-full blur-[128px] opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-[128px] opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Floating gaming elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating pixels */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto text-center"
        style={{ y: textY }}
      >
        {/* Gaming badge */}
        <ScrollReveal direction="up">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white mb-8 border border-white/20 neo-brutal-shadow-white"
            whileHover={{ scale: 1.05, rotateZ: [0, -1, 1, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Gamepad2 className="w-5 h-5 animate-pulse-glow" />
            <span className="font-bold uppercase tracking-wider">
              LEVEL UP TIME
            </span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </ScrollReveal>
        
        {/* Main heading */}
        <ScrollReveal direction="up" delay={0.2}>
          <motion.h2
            className="text-5xl md:text-8xl font-black mb-8 text-white leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            Ready to{' '}
            <span className="relative inline-block">
              <GlitchText 
                text="LEVEL UP" 
                className="gradient-text-y2k" 
                glitchIntensity={0.15}
              />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-lg -z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <br />
            Your Game?
          </motion.h2>
        </ScrollReveal>
        
        {/* Subtitle */}
        <ScrollReveal direction="up" delay={0.4}>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0.8 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Join thousands of developers building the{' '}
            <span className="text-shimmer font-bold">future of the web</span>.{' '}
            Start your epic journey with our{' '}
            <span className="gradient-text-y2k font-bold">next-gen template</span>{' '}
            today.
          </motion.p>
        </ScrollReveal>
        
        {/* CTA buttons */}
        <ScrollReveal direction="up" delay={0.6}>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <MagneticButton 
              size="lg"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl font-bold neo-brutal-shadow glow-purple"
              asChild
            >
              <Link href="/register">
                <Rocket className="mr-3 h-6 w-6" />
                Start Building Now
                <ChevronRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </MagneticButton>
            
            <MagneticButton 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-xl font-bold backdrop-blur-sm hover:border-white/50"
              asChild
            >
              <Link href="/docs">
                <Stars className="mr-3 h-5 w-5" />
                Explore Features
              </Link>
            </MagneticButton>
          </motion.div>
        </ScrollReveal>

        {/* Achievement badges */}
        <ScrollReveal direction="up" delay={0.8}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
          >
            {[
              { icon: '🚀', title: 'Ship Faster', subtitle: 'Deploy in minutes' },
              { icon: '⚡', title: 'Performance Beast', subtitle: '99.9% uptime' },
              { icon: '🎯', title: 'Developer Love', subtitle: '4.9/5 rating' },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="text-white font-bold text-lg mb-1">
                  {achievement.title}
                </div>
                <div className="text-gray-400 text-sm">
                  {achievement.subtitle}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </motion.div>

      {/* Corner gaming UI elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-cyan-500/50" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-purple-500/50" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-pink-500/50" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-orange-500/50" />

      {/* Scanlines effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}