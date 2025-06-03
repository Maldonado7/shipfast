'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Menu, X, Zap } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/docs', label: 'Docs' },
]

export function PublicNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Link 
                href="/" 
                className="flex items-center gap-2 text-xl font-black text-white"
              >
                <Zap className="w-6 h-6 text-purple-400" />
                <span className="gradient-text-y2k">NEXT.JS</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <MagneticButton variant="outline" size="sm" asChild>
                <Link href="/login" className="text-white border-white/20 hover:bg-white/10">
                  Login
                </Link>
              </MagneticButton>
              <MagneticButton 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                asChild
              >
                <Link href="/register">
                  Get Started
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 ${
            isOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white/80 hover:text-white transition-colors duration-200 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full text-white border-white/20" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}