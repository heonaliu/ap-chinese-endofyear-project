'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Calendar, Plane, ChevronDown } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { useLang } from '@/contexts/LanguageContext'

// ── Timeline Data ─────────────────────────────────────────────
const timelineEvents = [
  {
    phase: { en: 'Before', zh: '出发前' },
    date: { en: 'Spring 2025', zh: '2025年春' },
    title: { en: 'Preparing for the Journey', zh: '准备旅程' },
    icon: <Calendar size={16} />,
    description: {
      en: `The application process, language preparation, and the mix of excitement and nervousness before leaving for China. I spent months studying extra Chinese vocabulary and reading about Beijing's culture.`,
      zh: `申请过程、语言准备，以及在出发前那种兴奋与紧张交织的心情。我花了几个月时间学习额外的中文词汇，阅读有关北京文化的资料。`,
    },
    color: 'accent-gold',
  },
  {
    phase: { en: 'Arrival', zh: '抵达' },
    date: { en: 'Summer 2025', zh: '2025年夏' },
    title: { en: 'First Steps in Beijing', zh: '北京的第一步' },
    icon: <Plane size={16} />,
    description: {
      en: `Landing at Beijing Capital International Airport and meeting my host student for the first time. The scale of the city, the sounds, the smells — everything was overwhelming in the best possible way.`,
      zh: `降落在北京首都国际机场，第一次见到我的寄宿同学。这座城市的规模、声音、气味——一切都以最美好的方式令人震撼。`,
    },
    color: 'accent-red',
  },
  {
    phase: { en: 'During', zh: '交流期间' },
    date: { en: 'Summer 2025', zh: '2025年夏' },
    title: { en: 'Living and Learning at Jingshan', zh: '在景山学习生活' },
    icon: <MapPin size={16} />,
    description: {
      en: `Three weeks immersed in a completely different educational environment. Attending classes, navigating school culture, joining group activities, and slowly becoming part of a new community.`,
      zh: `三周沉浸在完全不同的教育环境中。参加课程、了解学校文化、参与集体活动，慢慢成为新社区的一部分。`,
    },
    color: 'accent-gold',
  },
]

const storyCards = [
  {
    prompt: { en: 'Before arriving in China…', zh: '到达中国之前……' },
    placeholder: {
      en: '[ Write your story here: What did you know about China before going? What did you study? How did you prepare emotionally and practically? ]',
      zh: '[ 在这里写你的故事：出发前你对中国了解多少？你做了哪些准备？ ]',
    },
  },
  {
    prompt: { en: 'What I expected…', zh: '我的期待……' },
    placeholder: {
      en: '[ Write your story here: What did you imagine Chinese school would be like? How accurate were your expectations? ]',
      zh: '[ 在这里写你的故事：你想象中的中国学校是什么样的？你的期待有多准确？ ]',
    },
  },
  {
    prompt: { en: 'My first impressions…', zh: '我的第一印象……' },
    placeholder: {
      en: '[ Write your story here: Describe your first 24 hours in China. What surprised you most? ]',
      zh: '[ 在这里写你的故事：描述你在中国的前24小时。什么让你最惊讶？ ]',
    },
  },
]

function TimelineItem({
  event,
  index,
  isLast,
}: {
  event: typeof timelineEvents[0]
  index: number
  isLast: boolean
}) {
  const { t } = useLang()
  const accentClass = event.color === 'accent-red' ? 'bg-accent-red border-accent-red' : 'bg-accent-gold border-accent-gold'
  const textClass = event.color === 'accent-red' ? 'text-accent-red' : 'text-accent-gold'

  return (
    <motion.div
      className="flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-9 h-9 rounded-full border-2 ${accentClass} flex items-center justify-center text-white z-10`}>
          {event.icon}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-stone-700 to-transparent mt-2 min-h-[60px]" />}
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-1">
          <span className={`text-xs font-semibold uppercase tracking-wider ${textClass}`}>
            {t(event.phase)}
          </span>
          <span className="text-stone-600 text-xs">{t(event.date)}</span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-stone-100 mb-3">
          {t(event.title)}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
          {t(event.description)}
        </p>
      </div>
    </motion.div>
  )
}

interface StoryCardProps {
  card: typeof storyCards[0]
  index: number
}

function StoryCard({ card, index }: StoryCardProps) {
  const { t } = useLang()
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-dark rounded-xl overflow-hidden border border-white/5 hover:border-accent-red/20 transition-all duration-300"
    >
      {/* Image placeholder */}
      <PlaceholderImage
        label={`Story photo ${index + 1}`}
        sublabel="Jingshan exchange — travel / arrival"
        aspectRatio="wide"
      />

      <div className="p-5">
        <p className={`font-chinese text-accent-gold text-sm mb-2`}>
          {t(card.prompt)}
        </p>
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 text-stone-500 text-xs hover:text-stone-300 transition-colors mb-3"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Collapse' : 'Read story placeholder'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-stone-900 rounded-lg border border-dashed border-stone-700">
                <p className="text-stone-500 text-sm italic leading-relaxed">
                  {t(card.placeholder)}
                </p>
                <p className="text-stone-700 text-xs mt-3 font-chinese">
                  [ 在这里替换为你的真实故事 ]
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
 * AboutExchange — Background, timeline, and first-impression stories.
 * Replace placeholder text with your actual exchange experience narratives.
 */
export default function AboutExchange() {
  const { t } = useLang()

  return (
    <section id="exchange" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="交流项目介绍"
        englishTitle="About the Exchange"
        subtitle={t({
          en: 'Jingshan School (景山学校) is a prestigious experimental school in Beijing, China, known for its high academic standards and cultural programs. This section introduces the program, my motivations, and my first impressions.',
          zh: '景山学校是北京一所享有盛誉的实验学校，以其高学术标准和文化项目而闻名。本节介绍了该项目、我的动机和第一印象。',
        })}
        themeTag="Identity · Personal Experience"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="font-chinese text-accent-red/70 text-sm mb-2 block">项目时间线</span>
            <h3 className="font-serif text-2xl font-semibold text-stone-100">Journey Timeline</h3>
          </motion.div>

          <div>
            {timelineEvents.map((event, i) => (
              <TimelineItem
                key={i}
                event={event}
                index={i}
                isLast={i === timelineEvents.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right: Info + Photo */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/jingshan-campus.png"
                alt="Jingshan School campus"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* About the school */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card-dark p-6 rounded-xl border border-white/5"
          >
            <div className="flex items-start gap-3 mb-3">
              <MapPin size={16} className="text-accent-red mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-serif font-semibold text-stone-100 mb-1">
                  景山学校 · Jingshan School
                </h4>
                <span className="text-stone-500 text-xs">北京市东城区 · Dongcheng District, Beijing</span>
              </div>
            </div>
          </motion.div>

          {/* Why I joined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="quote-block py-2"
          >
            <p className="text-stone-400 text-sm italic leading-relaxed">
              {t({
                en: `"I joined the exchange program because I wanted to understand China beyond what I read in textbooks — I wanted to live it, speak the language daily, and truly compare two worlds."`,
                zh: `"我参加交流项目，是因为我想超越教科书，真正理解中国——我想亲身体验，每天用中文交流，真正比较两个世界。"`,
              })}
            </p>
            <p className="text-stone-600 text-xs mt-2">— Heona Liu, 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Story cards row */}
      <div className="mt-16">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-chinese text-accent-gold/80 text-sm mb-2"
        >
          个人叙述 · Personal Stories
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-xl text-stone-200 mb-8"
        >
          In My Own Words
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storyCards.map((card, i) => (
            <StoryCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
