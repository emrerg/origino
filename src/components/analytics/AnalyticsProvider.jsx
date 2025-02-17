'use client'

import { useEffect } from 'react'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'
import { event } from '@/lib/gtag'

export default function AnalyticsProvider({ children }) {
  useGoogleAnalytics()

  useEffect(() => {
    let scrollDepths = new Set()
    
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100)
      
      const depths = [25, 50, 75, 100]
      depths.forEach(depth => {
        if (scrollPercent >= depth && !scrollDepths.has(depth)) {
          scrollDepths.add(depth)
          event({
            action: 'scroll_depth',
            category: 'user_engagement',
            label: `scroll_${depth}`,
            value: depth
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return children
} 