'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Coffee, Bike, MessageCircle, Heart, ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { useLang } from '@/contexts/LanguageContext'

// ── Journal Entry Data ─────────────────────────────────────────
const journalEntries = [
  {
    icon: <Coffee size={18} />,
    title: { en: 'Meals Together', zh: '一起用餐' },
    chineseDate: '第一周 · Week One',
    chineseLabel: '饭桌上的文化',
    prompt: { en: 'One dinner conversation I remember…', zh: '我记得的一次晚餐对话……' },
    story: {
      en: `[ Write your story here: Describe a specific meal with your host family. What did you eat? What did you talk about? Were there any awkward moments? What did you learn about Chinese family culture from the dinner table? ]`,
      zh: `[ 在这里写你的故事：描述与寄宿家庭的一次具体用餐。你们吃了什么？谈了什么？有什么尴尬时刻？从饭桌上你了解到了什么中国家庭文化？ ]`,
    },
    chineseReflection: '用餐时，家人之间的交流让我感受到了中国家庭温暖的氛围。',
    accent: 'red' as const,
  },
  {
    icon: <Bike size={18} />,
    title: { en: 'Getting Around', zh: '日常出行' },
    chineseDate: '第一周 · Week One',
    chineseLabel: '交通与城市生活',
    prompt: { en: 'Navigating Beijing with my host student…', zh: '和寄宿同学一起游历北京……' },
    story: {
      en: `[ Write your story here: How did you get to school each day? By subway, bus, or scooter? Describe the experience of commuting in Beijing. How did it feel compared to getting to school in the US? ]`,
      zh: `[ 在这里写你的故事：你每天怎么上学？乘地铁、公交还是电动车？描述在北京通勤的体验。与美国上学相比感觉如何？ ]`,
    },
    chineseReflection: '北京的公共交通让我大开眼界——这座城市的规模令人叹为观止。',
    accent: 'gold' as const,
  },
  {
    icon: <MessageCircle size={18} />,
    title: { en: 'Language Moments', zh: '语言时刻' },
    chineseDate: '整个交流期间 · Throughout',
    chineseLabel: '用中文交流的挑战',
    prompt: { en: 'A moment when my Chinese surprised them…', zh: '我的中文让他们惊讶的一刻……' },
    story: {
      en: `[ Write your story here: Describe specific moments when you had to use Chinese with your host family. Were there funny misunderstandings? When did you feel most proud of your language ability? What new words did you learn at home? ]`,
      zh: `[ 在这里写你的故事：描述你必须用中文与寄宿家庭交流的特定时刻。有没有有趣的误解？你什么时候对自己的语言能力最感到自豪？你在家里学到了哪些新词？ ]`,
    },
    chineseReflection: '当我用中文说出一句完整的话时，他们脸上露出的惊喜让我既骄傲又开心。',
    accent: 'red' as const,
  },
  {
    icon: <Home size={18} />,
    title: { en: 'Daily Routines', zh: '日常作息' },
    chineseDate: '整个交流期间 · Throughout',
    chineseLabel: '家庭日常生活',
    prompt: { en: 'Something unfamiliar at first…', zh: '起初感到陌生的事……' },
    story: {
      en: `[ Write your story here: What were the morning and evening routines like? Describe the layout of the apartment. What surprised you most about how the family lived? Were there household customs you had to adapt to? ]`,
      zh: `[ 在这里写你的故事：早晨和晚上的作息是什么样的？描述公寓的布局。家庭生活方式中什么让你最惊讶？有哪些家庭习惯需要适应？ ]`,
    },
    chineseReflection: '中国家庭的日常生活与美国家庭有着微妙但深刻的差异。',
    accent: 'gold' as const,
  },
  {
    icon: <Heart size={18} />,
    title: { en: 'Feeling Welcomed', zh: '感受到被接纳' },
    chineseDate: '最难忘的时刻 · Most Memorable',
    chineseLabel: '温暖的款待',
    prompt: { en: 'A moment that made me feel welcomed…', zh: '让我感到被接纳的一刻……' },
    story: {
      en: `[ Write your story here: Describe the moment you felt most at home with your host family. Was it a meal, a conversation, a shared joke? How did their hospitality change your understanding of Chinese culture? ]`,
      zh: `[ 在这里写你的故事：描述你与寄宿家庭相处中最有家的感觉的时刻。是一顿饭、一次对话还是一个共同的玩笑？他们的热情款待如何改变了你对中国文化的理解？ ]`,
    },
    chineseReflection: '中国人的热情好客让我深深感动——他们把我当作自己家人一样对待。',
    accent: 'red' as const,
  },
]

function JournalCard({ entry, index }: { entry: typeof journalEntries[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const { t } = useLang()
  const accentText = entry.accent === 'red' ? 'text-accent-red' : 'text-accent-gold'
  const accentBg = entry.accent === 'red' ? 'bg-accent-red/10' : 'bg-accent-gold/10'
  const accentBorder = entry.accent === 'red' ? 'border-accent-red/20' : 'border-accent-gold/20'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`card-dark rounded-xl border ${accentBorder} overflow-hidden`}
    >
      <div className="p-6">
        {/* Journal header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${accentBg} ${accentText}`}>{entry.icon}</div>
            <div>
              <p className="text-stone-500 text-[10px] tracking-wider uppercase">{entry.chineseDate}</p>
              <h3 className="font-serif text-stone-100 font-semibold">{t(entry.title)}</h3>
            </div>
          </div>
          {/* Decorative "日记" (diary) */}
          <span className={`font-chinese text-xs ${accentText} opacity-40`}>日记</span>
        </div>

        {/* Chinese label */}
        <p className={`font-chinese text-sm ${accentText} opacity-70 mb-3`}>{entry.chineseLabel}</p>

        {/* Chinese reflection — always visible */}
        <div className={`p-3 rounded-lg ${accentBg} mb-4`}>
          <p className="font-chinese text-stone-300 text-sm leading-relaxed">
            {entry.chineseReflection}
          </p>
        </div>

        {/* Story prompt toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`flex items-center gap-2 text-sm ${accentText} hover:opacity-80 transition-opacity`}
        >
          <span className="font-chinese">{t(entry.prompt)}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Expandable story placeholder */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-stone-900 rounded-lg border border-dashed border-stone-700">
                <p className="text-stone-500 text-sm italic leading-relaxed">
                  {t(entry.story)}
                </p>
                <p className="text-stone-700 text-xs mt-3 font-chinese">
                  [ 替换为你的真实故事 · Replace with your actual experience ]
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/**
 * HostFamily — AP Theme: 家庭与关系 (Family & Relationships)
 * Replace all placeholder stories with your actual host family experiences.
 */
export default function HostFamily() {
  const { t } = useLang()

  return (
    <section id="host-family" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="寄宿家庭生活"
        englishTitle="Host Family Experience"
        subtitle={t({
          en: 'Living with a Chinese host student and their family gave me an inside view of daily life, hospitality, and family culture that no classroom could provide.',
          zh: '与中国寄宿同学及其家人共同生活，让我从内部了解了日常生活、热情好客和家庭文化——这是任何课堂都无法提供的。',
        })}
        themeTag="家庭与关系 · Family & Relationships"
      />

      {/* Photo collage row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-3 mb-16"
      >
        <PlaceholderImage label="Host family home / apartment" aspectRatio="portrait" />
        <PlaceholderImage label="Family meal / dinner table" aspectRatio="portrait" sublabel="一起吃饭" />
        <PlaceholderImage label="Host student & activities" aspectRatio="portrait" sublabel="寄宿同学" />
      </motion.div>

      {/* Intro quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 quote-block py-2 max-w-2xl"
      >
        <p className="font-chinese text-stone-300 text-base leading-relaxed mb-2">
          "家是心之所在，不论身在何处。"
        </p>
        <p className="text-stone-500 text-sm italic">
          "Home is where the heart is, no matter where you are." — Chinese saying
        </p>
      </motion.div>

      {/* Journal cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {journalEntries.map((entry, i) => (
          <JournalCard key={i} entry={entry} index={i} />
        ))}
      </div>

      {/* Full-width reflection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 card-dark rounded-2xl border border-accent-gold/10 bg-accent-gold/5"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="font-chinese text-accent-gold/80 text-sm mb-2">寄宿家庭总结 · Host Family Reflection</p>
            <h3 className="font-serif text-2xl text-stone-100 mb-4">What Living with a Family Taught Me</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              {t({
                en: `[ Write a paragraph here about your overall experience living with your host family. What was the most meaningful part? How did it change your understanding of Chinese family values — concepts like 孝顺 (filial piety), 面子 (face), or 勤劳 (diligence)? ]`,
                zh: `[ 在这里写一段关于与寄宿家庭生活的整体感受。最有意义的是什么？它如何改变了你对中国家庭价值观的理解——例如孝顺、面子或勤劳？ ]`,
              })}
            </p>
          </div>
          <div className="md:w-48 flex-shrink-0">
            <PlaceholderImage label="Memorable host family moment" aspectRatio="square" />
          </div>
        </div>

        {/* Chinese vocabulary from the experience */}
        <div className="mt-6 pt-6 border-t border-stone-800">
          <p className="text-stone-500 text-xs mb-3">Words I learned at home · 在家里学到的词</p>
          <div className="flex flex-wrap gap-2">
            {[
              { zh: '孝顺', en: 'filial piety' },
              { zh: '热情', en: 'hospitality' },
              { zh: '家常菜', en: 'home-cooked food' },
              { zh: '关心', en: 'caring' },
              { zh: '面子', en: '"face" / reputation' },
              { zh: '勤劳', en: 'diligence' },
            ].map(word => (
              <span key={word.zh} className="px-3 py-1.5 bg-stone-800 rounded-full border border-stone-700 flex items-center gap-2">
                <span className="font-chinese text-accent-gold text-sm">{word.zh}</span>
                <span className="text-stone-500 text-xs">{word.en}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
