'use client'

import { useEffect } from 'react'
import React from 'react'

export function DevTools() {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      import('react-dom/client').then((ReactDOM) => {
        import('@axe-core/react').then((axe) => {
          axe.default(React, ReactDOM, 1000)
        })
      })
    }
  }, [])

  return null
} 