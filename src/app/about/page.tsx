'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { GlitchText } from '@/components/ui/glitch-text'
import { ScrollReveal } from '@/components/ui/parallax-text'
import { PublicNav } from '@/components/navigation/public-nav'
import { Code, Rocket, Users, Zap } from 'lucide-react'

const sections = [
  {
    id: 'beginning',
    year: '2020',
    title: 'The Beginning',
    content: 'Every great journey starts with a single line of code. We began with a vision to transform how developers build for the web.',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    background: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    id: 'vision',
    year: '2022',
    title: 'The Vision',
    content: 'We imagined a world where development is faster, easier, and more enjoyable. Where complex becomes simple, and impossible becomes possible.',
    icon: Rocket,
    color: 'from-purple-500 to-pink-500',
    background: 'from-purple-900/20 to-pink-900/20'
  },
  {
    id: 'community',
    year: '2024',
    title: 'The Community',
    content: 'Thousands of developers joined our mission. Together, we built not just code, but a movement that reshapes the future of web development.',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    background: 'from-green-900/20 to-emerald-900/20'
  },
  {
    id: 'future',
    year: '2025',
    title: 'The Future',
    content: 'Today, we\'re building tomorrow\'s web experiences. With cutting-edge technology and endless possibilities, the future is now.',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    background: 'from-orange-900/20 to-red-900/20'
  },
]

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      <PublicNav />
      <div ref={containerRef} className="relative bg-black text-white cursor-none">
        <CustomCursor />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 transform-origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 0, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255, 16, 240, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(0, 212, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(139, 0, 255, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        
        <ScrollReveal direction="up" className="text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            className="text-7xl md:text-9xl font-black mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="text-white">OUR</span>
            <br />
            <GlitchText 
              text="STORY" 
              className="gradient-text-y2k" 
              glitchIntensity={0.08}
            />
          </motion.h1>
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 w-32 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            A journey of innovation, community, and the relentless pursuit of 
            making development extraordinary.
          </p>
        </ScrollReveal>
      </section>

      {/* Story sections */}
      {sections.map((section, index) => (
        <ScrollSection
          key={section.id}
          section={section}
          index={index}
          progress={scrollYProgress}
        />
      ))}

      {/* Final CTA section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        
        <ScrollReveal direction="up" className="text-center max-w-4xl mx-auto px-6">
          <motion.div
            className="mb-8"
            whileHover={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-6xl md:text-8xl font-black gradient-text-y2k mb-6">
              JOIN THE STORY
            </h2>
          </motion.div>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Be part of the next chapter. Your story starts with a single click.
          </p>
          
          <motion.button
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-lg neo-brutal-shadow glow-purple transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </ScrollReveal>
      </section>
      </div>
    </>
  )
}

function ScrollSection({ section, index, progress }: {
  section: typeof sections[0]
  index: number
  progress: any
}) {
  const sectionProgress = useTransform(
    progress,
    [index * 0.2, (index + 1) * 0.2],
    [0, 1]
  )
  
  const y = useTransform(
    progress,
    [index * 0.2, (index + 1) * 0.2],
    ['0vh', '-100vh']
  )

  const opacity = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    sectionProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  )

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${section.background}`}
        style={{
          opacity: useTransform(sectionProgress, [0, 0.5, 1], [0, 0.3, 0])
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${section.color} rounded-full`}
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-8"
          style={{
            y: useTransform(sectionProgress, [0, 1], [50, -50])
          }}
        >
          {/* Icon */}
          <motion.div
            className="inline-block mb-6"
            whileHover={{ 
              scale: 1.2, 
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            <section.icon className={`w-20 h-20 mx-auto text-transparent bg-gradient-to-r ${section.color} bg-clip-text stroke-current`} />
          </motion.div>
          
          {/* Year */}
          <motion.div
            className={`text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
            style={{
              scale: useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1, 0.8])
            }}
          >
            {section.year}
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            style={{
              opacity: useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
            }}
          >
            {section.title}
          </motion.h2>
          
          {/* Content */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{
              opacity: useTransform(sectionProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])
            }}
          >
            {section.content}
          </motion.p>
        </motion.div>
      </div>

      {/* Section indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          className={`w-3 h-3 rounded-full bg-gradient-to-r ${section.color}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.section>
  )
}