'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Camera } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LanguageContext'

// ── Gallery Data ──────────────────────────────────────────────
// TODO: Replace each item's `placeholder` with a real image import or src string
// Example: import classroomImg from '/images/classroom.jpg'
// Then set: src: classroomImg

const galleryItems = [
  {
    id: 1,
    category: 'classroom',
    zhCategory: '教室',
    caption: { en: 'Morning class in session at Jingshan', zh: '景山学校的早课' },
    sublabel: '[ Replace with classroom photo ]',
    size: 'tall' as const,
    accent: 'red' as const,
  },
  {
    id: 2,
    category: 'campus',
    zhCategory: '校园',
    caption: { en: 'The main entrance of Jingshan School', zh: '景山学校正门' },
    sublabel: '[ Replace with campus entrance photo ]',
    size: 'wide' as const,
    accent: 'gold' as const,
  },
  {
    id: 3,
    category: 'host-family',
    zhCategory: '寄宿家庭',
    caption: { en: 'My host student\'s home in Beijing', zh: '我寄宿同学在北京的家' },
    sublabel: '[ Replace with host family home photo ]',
    size: 'square' as const,
    accent: 'red' as const,
  },
  {
    id: 4,
    category: 'meals',
    zhCategory: '美食',
    caption: { en: 'A traditional family dinner', zh: '传统家庭晚餐' },
    sublabel: '[ Replace with meal photo ]',
    size: 'square' as const,
    accent: 'gold' as const,
  },
  {
    id: 5,
    category: 'campus',
    zhCategory: '校园',
    caption: { en: 'Students during morning exercise', zh: '早操时间的同学们' },
    sublabel: '[ Replace with morning exercise photo ]',
    size: 'wide' as const,
    accent: 'red' as const,
  },
  {
    id: 6,
    category: 'classroom',
    zhCategory: '教室',
    caption: { en: 'Group study session with classmates', zh: '与同学们的小组学习' },
    sublabel: '[ Replace with study group photo ]',
    size: 'tall' as const,
    accent: 'gold' as const,
  },
  {
    id: 7,
    category: 'transportation',
    zhCategory: '交通',
    caption: { en: 'The Beijing subway — getting to school', zh: '北京地铁上学途中' },
    sublabel: '[ Replace with subway/transportation photo ]',
    size: 'square' as const,
    accent: 'red' as const,
  },
  {
    id: 8,
    category: 'group-activities',
    zhCategory: '集体活动',
    caption: { en: 'Class competition day', zh: '班级比赛日' },
    sublabel: '[ Replace with group activity photo ]',
    size: 'wide' as const,
    accent: 'gold' as const,
  },
  {
    id: 9,
    category: 'city',
    zhCategory: '城市风景',
    caption: { en: 'Beijing city scenery', zh: '北京城市风景' },
    sublabel: '[ Replace with Beijing cityscape photo ]',
    size: 'square' as const,
    accent: 'red' as const,
  },
  {
    id: 10,
    category: 'meals',
    zhCategory: '美食',
    caption: { en: 'School cafeteria lunch', zh: '学校食堂午餐' },
    sublabel: '[ Replace with cafeteria food photo ]',
    size: 'tall' as const,
    accent: 'gold' as const,
  },
  {
    id: 11,
    category: 'host-family',
    zhCategory: '寄宿家庭',
    caption: { en: 'Evening with my host family', zh: '和寄宿家庭的晚上' },
    sublabel: '[ Replace with host family evening photo ]',
    size: 'square' as const,
    accent: 'red' as const,
  },
  {
    id: 12,
    category: 'city',
    zhCategory: '城市风景',
    caption: { en: 'Exploring Beijing on weekends', zh: '周末探索北京' },
    sublabel: '[ Replace with weekend outing photo ]',
    size: 'wide' as const,
    accent: 'gold' as const,
  },
]

const categories = [
  { key: 'all', label: 'All Photos', zh: '全部照片' },
  { key: 'classroom', label: 'Classroom', zh: '教室' },
  { key: 'campus', label: 'Campus', zh: '校园' },
  { key: 'host-family', label: 'Host Family', zh: '寄宿家庭' },
  { key: 'meals', label: 'Meals', zh: '美食' },
  { key: 'city', label: 'City', zh: '城市' },
  { key: 'group-activities', label: 'Activities', zh: '活动' },
]

const aspectMap = {
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4]',
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: typeof galleryItems[0]
  index: number
  onClick: () => void
}) {
  const { t } = useLang()
  const accentText = item.accent === 'red' ? 'text-accent-red' : 'text-accent-gold'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      layout
      onClick={onClick}
      className={`gallery-item relative cursor-pointer group ${aspectMap[item.size]} w-full`}
    >
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800 border border-dashed border-stone-700 rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Inner content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          <Camera size={24} className="text-stone-600" strokeWidth={1} />
          <span className="text-stone-600 text-[10px] text-center leading-relaxed">{item.sublabel}</span>
        </div>

        {/* Hover overlay */}
        <div className="gallery-overlay rounded-xl">
          <p className={`font-chinese text-xs ${accentText} mb-0.5`}>{item.zhCategory}</p>
          <p className="text-white text-xs leading-snug">{t(item.caption)}</p>
        </div>

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-1.5 rounded-full bg-black/50 text-white">
            <ZoomIn size={12} />
          </div>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`text-[10px] px-2 py-0.5 rounded-full bg-black/50 font-chinese ${accentText} backdrop-blur-sm`}>
          {item.zhCategory}
        </span>
      </div>
    </motion.div>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: typeof galleryItems[0]
  onClose: () => void
}) {
  const { t } = useLang()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-3xl w-full card-dark rounded-2xl overflow-hidden border border-white/10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Large placeholder */}
        <div className="aspect-video w-full bg-stone-900 border-b border-white/5 flex flex-col items-center justify-center gap-3">
          <Camera size={48} className="text-stone-600" strokeWidth={1} />
          <div className="text-center">
            <p className="text-stone-500 text-sm">Photo #{item.id}</p>
            <p className="text-stone-700 text-xs mt-1">{item.sublabel}</p>
          </div>
        </div>

        {/* Caption */}
        <div className="p-6">
          <p className="font-chinese text-accent-gold/80 text-sm mb-1">{item.zhCategory}</p>
          <p className="font-serif text-stone-100 text-lg mb-1">{t(item.caption)}</p>
          <p className="font-chinese text-stone-500 text-sm">
            {item.accent === 'red' ? item.caption.zh : item.caption.zh}
          </p>
          <p className="text-stone-700 text-xs mt-3 border-t border-stone-800 pt-3">
            Jingshan School Exchange Program · 景山学校交流项目 · Heona Liu, 2025
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Gallery — Interactive photo gallery with category filters and lightbox.
 * TODO: Replace all placeholder boxes with real <Image> components pointing to /public/images/
 * Example per item:
 *   <Image src="/images/classroom-01.jpg" alt={caption} fill className="object-cover" />
 */
export default function Gallery() {
  const { t, lang } = useLang()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="摄影集"
        englishTitle="Photo Gallery"
        subtitle={t({
          en: 'A visual record of the exchange — classrooms, campus, host family moments, and Beijing city life.',
          zh: '交流活动的视觉记录——教室、校园、寄宿家庭时刻和北京城市生活。',
        })}
        center
      />

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-2 justify-center mb-10"
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-chinese transition-all duration-200 border ${
              activeCategory === cat.key
                ? 'bg-accent-red text-white border-accent-red'
                : 'border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'
            }`}
          >
            {lang === 'zh' ? cat.zh : cat.label}
          </button>
        ))}
      </motion.div>

      {/* Masonry-style grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        <AnimatePresence>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="break-inside-avoid"
            >
              <GalleryCard
                item={item}
                index={i}
                onClick={() => setSelectedItem(item)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Photo count */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-stone-600 text-xs mt-8 font-chinese"
      >
        {filtered.length} 张照片 · {filtered.length} photos
        {activeCategory !== 'all' && ` · ${categories.find(c => c.key === activeCategory)?.[lang === 'zh' ? 'zh' : 'label']}`}
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
