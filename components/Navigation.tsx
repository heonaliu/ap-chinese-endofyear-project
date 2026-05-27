'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Globe } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

const navLinks = [
  { label: 'Overview', zhLabel: '概述', href: '#overview' },
  { label: 'Exchange', zhLabel: '交流', href: '#exchange' },
  { label: '学校生活', zhLabel: '学校生活', href: '#school-life' },
  { label: '寄宿家庭', zhLabel: '寄宿家庭', href: '#host-family' },
  { label: '文化比较', zhLabel: '文化比较', href: '#culture' },
  { label: 'Gallery', zhLabel: '图库', href: '#gallery' },
  { label: '反思', zhLabel: '反思', href: '#reflection' },
]

/**
 * Navigation — Fixed top bar with:
 * - Bilingual site title
 * - Section nav links
 * - Language toggle (EN ↔ 中文)
 * - Theme toggle (dark ↔ light)
 * - Mobile hamburger menu
 */
export default function Navigation() {
  const { lang, toggleLang } = useLang()
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const dark = stored ? stored === 'dark' : true
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = !isDark
    setIsDark(next)
    const cls = document.documentElement.classList
    cls.toggle('dark', next)
    cls.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastScrollY && y > 80)
      setLastScrollY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-stone-950/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex flex-col leading-none group"
          >
            <span className="font-chinese text-accent-red text-lg tracking-widest group-hover:text-accent-red-light transition-colors">
              终身学习
            </span>
            <span className="font-serif text-[10px] text-stone-400 tracking-widest uppercase">
              Life Long Learning
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-stone-400 hover:text-stone-100 text-sm font-medium transition-colors duration-200 hover:text-accent-gold font-chinese"
              >
                {lang === 'zh' ? link.zhLabel : link.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-accent-red/50 text-stone-400 hover:text-stone-200 text-xs font-medium transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe size={12} />
              <span>{lang === 'en' ? '中文' : 'EN'}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:border-accent-gold/50 text-stone-400 hover:text-stone-200 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden p-2 text-stone-400 hover:text-stone-200 transition-colors"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-stone-950 border-l border-white/5 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-3 px-4 text-stone-300 hover:text-white hover:bg-white/5 rounded-lg font-chinese text-base transition-all duration-200"
                  >
                    {link.label}
                    {link.zhLabel !== link.label && (
                      <span className="ml-2 text-stone-500 text-sm">{link.zhLabel}</span>
                    )}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-white/5">
                <p className="text-stone-600 text-xs text-center">
                  Heona Liu · AP Chinese · 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
