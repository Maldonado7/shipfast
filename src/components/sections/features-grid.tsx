'use client'

import { motion } from 'framer-motion'
import { features } from '@/config/features'
import { ScrollReveal } from '@/components/ui/parallax-text'
import { useState } from 'react'

export function FeaturesGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-32 px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 retro-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-block mb-6"
              whileHover={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter">
                <span className="text-black dark:text-white">FEAT</span>
                <span className="gradient-text-y2k">URES</span>
              </h2>
            </motion.div>
            <div className="h-2 bg-black dark:bg-white w-32 mx-auto mb-8" />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for the future with today's most powerful technologies. 
              Every feature designed for maximum impact and developer happiness.
            </p>
          </div>
        </ScrollReveal>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.id} delay={feature.delay} direction="up">
              <motion.div
                className="group relative border-2 border-black dark:border-white p-8 h-80 cursor-pointer overflow-hidden"
                initial={{ backgroundColor: 'transparent' }}
                whileHover={{ 
                  backgroundColor: '#000',
                  color: '#fff',
                }}
                onHoverStart={() => setHoveredCard(feature.id)}
                onHoverEnd={() => setHoveredCard(null)}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Card background effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10`}
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 3 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-6 relative z-10"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon 
                    className="w-12 h-12 stroke-[3] text-black dark:text-white group-hover:text-white" 
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-2xl font-black uppercase mb-3 text-black dark:text-white group-hover:text-white"
                    whileHover={{ x: [0, -2, 2, 0] }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />

                {/* Neo-brutalist corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-black dark:border-white group-hover:border-white" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom decoration */}
        <ScrollReveal direction="up" delay={0.5} className="mt-20 text-center">
          <motion.div
            className="inline-block"
            animate={{ 
              scale: hoveredCard ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {hoveredCard ? `Exploring: ${features.find(f => f.id === hoveredCard)?.title}` : 'Hover to explore features'}
            </p>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border-4 border-purple-500/20 rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  )
}