'use client'
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function TestingQuality() {
  return (
    <Card className="max-w-md mx-auto overflow-hidden bg-white">
      <div className="relative">
        <div className="relative h-[300px] w-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-11%20at%209.25.39%E2%80%AFPM-fiJrj0MGf7dwwdEff05sVNNjWQ3Orx.png"
            alt="Olive branches with olives"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute top-6 left-6">
            <div className="bg-blue-600 p-4 rounded-lg w-[60px] h-[60px] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                <path d="M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Testing & Quality</h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight">How do you distinguish quality olive oil from others?</h2>

          <p className="text-gray-600">
            Two measurable values:
            <br />
            <span className="font-medium">Free acidity</span> and <span className="font-medium">Polyphenols</span>
          </p>
        </div>

        <Link
          href="/test-results"
          className="inline-flex items-center text-lg font-medium hover:text-gray-900 transition-colors"
        >
          Review test results
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </Card>
  )
}

