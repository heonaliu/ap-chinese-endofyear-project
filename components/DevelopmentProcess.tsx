'use client'

import { motion } from 'framer-motion'
import { FileText, Image, Code, Edit3, Lightbulb, CheckCircle2, Circle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { useLang } from '@/contexts/LanguageContext'

// ── Week Timeline ─────────────────────────────────────────────
const weeks = [
  {
    week: 'Week 1',
    zhWeek: '第一周',
    phase: 'Planning',
    zhPhase: '计划阶段',
    color: 'accent-gold',
    status: 'complete' as const,
    tasks: [
      'Brainstorm project topic and themes',
      'Choose project format (website)',
      'Map out AP course theme connections',
      'Draft initial storyboard / outline',
      'Begin collecting and organizing photos',
      'Write first script draft',
    ],
    zhTasks: [
      '头脑风暴项目主题',
      '选择项目形式（网站）',
      '规划AP课程主题联系',
      '起草初步故事板/大纲',
      '开始收集和整理照片',
      '撰写第一稿脚本',
    ],
  },
  {
    week: 'Week 2',
    zhWeek: '第二周',
    phase: 'Production',
    zhPhase: '制作阶段',
    color: 'accent-red',
    status: 'complete' as const,
    tasks: [
      'Build Next.js website structure',
      'Design layout and visual system',
      'Write bilingual section content',
      'Add Framer Motion animations',
      'Integrate photo placeholders',
      'Build cultural comparison section',
    ],
    zhTasks: [
      '构建Next.js网站结构',
      '设计布局和视觉系统',
      '编写双语内容',
      '添加Framer Motion动画',
      '整合照片占位符',
      '构建文化比较部分',
    ],
  },
  {
    week: 'Week 3',
    zhWeek: '第三周',
    phase: 'Final Editing',
    zhPhase: '最终编辑',
    color: 'accent-gold',
    status: 'current' as const,
    tasks: [
      'Replace placeholders with real stories',
      'Upload actual photos to gallery',
      'Write final reflection section',
      'Proofread Chinese text',
      'Optimize for mobile display',
      'Final review and polish',
    ],
    zhTasks: [
      '用真实故事替换占位符',
      '上传实际照片到图库',
      '撰写最终反思',
      '校对中文文本',
      '优化移动端显示',
      '最终审阅和完善',
    ],
  },
]

// ── Process Cards ─────────────────────────────────────────────
const processCards = [
  {
    icon: <Edit3 size={18} />,
    label: 'Script Draft',
    zhLabel: '脚本初稿',
    description: {
      en: 'Written outline of all stories, reflections, and Chinese content planned for each section.',
      zh: '每个部分所有故事、反思和中文内容的书面大纲。',
    },
    type: 'text',
    accent: 'red' as const,
  },
  {
    icon: <FileText size={18} />,
    label: 'Storyboard',
    zhLabel: '故事板',
    description: {
      en: 'Visual layout plan showing section order, image placement, and design direction.',
      zh: '显示章节顺序、图片位置和设计方向的视觉布局计划。',
    },
    type: 'image',
    accent: 'gold' as const,
  },
  {
    icon: <Image size={18} />,
    label: 'Photo Selection',
    zhLabel: '照片选择',
    description: {
      en: 'Curating and organizing exchange program photographs for each section of the website.',
      zh: '为网站每个部分整理和组织交流项目照片。',
    },
    type: 'image',
    accent: 'red' as const,
  },
  {
    icon: <Code size={18} />,
    label: 'Website Development',
    zhLabel: '网站开发',
    description: {
      en: 'Building the React.js/Next.js website with all components, animations, and bilingual functionality.',
      zh: '构建包含所有组件、动画和双语功能的React.js/Next.js网站。',
    },
    type: 'code',
    accent: 'gold' as const,
  },
  {
    icon: <Lightbulb size={18} />,
    label: 'Reflection Notes',
    zhLabel: '反思笔记',
    description: {
      en: 'Personal journal entries and reflections written throughout the project development process.',
      zh: '在整个项目开发过程中撰写的个人日记和反思。',
    },
    type: 'text',
    accent: 'red' as const,
  },
]

function WeekCard({ week, index }: { week: typeof weeks[0]; index: number }) {
  const { t, lang } = useLang()
  const isRed = week.color === 'accent-red'
  const accentText = isRed ? 'text-accent-red' : 'text-accent-gold'
  const accentBg = isRed ? 'bg-accent-red' : 'bg-accent-gold'
  const accentBorder = isRed ? 'border-accent-red/30' : 'border-accent-gold/30'
  const tasks = lang === 'zh' ? week.zhTasks : week.tasks

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`card-dark rounded-xl border ${accentBorder} overflow-hidden`}
    >
      {/* Header */}
      <div className={`px-6 py-4 bg-gradient-to-r ${isRed ? 'from-accent-red/10' : 'from-accent-gold/10'} to-transparent border-b border-white/5`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-stone-500 text-xs uppercase tracking-widest">
              {lang === 'zh' ? week.zhWeek : week.week}
            </p>
            <h3 className={`font-serif text-xl font-semibold ${accentText}`}>
              {lang === 'zh' ? week.zhPhase : week.phase}
            </h3>
          </div>
          <div className={`w-10 h-10 rounded-full ${accentBg} flex items-center justify-center text-white font-bold font-serif`}>
            {index + 1}
          </div>
        </div>
      </div>

      {/* Task list */}
      <div className="p-5 space-y-2.5">
        {tasks.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="flex items-start gap-2.5"
          >
            {week.status === 'complete' ? (
              <CheckCircle2 size={14} className={`${accentText} flex-shrink-0 mt-0.5`} />
            ) : (
              <Circle size={14} className="text-stone-600 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${week.status === 'complete' ? 'text-stone-300' : 'text-stone-500'} font-chinese`}>
              {task}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ProcessCard({ card, index }: { card: typeof processCards[0]; index: number }) {
  const { t } = useLang()
  const isRed = card.accent === 'red'
  const accentText = isRed ? 'text-accent-red' : 'text-accent-gold'
  const accentBg = isRed ? 'bg-accent-red/10' : 'bg-accent-gold/10'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-dark rounded-xl border border-white/5 overflow-hidden hover-glow"
    >
      {/* Screenshot/draft placeholder */}
      <PlaceholderImage
        label={`${card.label} — planning document`}
        sublabel={card.zhLabel}
        aspectRatio="video"
        icon={false}
      />

      <div className="p-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${accentBg} ${accentText} mb-3`}>
          {card.icon}
          <span className="text-xs font-semibold">{card.label}</span>
        </div>
        <p className="font-chinese text-stone-500 text-xs mb-2">{card.zhLabel}</p>
        <p className="text-stone-400 text-sm leading-relaxed">{t(card.description)}</p>
      </div>
    </motion.div>
  )
}

/**
 * DevelopmentProcess — Evidence of planning and production.
 * IMPORTANT: This section provides Week 2 production evidence for graders.
 * Replace placeholder screenshots with actual screenshots of your planning documents.
 */
export default function DevelopmentProcess() {
  const { t } = useLang()

  return (
    <section id="development" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="开发过程"
        englishTitle="Development Process"
        subtitle={t({
          en: 'Evidence of planning, production, and editing across three weeks of project development — from initial idea to finished website.',
          zh: '三周项目开发过程中规划、制作和编辑的证据——从初始想法到完成的网站。',
        })}
        themeTag="Evidence of Planning & Production"
      />

      {/* Week timeline */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-chinese text-accent-gold/80 text-sm mb-2"
        >
          项目时间线 · Project Timeline
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl text-stone-100 mb-8"
        >
          Three-Week Production Plan
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeks.map((week, i) => (
            <WeekCard key={i} week={week} index={i} />
          ))}
        </div>
      </div>

      {/* Process artifacts */}
      <div className="mb-12">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-chinese text-accent-red/80 text-sm mb-2"
        >
          制作证据 · Production Evidence
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl text-stone-100 mb-8"
        >
          Planning Artifacts
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {processCards.map((card, i) => (
            <ProcessCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Development notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 card-dark rounded-2xl border border-accent-red/10"
      >
        <p className="font-chinese text-accent-red/80 text-sm mb-2">技术说明 · Technical Notes</p>
        <h3 className="font-serif text-xl text-stone-100 mb-4">How This Website Was Built</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-stone-200 text-sm font-semibold mb-2">Framework</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Next.js 14 App Router with TypeScript. Component-based architecture with reusable UI elements for each section.
            </p>
          </div>
          <div>
            <h4 className="text-stone-200 text-sm font-semibold mb-2">Styling & Animation</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Tailwind CSS for layout and design tokens. Framer Motion for scroll-triggered animations and interactive elements.
            </p>
          </div>
          <div>
            <h4 className="text-stone-200 text-sm font-semibold mb-2">Bilingual System</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              React Context API for language state. Every piece of text has both English and Chinese versions, togglable via the nav bar.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
