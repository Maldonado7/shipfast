import { HeroSection } from '@/components/sections/hero'
import { FeaturesGrid } from '@/components/sections/features-grid'
import { StatsSection } from '@/components/sections/stats'
import { CTASection } from '@/components/sections/cta'
import { FloatingElements } from '@/components/ui/floating-elements'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { PublicNav } from '@/components/navigation/public-nav'

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main className="relative overflow-hidden cursor-none">
        <CustomCursor />
        
        {/* Floating background elements */}
        <FloatingElements />
        
        {/* Hero with full-screen immersive design */}
        <HeroSection />
        
        {/* Features with brutalist grid */}
        <FeaturesGrid />
        
        {/* Stats with micro-interactions */}
        <StatsSection />
        
        {/* CTA with gaming-inspired design */}
        <CTASection />
      </main>
    </>
  )
}