'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LanguageContext'

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Jingshan exchange photo 1' },
  { src: '/images/gallery-2.jpg', alt: 'Jingshan exchange photo 2' },
  { src: '/images/gallery-3.jpg', alt: 'Jingshan exchange photo 3' },
  { src: '/images/gallery-4.jpg', alt: 'Jingshan exchange photo 4' },
  { src: '/images/gallery-5.jpg', alt: 'Jingshan exchange photo 5' },
  { src: '/images/gallery-6.jpg', alt: 'Jingshan exchange photo 6' },
  { src: '/images/gallery-7.jpg', alt: 'Jingshan exchange photo 7' },
]

export default function Gallery() {
  const { t } = useLang()
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" className="section-padding max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeader
        chineseTitle="摄影集"
        englishTitle="Photo Gallery"
        subtitle={t({
          en: 'A visual record of the exchange — classrooms, campus, host family moments, and Beijing city life.',
          zh: '交流活动的视觉记录。',
        })}
        center
      />

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => setSelected(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl w-full"
            >
              <Image
                src={photos[selected].src}
                alt={photos[selected].alt}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
