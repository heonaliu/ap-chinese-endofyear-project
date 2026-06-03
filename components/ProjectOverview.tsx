'use client'

import { motion } from 'framer-motion'
import { BookOpen, Globe, Languages, Target, Layers } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LanguageContext'

// ── Data ──────────────────────────────────────────────────────

const themes = [
  { en: 'School Life', zh: '学校生活', color: 'text-accent-red' },
  { en: 'Cultural Comparison', zh: '文化比较', color: 'text-accent-gold' },
  { en: 'Identity & Personal Experience', zh: '自我认同与个人经历', color: 'text-accent-red' },
  { en: 'Family & Relationships', zh: '家庭与关系', color: 'text-accent-gold' },
  { en: 'Community & Friendship', zh: '社区与友谊', color: 'text-accent-red' },
]

const chineseUsage = [
  { en: 'Bilingual section headers', zh: '双语章节标题' },
  { en: 'Image captions in Chinese', zh: '中文图片说明' },
  { en: 'Reflective paragraphs', zh: '中文反思段落' },
  { en: 'Quote and phrase cards', zh: '中文引言与短语' },
  { en: 'Narration placeholders', zh: '叙述占位文字' },
  { en: 'Cultural vocabulary labels', zh: '文化词汇标注' },
]

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  zhTitle: string
  accent: 'red' | 'gold'
  children: React.ReactNode
  delay?: number
}

function InfoCard({ icon, title, zhTitle, accent, children, delay = 0 }: InfoCardProps) {
  const border = accent === 'red' ? 'border-accent-red/20 hover:border-accent-red/50' : 'border-accent-gold/20 hover:border-accent-gold/50'
  const iconColor = accent === 'red' ? 'text-accent-red bg-accent-red/10' : 'text-accent-gold bg-accent-gold/10'
  const glowColor = accent === 'red' ? 'rgba(220,38,38,0.08)' : 'rgba(217,119,6,0.08)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className={`relative card-dark p-6 rounded-xl border transition-all duration-300 ${border} group`}
      style={{ '--glow': glowColor } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 40px var(--glow)` }}
      />
      <div className="relative">
        <div className={`inline-flex p-2.5 rounded-lg ${iconColor} mb-4`}>
          {icon}
        </div>
        <div className="mb-1">
          <span className={`font-chinese text-xs ${accent === 'red' ? 'text-accent-red/70' : 'text-accent-gold/70'}`}>
            {zhTitle}
          </span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-stone-100 mb-4">{title}</h3>
        {children}
      </div>
    </motion.div>
  )
}

/**
 * ProjectOverview — Grader-facing project summary section.
 * Clearly shows: format, themes, Chinese usage, and purpose.
 * IMPORTANT FOR GRADING — keep this section clean and visible.
 */
export default function ProjectOverview() {
  const { t } = useLang()

  return (
    <section id="overview" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="项目概述"
        englishTitle="Project Overview"
        subtitle={t({
          en: 'This section provides a clear map of the project — themes, format, language use, and purpose — for teachers and graders.',
          zh: '项目主题、形式与目的概述。',
        })}
        themeTag="All Five AP Themes"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Format Card */}
        <InfoCard
          icon={<BookOpen size={18} />}
          title="Project Format"
          zhTitle="项目形式"
          accent="red"
          delay={0}
        >
          <div className="space-y-2">
            <p className="text-stone-400 text-sm leading-relaxed">
              {t({
                en: 'Interactive React.js storytelling website built with Next.js 14, Tailwind CSS, and Framer Motion animations.',
                zh: '用React.js制作的互动网站。',
              })}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Next.js 14', 'React.js', 'Tailwind CSS', 'Framer Motion'].map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </InfoCard>

        {/* Central Topic Card */}
        <InfoCard
          icon={<Target size={18} />}
          title="Central Topic"
          zhTitle="核心主题"
          accent="gold"
          delay={0.1}
        >
          <p className="text-stone-400 text-sm leading-relaxed">
            {t({
              en: 'Documenting my experience as an exchange student at Jingshan School in Beijing, comparing education, culture, and daily life between China and the United States.',
              zh: '记录我在景山学校的学习生活。',
            })}
          </p>
          <div className="mt-3 p-3 bg-stone-900 rounded-lg border border-stone-700">
            <p className="font-chinese text-accent-gold/80 text-xs leading-relaxed">
              "比较中美文化，探索个人成长。"
            </p>
          </div>
        </InfoCard>

        {/* Purpose Card */}
        <InfoCard
          icon={<Globe size={18} />}
          title="Project Purpose"
          zhTitle="项目目的"
          accent="red"
          delay={0.2}
        >
          <p className="text-stone-400 text-sm leading-relaxed">
            {t({
              en: 'To reflect on and share the cultural, educational, and personal growth experiences gained during the Jingshan exchange program through bilingual storytelling.',
              zh: '分享我的文化与成长经历。',
            })}
          </p>
        </InfoCard>

        {/* AP Themes Card */}
        <InfoCard
          icon={<Layers size={18} />}
          title="AP Course Themes"
          zhTitle="AP课程主题"
          accent="gold"
          delay={0.3}
        >
          <div className="space-y-2">
            {themes.map((theme, i) => (
              <motion.div
                key={theme.en}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-2"
              >
                <span className="text-accent-red text-xs mt-0.5">◆</span>
                <div>
                  <span className="text-stone-300 text-sm">{theme.en}</span>
                  <span className={`font-chinese text-xs ml-2 ${theme.color} opacity-70`}>
                    {theme.zh}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>

        {/* Chinese Usage Card */}
        <InfoCard
          icon={<Languages size={18} />}
          title="Chinese Language Usage"
          zhTitle="中文语言使用"
          accent="red"
          delay={0.4}
        >
          <div className="space-y-2">
            {chineseUsage.map((item, i) => (
              <motion.div
                key={item.en}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-accent-red flex-shrink-0" />
                <span className="text-stone-400 text-sm">{item.en}</span>
                <span className="font-chinese text-stone-600 text-xs">{item.zh}</span>
              </motion.div>
            ))}
          </div>
        </InfoCard>

        {/* Key Quote */}
        <InfoCard
          icon={<span className="text-2xl font-chinese">道</span>}
          title="Core Belief"
          zhTitle="核心信念"
          accent="gold"
          delay={0.5}
        >
          <blockquote className="quote-block">
            <p className="font-chinese text-stone-300 text-base leading-relaxed mb-3">
              "活到老，学到老。"
            </p>
            <p className="text-stone-500 text-xs italic">
              "Live until old age, study until old age." — Chinese proverb
            </p>
          </blockquote>
          <p className="text-stone-500 text-xs mt-3">
            This proverb captures the spirit of lifelong learning — the central idea of this project.
          </p>
        </InfoCard>
      </div>
    </section>
  )
}
