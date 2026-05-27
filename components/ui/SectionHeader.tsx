'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  chineseTitle: string
  englishTitle: string
  subtitle?: string
  accent?: 'red' | 'gold'
  center?: boolean
  themeTag?: string
}

/**
 * SectionHeader — Reusable bilingual section heading.
 * Always shows Chinese alongside English for AP grading visibility.
 */
export default function SectionHeader({
  chineseTitle,
  englishTitle,
  subtitle,
  accent = 'red',
  center = false,
  themeTag,
}: SectionHeaderProps) {
  const accentColor = accent === 'red' ? 'text-accent-red' : 'text-accent-gold'
  const accentBg = accent === 'red' ? 'bg-accent-red' : 'bg-accent-gold'
  const alignClass = center ? 'text-center items-center' : 'text-left items-start'

  return (
    <motion.div
      className={`flex flex-col gap-3 mb-16 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {themeTag && (
        <span className={`text-xs uppercase tracking-widest font-semibold ${accentColor} font-sans`}>
          AP Theme · {themeTag}
        </span>
      )}
      {/* Chinese title — always visible for grader */}
      <span className={`font-chinese text-lg md:text-xl tracking-wider ${accentColor} opacity-80`}>
        {chineseTitle}
      </span>
      {/* English title */}
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-stone-100 leading-tight">
        {englishTitle}
      </h2>
      {/* Decorative line */}
      <div className={`flex gap-1.5 mt-1 ${center ? 'justify-center' : ''}`}>
        <div className={`h-0.5 w-16 ${accentBg} rounded-full`} />
        <div className={`h-0.5 w-4 ${accentBg} opacity-40 rounded-full`} />
        <div className={`h-0.5 w-2 ${accentBg} opacity-20 rounded-full`} />
      </div>
      {subtitle && (
        <p className="text-stone-400 text-base md:text-lg max-w-2xl leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
