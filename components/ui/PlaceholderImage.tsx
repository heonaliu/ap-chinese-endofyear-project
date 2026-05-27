'use client'

import { Camera } from 'lucide-react'

interface PlaceholderImageProps {
  label?: string
  sublabel?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'tall'
  className?: string
  icon?: boolean
}

const ratioMap = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/7]',
  tall: 'aspect-[2/3]',
}

/**
 * PlaceholderImage — Replace each one with a real <Image> from next/image
 * pointing to your actual photo file in /public/images/
 *
 * Example replacement:
 *   import Image from 'next/image'
 *   <Image src="/images/classroom.jpg" alt="..." fill className="object-cover" />
 */
export default function PlaceholderImage({
  label = '📷 Photo placeholder',
  sublabel,
  aspectRatio = 'video',
  className = '',
  icon = true,
}: PlaceholderImageProps) {
  return (
    <div
      className={`${ratioMap[aspectRatio]} placeholder-img w-full select-none ${className}`}
    >
      {icon && (
        <Camera className="text-stone-600 mb-1" size={28} strokeWidth={1} />
      )}
      <span className="text-stone-500 text-xs font-medium px-4 text-center leading-relaxed">
        {label}
      </span>
      {sublabel && (
        <span className="text-stone-700 text-[10px] px-4 text-center mt-1">
          {sublabel}
        </span>
      )}
      <span className="text-stone-700 text-[10px] mt-2 px-4 text-center">
        [ Replace with actual photo ]
      </span>
    </div>
  )
}
