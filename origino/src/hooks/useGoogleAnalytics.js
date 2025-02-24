'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { pageview } from '@/lib/gtag'

export function useGoogleAnalytics() {
  const pathname = usePathname()
  return (
    <Suspense fallback={null}>
      <SearchParamsAnalytics pathname={pathname} />
    </Suspense>
  )
}

function SearchParamsAnalytics({ pathname }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      pageview(pathname + searchParams.toString())
    }
  }, [pathname, searchParams])
  
  return null
}