'use client'
import { useEffect } from 'react'

export function A11yTester() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const checkA11y = () => {
        // Check for proper ARIA attributes
        const buttons = document.querySelectorAll('button')
        buttons.forEach(button => {
          if (!button.getAttribute('aria-label') && !button.textContent) {
            console.warn('Button missing accessible name:', button)
          }
        })

        // Check for proper heading structure
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName[1])
          if (index > 0) {
            const prevLevel = parseInt(headings[index - 1].tagName[1])
            if (level > prevLevel + 1) {
              console.warn('Skipped heading level:', heading)
            }
          }
        })

        // Check for images without alt text
        const images = document.querySelectorAll('img')
        images.forEach(img => {
          if (!img.hasAttribute('alt')) {
            console.warn('Image missing alt text:', img)
          }
        })
      }

      checkA11y()
      
      // Watch for DOM changes
      const observer = new MutationObserver(checkA11y)
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      })

      return () => observer.disconnect()
    }
  }, [])

  return null
} 