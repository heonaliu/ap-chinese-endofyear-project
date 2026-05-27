'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LanguageContext'

// ── Comparison Data ───────────────────────────────────────────
const comparisons = [
  {
    category: { en: 'Workload', zh: '学业负担' },
    china: {
      label: { en: 'Very High', zh: '非常重' },
      detail: {
        en: 'Students study 12–14 hours a day including homework. High pressure to perform, especially for 高考 (gaokao).',
        zh: '学生每天包括作业在内要学习12-14小时。尤其是为高考备考，学习压力极大。',
      },
    },
    usa: {
      label: { en: 'Moderate', zh: '适中' },
      detail: {
        en: 'More balanced approach with extracurriculars. AP courses add pressure but overall pace is less intensive.',
        zh: '课外活动更多，学业更均衡。AP课程增加了压力，但整体节奏不那么紧张。',
      },
    },
  },
  {
    category: { en: 'Class Schedule', zh: '课程时间' },
    china: {
      label: { en: '7:30 AM – 5:00 PM+', zh: '7:30–17:00以上' },
      detail: {
        en: 'Long school days with multiple subjects. Some evening self-study sessions after dinner.',
        zh: '学校时间长，科目多。晚饭后有些还有晚自习。',
      },
    },
    usa: {
      label: { en: '8:00 AM – 3:00 PM', zh: '8:00–15:00' },
      detail: {
        en: 'Standard 7-hour school day with more free time after school for activities, sports, and jobs.',
        zh: '标准7小时学校日，课后有更多时间参加活动、运动和打工。',
      },
    },
  },
  {
    category: { en: 'Classroom Participation', zh: '课堂参与' },
    china: {
      label: { en: 'Teacher-led', zh: '以教师为主' },
      detail: {
        en: 'Lectures are dominant. Students listen quietly and take notes. Raising hands to speak is more formal.',
        zh: '以讲授为主。学生安静听讲，做笔记。举手发言更加正式。',
      },
    },
    usa: {
      label: { en: 'Discussion-based', zh: '以讨论为主' },
      detail: {
        en: 'Students are encouraged to debate, question, and engage actively. Class participation grades are common.',
        zh: '鼓励学生辩论、提问并积极参与。课堂参与分数很常见。',
      },
    },
  },
  {
    category: { en: 'Technology in Class', zh: '课堂技术' },
    china: {
      label: { en: 'Minimal', zh: '极少' },
      detail: {
        en: 'Phones are not allowed. Learning is text and blackboard-focused. Few digital tools.',
        zh: '禁止使用手机。学习以课本和黑板为主。数字工具很少。',
      },
    },
    usa: {
      label: { en: 'Integrated', zh: '广泛整合' },
      detail: {
        en: 'Chromebooks, Google Classroom, and digital submissions are standard. Phones occasionally allowed.',
        zh: 'Chromebook、谷歌课堂和数字提交已成标配。偶尔允许使用手机。',
      },
    },
  },
  {
    category: { en: 'Extracurriculars', zh: '课外活动' },
    china: {
      label: { en: 'Academic-focused', zh: '学术导向' },
      detail: {
        en: 'Most activities center on academics, music, or competitions. Sports exist but aren\'t the social centerpiece.',
        zh: '大多数活动以学业、音乐或竞赛为中心。有体育活动，但不是社交的核心。',
      },
    },
    usa: {
      label: { en: 'Diverse & central', zh: '多元且核心' },
      detail: {
        en: 'Sports, arts, clubs, and student government are central to school identity and social life.',
        zh: '体育、艺术、社团和学生会是学校认同和社会生活的核心。',
      },
    },
  },
  {
    category: { en: 'Teacher Relationships', zh: '师生关系' },
    china: {
      label: { en: 'Respectful & formal', zh: '尊重且正式' },
      detail: {
        en: 'Teachers hold high social status. Students bow or stand when greeting. Informal contact is limited.',
        zh: '教师地位很高。学生鞠躬或站立问候。非正式接触有限。',
      },
    },
    usa: {
      label: { en: 'Approachable', zh: '易于接触' },
      detail: {
        en: 'Students often address teachers by first name. Casual conversation and informal mentorship are common.',
        zh: '学生经常直呼老师名字。随意的交谈和非正式的辅导很常见。',
      },
    },
  },
  {
    category: { en: 'Independence', zh: '自主性' },
    china: {
      label: { en: 'Guided structure', zh: '有引导的结构' },
      detail: {
        en: 'Daily schedules are tightly managed. Students follow collective routines including cleaning, exercises, and meals.',
        zh: '日程安排严格管理。学生遵循集体作息，包括打扫卫生、做操和用餐。',
      },
    },
    usa: {
      label: { en: 'Individual choice', zh: '个人选择' },
      detail: {
        en: 'Students manage their own time more independently. Course selection, lunch, and after-school time are self-directed.',
        zh: '学生更独立地管理自己的时间。选课、午餐和课后时间由自己决定。',
      },
    },
  },
  {
    category: { en: 'Student Culture', zh: '学生文化' },
    china: {
      label: { en: 'Collective identity', zh: '集体认同' },
      detail: {
        en: 'Class cohesion is emphasized. Students cheer for their homeroom class, not just themselves.',
        zh: '强调班集体凝聚力。学生为班级加油，而不仅仅是为自己。',
      },
    },
    usa: {
      label: { en: 'Individual expression', zh: '个人表达' },
      detail: {
        en: 'Personal identity and self-expression are highly valued. Individuality in clothing, interests, and opinions is encouraged.',
        zh: '个人身份认同和自我表达受到高度重视。鼓励在服装、兴趣和观点上表达个性。',
      },
    },
  },
]

function ComparisonRow({
  item,
  index,
}: {
  item: typeof comparisons[0]
  index: number
}) {
  const { t } = useLang()
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
    >
      {/* Category header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-6 py-4 bg-stone-900 hover:bg-stone-800/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-accent-gold font-chinese text-base font-medium">
            {t(item.category)}
          </span>
          {t(item.category) !== item.category.zh && (
            <span className="font-chinese text-stone-500 text-sm">{item.category.zh}</span>
          )}
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="text-stone-500 text-xs"
        >
          ▼
        </motion.span>
      </button>

      {/* Comparison columns — always visible summary */}
      <div className="grid grid-cols-2">
        <div className="split-china px-4 py-3 bg-accent-red/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🇨🇳</span>
            <span className="text-accent-red text-xs font-semibold uppercase tracking-wide">China</span>
          </div>
          <p className="text-stone-200 text-sm font-chinese">{t(item.china.label)}</p>
        </div>
        <div className="split-usa px-4 py-3 bg-blue-950/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🇺🇸</span>
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-wide">USA</span>
          </div>
          <p className="text-stone-200 text-sm">{t(item.usa.label)}</p>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 border-t border-white/5">
              <div className="px-4 py-4 bg-accent-red/5 border-r border-white/5">
                <p className="text-stone-400 text-xs leading-relaxed">{t(item.china.detail)}</p>
              </div>
              <div className="px-4 py-4 bg-blue-950/10">
                <p className="text-stone-400 text-xs leading-relaxed">{t(item.usa.detail)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * CulturalComparison — AP Theme: 文化比较 (Cultural Comparison)
 * IMPORTANT FOR RUBRIC. Interactive split-screen comparison between Chinese and American school life.
 * Click each row to expand for detailed descriptions.
 */
export default function CulturalComparison() {
  const { t } = useLang()

  return (
    <section id="culture" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="文化比较"
        englishTitle="Cultural Comparison"
        subtitle={t({
          en: 'A side-by-side look at how education and student life differ between China and the United States — drawn from my direct experience at Jingshan School.',
          zh: '从我在景山学校的亲身经历出发，并排呈现中美两国教育和学生生活的差异。',
        })}
        themeTag="文化比较 · Cultural Comparison"
      />

      {/* Column headers */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 mb-4"
      >
        <div className="flex items-center gap-3 px-6 py-3 bg-accent-red/10 rounded-xl border border-accent-red/20">
          <span className="text-3xl">🇨🇳</span>
          <div>
            <p className="font-chinese text-accent-red text-base font-semibold">中国 · China</p>
            <p className="text-stone-500 text-xs">Jingshan School, Beijing</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-blue-950/30 rounded-xl border border-blue-800/30">
          <span className="text-3xl">🇺🇸</span>
          <div>
            <p className="text-blue-300 text-base font-semibold">United States · 美国</p>
            <p className="text-stone-500 text-xs">My school in the US</p>
          </div>
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-stone-600 text-xs text-center mb-6"
      >
        Click any row to expand for detailed descriptions · 点击每行查看详细说明
      </motion.p>

      {/* Comparison rows */}
      <div className="space-y-3 mb-16">
        {comparisons.map((item, i) => (
          <ComparisonRow key={i} item={item} index={i} />
        ))}
      </div>

      {/* Reflective paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="p-8 md:p-12 card-dark rounded-2xl border border-accent-gold/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 font-chinese text-[10rem] text-stone-800/20 leading-none select-none pointer-events-none">
          比
        </div>
        <div className="relative">
          <p className="font-chinese text-accent-gold/80 text-sm mb-3">文化反思 · Cultural Reflection</p>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-100 mb-6 leading-tight">
            What This Experience Changed in Me
          </h3>
          <p className="text-stone-300 text-base leading-relaxed mb-4 max-w-3xl">
            {t({
              en: `This experience changed my understanding of education and showed me how culture influences daily student life. In China, education is deeply tied to collective responsibility, respect for elders, and a long-term view of success. In the US, we emphasize individual voice and personal growth. Neither is "better" — they reflect different values and different answers to the same question: what is school for?`,
              zh: `这段经历改变了我对教育的理解，让我看到文化如何影响学生的日常生活。在中国，教育与集体责任、尊老爱幼和对成功的长远眼光紧密相连。在美国，我们强调个人声音和个人成长。两者都没有"更好"——它们反映了不同的价值观，以及对同一问题不同的回答：学校是为了什么？`,
            })}
          </p>
          <blockquote className="quote-block py-2">
            <p className="font-chinese text-stone-300 text-base">
              "不同的文化，相同的梦想——让每个学生都能发光。"
            </p>
            <p className="text-stone-500 text-xs mt-1 italic">
              "Different cultures, the same dream — to let every student shine."
            </p>
          </blockquote>
        </div>
      </motion.div>
    </section>
  )
}
