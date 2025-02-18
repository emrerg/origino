'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchWrapper({ children }) {
  const searchParams = useSearchParams()
  
  return children
} 