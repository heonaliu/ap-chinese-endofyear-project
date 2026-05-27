import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/Hero'
import ProjectOverview from '@/components/ProjectOverview'
import AboutExchange from '@/components/AboutExchange'
import SchoolLife from '@/components/SchoolLife'
import HostFamily from '@/components/HostFamily'
import CulturalComparison from '@/components/CulturalComparison'
import DevelopmentProcess from '@/components/DevelopmentProcess'
import Gallery from '@/components/Gallery'
import FinalReflection from '@/components/FinalReflection'
import Footer from '@/components/Footer'

/**
 * ══════════════════════════════════════════════════════════════
 *  终身学习 | Life Long Learning
 *  AP Chinese Final Project — Heona Liu, 2026
 *
 *  WEBSITE STRUCTURE:
 *  1. Hero          — Full-screen animated title section
 *  2. ProjectOverview — IMPORTANT FOR GRADING: themes, format, language use
 *  3. AboutExchange — Timeline + program background
 *  4. SchoolLife    — 学校生活 (AP Theme: School Life)
 *  5. HostFamily    — 寄宿家庭生活 (AP Theme: Family & Relationships)
 *  6. CulturalComparison — 文化比较 (AP Theme: Cultural Comparison)
 *  7. DevelopmentProcess — Evidence of Week 2 production
 *  8. Gallery       — Photo gallery with lightbox
 *  9. FinalReflection — 最终反思 (AP Theme: Identity)
 * 10. Footer
 * ══════════════════════════════════════════════════════════════
 */
export default function Home() {
  return (
    <main className="bg-stone-950 text-stone-100 dark:bg-stone-950 dark:text-stone-100 light:bg-paper light:text-stone-900">
      {/* Fixed UI elements */}
      <ScrollProgress />
      <Navigation />

      {/* Page sections — in order */}
      <Hero />
      <ProjectOverview />
      <AboutExchange />
      <SchoolLife />
      <HostFamily />
      <CulturalComparison />
      <Gallery />
      <Footer />
    </main>
  )
}
