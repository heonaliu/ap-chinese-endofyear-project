'use client'

import { motion } from 'framer-motion'
import { Star, TrendingUp, MessageSquare } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LanguageContext'

// ── Reflection Questions ──────────────────────────────────────
const reflections = [
  {
    number: '一',
    romanNumber: '01',
    icon: <Star size={20} />,
    question: { en: 'What am I most proud of?', zh: '我最骄傲的是什么？' },
    chinesePrompt: '自豪与成就',
    prompt: {
      en: `[ Write your answer here: What did you accomplish during this exchange that you are most proud of? Was it a language breakthrough, a cultural connection you made, overcoming homesickness, or a specific achievement at school? Be specific and personal. ]`,
      zh: `[ 在这里写你的答案：在这次交流中，你最引以为豪的成就是什么？是语言上的突破、建立的文化联系、克服思乡之情，还是在学校取得的特定成就？请具体而真实。 ]`,
    },
    reflection: {
      en: `"What I am most proud of from this exchange is…"`,
      zh: `"这次交流让我最骄傲的是……"`,
    },
    chineseReflection: '能够用中文与景山同学们进行真正的对话，让我深感骄傲。',
    accent: 'red' as const,
  },
  {
    number: '二',
    romanNumber: '02',
    icon: <TrendingUp size={20} />,
    question: { en: 'What was the most difficult part?', zh: '最困难的部分是什么？' },
    chinesePrompt: '挑战与成长',
    prompt: {
      en: `[ Write your answer here: What was the hardest challenge you faced during the exchange? Was it the language barrier, cultural misunderstandings, homesickness, the academic intensity, or adjusting to a new living environment? How did you overcome it? ]`,
      zh: `[ 在这里写你的答案：交流期间你面临的最大挑战是什么？是语言障碍、文化误解、思乡之情、学业强度，还是适应新的生活环境？你是如何克服的？ ]`,
    },
    reflection: {
      en: `"The most challenging part of this journey was…"`,
      zh: `"这段旅程中最具挑战性的部分是……"`,
    },
    chineseReflection: '刚开始时，我在语言上遇到了很多困难，但每一次突破都让我更加坚强。',
    accent: 'gold' as const,
  },
  {
    number: '三',
    romanNumber: '03',
    icon: <MessageSquare size={20} />,
    question: { en: 'What did I improve in Chinese?', zh: '我的中文有哪些进步？' },
    chinesePrompt: '语言进步',
    prompt: {
      en: `[ Write your answer here: Be specific about your Chinese language growth. Did your listening improve? Could you hold conversations you couldn't before? What vocabulary areas grew? Did you improve your tones, reading, or writing? Give a specific example of a moment when you realized your Chinese had improved. ]`,
      zh: `[ 在这里写你的答案：具体描述你的中文语言进步。你的听力提高了吗？你能进行以前不能进行的对话吗？哪些词汇领域有所增长？你的声调、阅读或写作有所改善吗？举一个你意识到中文进步的具体例子。 ]`,
    },
    reflection: {
      en: `"In terms of my Chinese language, I grew the most in…"`,
      zh: `"在中文方面，我进步最大的是……"`,
    },
    chineseReflection: '通过每天的沉浸式学习，我的口语和听力都有了显著提高。',
    accent: 'red' as const,
  },
]

const closingPrompts = [
  { en: 'What I learned about myself…', zh: '我对自己的了解……' },
  { en: 'How this experience changed my perspective…', zh: '这段经历如何改变了我的视角……' },
  { en: 'What I will remember most…', zh: '我最难忘的……' },
]

interface ReflectionCardProps {
  item: typeof reflections[0]
  index: number
}

function ReflectionCard({ item, index }: ReflectionCardProps) {
  const { t } = useLang()
  const isRed = item.accent === 'red'
  const accentText = isRed ? 'text-accent-red' : 'text-accent-gold'
  const accentBg = isRed ? 'bg-accent-red/10' : 'bg-accent-gold/10'
  const accentBorder = isRed ? 'border-accent-red/20' : 'border-accent-gold/20'
  const numColor = isRed ? 'text-accent-red/20' : 'text-accent-gold/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative card-dark rounded-2xl border ${accentBorder} p-8 overflow-hidden`}
    >
      {/* Large background number */}
      <span className={`absolute top-4 right-6 font-chinese text-8xl font-bold ${numColor} select-none leading-none`}>
        {item.number}
      </span>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${accentBg} ${accentText}`}>{item.icon}</div>
          <span className={`font-chinese text-sm ${accentText} opacity-70`}>{item.chinesePrompt}</span>
        </div>

        {/* Question */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-100 mb-1">
          {t(item.question)}
        </h3>
        <p className={`font-chinese text-base ${accentText} opacity-60 mb-6`}>
          {item.question.zh}
        </p>

        {/* Chinese reflection — always shown */}
        <div className={`p-4 rounded-xl ${accentBg} mb-6`}>
          <p className="font-chinese text-stone-200 text-base leading-relaxed">
            {item.chineseReflection}
          </p>
        </div>

        {/* English reflection prompt (bold italic quote style) */}
        <p className="font-serif text-stone-400 text-lg italic leading-relaxed mb-4">
          {t(item.reflection)}
        </p>

        {/* Story placeholder */}
        <div className="p-4 bg-stone-900 rounded-xl border border-dashed border-stone-700">
          <p className="text-stone-500 text-sm italic leading-relaxed">
            {t(item.prompt)}
          </p>
          <p className="text-stone-700 text-xs mt-3 font-chinese">
            [ 替换为你真实的反思内容 · Replace with your genuine reflection ]
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * FinalReflection — AP Theme: 自我认同与个人经历 (Identity & Personal Experience)
 * VERY IMPORTANT FOR FINAL GRADING. Replace all placeholder text with your genuine reflections.
 */
export default function FinalReflection() {
  const { t } = useLang()

  return (
    <section id="reflection" className="section-padding max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="最终反思"
        englishTitle="Final Reflection"
        subtitle={t({
          en: 'A personal look back at the exchange experience — what I learned, what challenged me, and how it changed me.',
          zh: '对交流经历的个人回顾——我学到了什么，什么挑战了我，以及它如何改变了我。',
        })}
        themeTag="自我认同 · Identity & Personal Experience"
        center
      />

      {/* Opening quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <div className="text-6xl text-accent-red/20 font-serif leading-none mb-4">"</div>
        <p className="font-chinese text-stone-200 text-xl md:text-2xl leading-relaxed mb-3">
          "不经历风雨，怎么见彩虹？"
        </p>
        <p className="text-stone-500 text-base italic">
          "Without going through hardship, how can one see the rainbow?"
        </p>
        <p className="text-stone-600 text-xs mt-3">— Chinese proverb · 中国谚语</p>
      </motion.div>

      {/* Reflection cards */}
      <div className="space-y-8 mb-16">
        {reflections.map((item, i) => (
          <ReflectionCard key={i} item={item} index={i} />
        ))}
      </div>

      {/* Closing prompts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="p-8 md:p-12 card-dark rounded-2xl border border-accent-gold/10 relative overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 font-chinese text-[12rem] text-stone-800/10 leading-none select-none pointer-events-none">
          思
        </div>
        <div className="relative">
          <p className="font-chinese text-accent-gold/80 text-sm mb-3">最终感想 · Closing Thoughts</p>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-100 mb-8">In Closing</h3>

          <div className="space-y-6 mb-10">
            {closingPrompts.map((prompt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-red/20 text-accent-red flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-chinese text-accent-gold/70 text-sm mb-1">{prompt.zh}</p>
                  <p className="text-stone-400 text-sm italic">{prompt.en}</p>
                  <div className="mt-2 p-3 bg-stone-900 rounded-lg border border-dashed border-stone-700">
                    <p className="text-stone-600 text-xs">
                      [ Write your genuine reflection here for this prompt ]
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Chinese statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center py-8 border-t border-stone-800"
          >
            <p className="font-chinese text-accent-gold text-2xl md:text-3xl leading-relaxed mb-3">
              "终身学习，永远前行。"
            </p>
            <p className="text-stone-500 text-base italic">
              "Lifelong learning, always moving forward."
            </p>
            <p className="text-stone-600 text-sm mt-4">
              — Heona Liu · AP Chinese · 景山学校交流项目 · 2026
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* AP Theme summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-10 p-6 rounded-xl border border-white/5 bg-stone-900/50"
      >
        <p className="text-stone-500 text-xs text-center mb-4 tracking-wider uppercase">
          AP Course Themes Covered · 涵盖的AP课程主题
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { en: 'School Life', zh: '学校生活' },
            { en: 'Cultural Comparison', zh: '文化比较' },
            { en: 'Identity', zh: '自我认同' },
            { en: 'Family & Relationships', zh: '家庭与关系' },
            { en: 'Community & Friendship', zh: '社区与友谊' },
          ].map(theme => (
            <span
              key={theme.en}
              className="px-4 py-2 rounded-full bg-stone-800 border border-stone-700 text-xs flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red flex-shrink-0" />
              <span className="text-stone-300">{theme.en}</span>
              <span className="font-chinese text-stone-500">{theme.zh}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
