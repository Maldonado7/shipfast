'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/parallax-text'

const stats = [
  { 
    value: 99.9, 
    suffix: '%', 
    label: 'Uptime SLA',
    description: 'Rock-solid reliability',
    color: 'from-green-400 to-emerald-500'
  },
  { 
    value: 150, 
    suffix: 'ms', 
    label: 'Load Time',
    description: 'Lightning fast',
    color: 'from-yellow-400 to-orange-500'
  },
  { 
    value: 10000, 
    suffix: '+', 
    label: 'Developers',
    description: 'Growing community',
    color: 'from-blue-400 to-cyan-500'
  },
  { 
    value: 4.9, 
    suffix: '/5', 
    label: 'User Rating',
    description: 'Loved by users',
    color: 'from-purple-400 to-pink-500'
  },
]

export function StatsSection() {
  return (
    <section className="relative py-32 px-6 bg-black text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(139, 0, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(255, 16, 240, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(139, 0, 255, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-20">
          <motion.h2 
            className="text-6xl md:text-8xl font-black uppercase mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="gradient-text-y2k">Numbers</span>
            <br />
            <span className="text-white">Don't Lie</span>
          </motion.h2>
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 w-24 mx-auto" />
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Additional metrics */}
        <ScrollReveal direction="up" delay={0.8} className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { metric: '0 Dependencies', detail: 'Zero config setup' },
              { metric: '100% TypeScript', detail: 'Fully type-safe' },
              { metric: '24/7 Support', detail: 'Community driven' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group p-6 border border-white/10 rounded-lg backdrop-blur-sm hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="text-xl font-bold text-white mb-2 group-hover:gradient-text-y2k transition-all duration-300">
                  {item.metric}
                </div>
                <div className="text-gray-400 text-sm">
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Floating decorations */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 border-2 border-purple-500/30 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg rotate-45"
        animate={{ rotate: [45, 405, 45], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}

function StatCard({ value, suffix, label, description, color, index }: {
  value: number
  suffix: string
  label: string
  description: string
  color: string
  index: number
}) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { 
    damping: 60, 
    stiffness: 100,
    duration: 2000 
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })
  }, [springValue])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      motionValue.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, motionValue, hasAnimated])

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        ref={ref}
        className="text-center group cursor-pointer relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 rounded-lg blur-xl`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main number */}
        <motion.div 
          className={`relative text-5xl md:text-7xl font-black mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
        >
          {displayValue.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
        </motion.div>

        {/* Label */}
        <motion.div 
          className="text-white font-bold text-lg mb-2 uppercase tracking-wider"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
        >
          {label}
        </motion.div>

        {/* Description */}
        <motion.div 
          className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
        >
          {description}
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${color} group-hover:w-full transition-all duration-300`}
        />

        {/* Particle effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          whileHover={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
            ],
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </ScrollReveal>
  )
}