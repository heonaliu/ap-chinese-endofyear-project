'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Plus, Minus, GraduationCap, Users, Clock, Utensils, Shirt, BookMarked } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { useLang } from '@/contexts/LanguageContext'

// ── Card Data ─────────────────────────────────────────────────
const schoolCards = [
  {
    icon: <Clock size={18} />,
    title: { en: 'Class Schedule', zh: '课程表' },
    chineseCaption: '每天7点半开始上课',
    prompt: { en: 'A moment that surprised me…', zh: '让我惊讶的一刻……' },
    story: {
      en: `[ Write your story here: Describe the daily schedule at Jingshan. How early does school start? How many classes per day? How does it compare to your schedule in the US? Mention specific subjects you attended. ]`,
      zh: `[ 在这里写你的故事：描述景山的日常课程表。学校几点开始？每天几节课？与美国的课程表相比如何？ ]`,
    },
    detail: {
      en: 'Classes run from 7:30 AM to 5:00 PM, with multiple subjects including math, Chinese literature, English, and physical education.',
      zh: '从7:30到17:00，科目丰富。',
    },
    image: { label: 'Classroom schedule / class in session', sublabel: '课堂上课 · 课程表' },
    imageSrc: '/images/school-sched.jpg',
    accent: 'red' as const,
  },
  {
    icon: <GraduationCap size={18} />,
    title: { en: 'Classroom Behavior', zh: '课堂行为' },
    chineseCaption: '学生认真听讲，举手发言',
    prompt: { en: 'Something very different from American schools…', zh: '与美国学校非常不同的事……' },
    story: {
      en: `[ Write your story here: How did students behave in class? Were they very attentive? Describe the respect toward teachers. How did participation work differently? ]`,
      zh: `[ 在这里写你的故事：学生在课堂上的表现如何？他们非常专注吗？描述对老师的尊重。参与方式有何不同？ ]`,
    },
    detail: {
      en: 'Students stand when greeting teachers, maintain quiet discipline, and show great deference to instructors — very different from American classroom dynamics.',
      zh: '学生非常尊重老师。',
    },
    image: { label: 'Classroom observation / students listening', sublabel: '课堂纪律 · 师生关系' },
    imageSrc: '/images/classroom.jpg',
    accent: 'gold' as const,
  },
  {
    icon: <Shirt size={18} />,
    title: { en: 'Uniforms & School Culture', zh: '校服与学校文化' },
    chineseCaption: '整洁的校服是学校文化的一部分',
    prompt: { en: 'A memorable classroom experience…', zh: '一次难忘的课堂经历……' },
    story: {
      en: `[ Write your story here: Describe the uniforms at Jingshan. What did they look like? How did wearing a uniform feel different? What does the uniform represent culturally? ]`,
      zh: `[ 在这里写你的故事：描述景山的校服。它们看起来什么样？穿校服的感觉有何不同？校服在文化上代表什么？ ]`,
    },
    detail: {
      en: 'All students wear matching uniforms — tracksuit-style with the school logo. It creates a strong sense of equality and collective identity.',
      zh: '统一校服，体现集体精神。',
    },
    image: { label: 'Students in uniforms / school assembly', sublabel: '校服 · 集体活动' },
    imageSrc: '/images/schooluniform.jpg',
    accent: 'red' as const,
  },
  {
    icon: <Utensils size={18} />,
    title: { en: 'School Cafeteria', zh: '学校食堂' },
    chineseCaption: '食堂的饭菜丰盛又美味',
    prompt: { en: 'What I learned from Chinese students…', zh: '我从中国学生身上学到的……' },
    story: {
      en: `[ Write your story here: Describe meals at Jingshan. What food was served? How was the cafeteria different from your school? Did you try anything new? Any interesting food experiences? ]`,
      zh: `[ 在这里写你的故事：描述景山的饭菜。食堂供应什么食物？它与你学校的自助餐厅有何不同？ ]`,
    },
    detail: {
      en: 'The cafeteria serves hot Chinese food — rice, dumplings, noodles, stir-fries. Meals are communal and fast-paced, eaten with chopsticks.',
      zh: '米饭、饺子、炒菜，用筷子吃饭。',
    },
    image: { label: 'School cafeteria / meal time', sublabel: '食堂 · 午餐时间' },
    imageSrc: '/images/food.jpg',
    accent: 'gold' as const,
  },
  {
    icon: <BookMarked size={18} />,
    title: { en: 'Academic Rigor', zh: '学业严格' },
    chineseCaption: '中国学生的学习压力非常大',
    prompt: { en: 'The academic pressure I witnessed…', zh: '我目睹的学业压力……' },
    story: {
      en: `[ Write your story here: How intense was the academic workload? Did you observe students studying during breaks? How do Chinese students approach homework? What was most challenging for you? ]`,
      zh: `[ 在这里写你的故事：学业负担有多重？你看到学生在课间学习吗？中国学生如何对待作业？什么对你最有挑战？ ]`,
    },
    detail: {
      en: 'Chinese high schoolers face enormous academic pressure — especially in preparation for the 高考 (gaokao, college entrance exam), which shapes much of the school culture.',
      zh: '为高考备考，压力很大。',
    },
    image: { label: 'Students studying / homework / books', sublabel: '学习 · 高考备考' },
    accent: 'red' as const,
  },
  {
    icon: <Users size={18} />,
    title: { en: 'Group Activities', zh: '集体活动' },
    chineseCaption: '集体荣誉感是学校精神的核心',
    prompt: { en: 'A group experience I will never forget…', zh: '一次难忘的集体经历……' },
    story: {
      en: `[ Write your story here: Describe any group activities, morning exercises, assemblies, or team events you participated in. How did collective spirit feel different from American school culture? ]`,
      zh: `[ 在这里写你的故事：描述你参加的任何集体活动、早操、晨会或团队活动。集体精神与美国学校文化有何不同？ ]`,
    },
    detail: {
      en: 'Morning exercises, group cleaning duties, and class competitions all foster a powerful sense of collective responsibility and school pride.',
      zh: '早操和集体活动培养团队精神。',
    },
    image: { label: 'Morning exercises / group activity / assembly', sublabel: '早操 · 集体活动' },
    imageSrc: '/images/wushu.jpg',
    accent: 'gold' as const,
  },
]

function SchoolCard({ card, index }: { card: typeof schoolCards[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const { t } = useLang()
  const accentBg = card.accent === 'red' ? 'bg-accent-red/10 text-accent-red' : 'bg-accent-gold/10 text-accent-gold'
  const accentText = card.accent === 'red' ? 'text-accent-red' : 'text-accent-gold'
  const accentBorder = card.accent === 'red' ? 'border-accent-red/30' : 'border-accent-gold/30'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`card-dark rounded-xl border border-white/5 hover:${accentBorder} overflow-hidden transition-all duration-300`}
    >
      {/* Image */}
      {'imageSrc' in card && card.imageSrc ? (
        <div className="relative w-full aspect-video">
          <Image
            src={card.imageSrc}
            alt={card.image.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      ) : (
        <PlaceholderImage
          label={card.image.label}
          sublabel={card.image.sublabel}
          aspectRatio="video"
        />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${accentBg}`}>{card.icon}</div>
            <div>
              <h3 className="font-serif font-semibold text-stone-100 text-base">{t(card.title)}</h3>
              <p className={`font-chinese text-xs ${accentText} opacity-70 mt-0.5`}>
                {card.chineseCaption}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className={`p-1.5 rounded-full ${accentBg} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Preview detail */}
        <p className="text-stone-500 text-xs leading-relaxed mb-2">{t(card.detail)}</p>

        {/* Story prompt */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`text-xs ${accentText} hover:underline font-chinese`}
        >
          {t(card.prompt)} →
        </button>

        {/* Expandable story */}
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
                  {t(card.story)}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-800">
                  <p className="font-chinese text-stone-600 text-xs">
                    [ 用你自己的故事替换这段文字 · Replace with your own story ]
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/**
 * SchoolLife — AP Theme: 学校生活 (School Life)
 * One of the largest sections. Replace all placeholder stories with your actual experiences.
 * Click the + on each card to expand the story placeholder.
 */
export default function SchoolLife() {
  const { t } = useLang()

  return (
    <section id="school-life" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="学校生活"
        englishTitle="School Life"
        subtitle={t({
          en: 'A deep look at daily student life at Jingshan School — from the first bell to the last class, and everything in between.',
          zh: '景山学校的日常学生生活。',
        })}
        themeTag="学校生活 · School Life"
      />

      {/* Intro quote */}
      

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {schoolCards.map((card, i) => (
          <SchoolCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 p-6 card-dark rounded-xl border border-accent-red/10 bg-accent-red/5"
      >
        <p className="font-chinese text-accent-red/80 text-sm mb-1">课堂观察 · Classroom Observation</p>
        <p className="text-stone-300 text-sm leading-relaxed">
          {t({
            en: `One of the most striking aspects of Chinese school life is the collective spirit — students clean their classrooms together, perform morning exercises as a group, and compete in teams. This sense of shared responsibility was something I had never experienced in American schools.`,
            zh: `集体精神是中国学校的特色——学生一起打扫、做操、参加班级竞赛。`,
          })}
        </p>
      </motion.div>
    </section>
  )
}
