'use client'

import { useEffect, useRef } from 'react'

/**
 * ScrollProgress — Thin red-to-gold bar fixed at the very top.
 * Shows reading progress through the page.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-stone-900">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-accent-red via-accent-gold to-accent-red-light transition-none"
        style={{ width: '0%' }}
      />
    </div>
  )
}
