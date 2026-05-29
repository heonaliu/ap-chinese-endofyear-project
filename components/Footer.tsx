'use client'

import { motion } from 'framer-motion'

const navLinks = [
  { label: '项目概述', href: '#overview' },
  { label: '交流项目', href: '#exchange' },
  { label: '寄宿家庭', href: '#host-family' },
  { label: '摄影集', href: '#gallery' },
  { label: '最终反思', href: '#reflection' },
]

const themes = [
  '学校生活',
  '文化比较',
  '自我认同',
  '家庭与关系',
  '社区与友谊',
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-stone-950 border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-red/3 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 font-chinese text-[20rem] text-stone-800/10 leading-none select-none">
          学
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-chinese text-accent-red text-2xl tracking-widest mb-1">终身学习</p>
              <p className="font-serif text-stone-400 text-sm mb-4">Life Long Learning</p>
              <p className="text-stone-600 text-xs leading-relaxed max-w-xs">
                An interactive storytelling website documenting the Jingshan School exchange experience. Created for AP Chinese Language and Culture, 2026.
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Sections · 章节
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-chinese text-stone-500 hover:text-stone-300 text-sm text-left transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Themes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">
              AP Themes · 课程主题
            </p>
            <div className="space-y-2">
              {themes.map(theme => (
                <div key={theme} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent-red flex-shrink-0" />
                  <span className="font-chinese text-stone-500 text-sm">{theme}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider with decorative elements */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-stone-800" />
          <span className="font-chinese text-stone-600 text-sm">景山学校</span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-stone-500 text-sm">
              <span className="text-stone-300 font-medium">Heona Liu</span>
              {' · '}
              <span className="font-chinese">廖恩美</span>
              {' · '}
              AP Chinese Language and Culture
              {' · '}
              <span className="text-accent-gold">2026</span>
            </p>
          </motion.div>

          {/* Chinese calligraphy-inspired accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="h-px w-8 bg-accent-red/40" />
            <span className="font-chinese text-stone-600 text-xs tracking-widest">
              学而时习之，不亦说乎
            </span>
            <div className="h-px w-8 bg-accent-red/40" />
          </motion.div>
        </div>

        {/* Confucius quote translation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-stone-700 text-[11px] mt-3 italic"
        >
          "Is it not a joy to learn and to practice what you have learned?" — Confucius, Analects · 《论语》
        </motion.p>
      </div>
    </footer>
  )
}
