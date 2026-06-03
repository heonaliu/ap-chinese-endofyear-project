'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

/**
 * Hero — Full-screen opening section.
 * Replace the background placeholder div with:
 *   <Image src="/images/hero-bg.jpg" alt="Jingshan School" fill className="object-cover" />
 */
export default function Hero() {
  const { t } = useLang()

  const scrollToNext = () => {
    document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950">
        {/* TODO: Replace this div with <Image src="/images/hero-bg.jpg" ... /> */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          {/* Large decorative calligraphy character */}
          <motion.span
            className="font-chinese text-[80vw] md:text-[50vw] text-white leading-none"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            学
          </motion.span>
        </div>

        {/* Ambient red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Ink texture dots */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* ── Decorative vertical Chinese text ── */}
      <motion.div
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {['交', '流', '学', '习'].map((char, i) => (
          <span
            key={i}
            className="font-chinese text-stone-700 text-sm writing-vertical"
          >
            {char}
          </span>
        ))}
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* AP Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-red/30 bg-accent-red/10 text-accent-red text-xs tracking-widest uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            AP Chinese Final Project · 2026
          </span>
        </motion.div>

        {/* Chinese title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-3"
        >
          <span className="font-chinese text-2xl md:text-4xl text-accent-gold tracking-[0.3em]">
            终身学习
          </span>
        </motion.div>

        {/* English title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.9] mb-6"
        >
          Life{' '}
          <span className="gradient-red italic">Long</span>
          <br />
          Learning
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-16 bg-accent-red/40" />
          <span className="text-accent-red text-xs">◆</span>
          <div className="h-px w-16 bg-accent-red/40" />
        </motion.div>

        {/* Program subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-stone-400 text-base md:text-lg mb-2 tracking-wide"
        >
          {t({
            en: 'My experience studying at Jingshan School in China as an exchange student.',
            zh: '我在景山学校的交流经历。',
          })}
        </motion.p>

        {/* Student tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-accent-gold/70 text-sm tracking-widest uppercase mb-10"
        >
          Heona Liu &nbsp;·&nbsp; AP中文项目
        </motion.p>

        {/* Intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-2xl mx-auto mb-12 glass rounded-2xl px-6 py-5 text-left"
        >
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            {t({
              en: `I traveled to China through the Jingshan exchange program and experienced a completely different style of education, daily life, and culture. This project explores the moments that surprised me, challenged me, and changed my perspective on learning and community.`,
              zh: `我去中国，体验了不同的教育与文化。`,
            })}
          </p>
          <p className="text-stone-500 text-xs mt-3 font-chinese">
            记录我的中国交流经历
          </p>
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 mx-auto text-stone-500 hover:text-stone-300 transition-colors duration-200 group"
        >
          <span className="text-[10px] tracking-widest uppercase">
            {t({ en: 'Scroll to explore', zh: '向下探索' })}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="group-hover:text-accent-red transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />

      {/* Corner decoration */}
      <motion.div
        className="absolute top-20 right-6 md:right-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-end gap-1">
          <div className="h-px w-20 bg-accent-gold/30" />
          <div className="h-px w-12 bg-accent-gold/20" />
          <div className="h-px w-6 bg-accent-gold/10" />
        </div>
      </motion.div>
    </section>
  )
}
