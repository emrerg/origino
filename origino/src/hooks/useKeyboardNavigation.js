'use client'

import { useEffect } from 'react'

export function useKeyboardNavigation(handlers) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          handlers.previous?.()
          break
        case 'ArrowRight':
          handlers.next?.()
          break
        case 'Escape':
          handlers.close?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
} 