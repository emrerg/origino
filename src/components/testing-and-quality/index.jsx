'use client'
import Image from "next/image"
import Link from "next/link"
import { FaLeaf } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi2'

export default function TestingQuality() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[640px] mx-auto">
        {/* Background Image */}
        <div className="relative w-full h-[480px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-11%20at%209.25.39%E2%80%AFPM-fiJrj0MGf7dwwdEff05sVNNjWQ3Orx.png"
            alt="Olive branches with olives"
            fill
            className="object-cover grayscale"
            priority
          />
          {/* Blue Box with Leaf Icon */}
          <div className="absolute left-8 top-8">
            <div className="bg-[rgb(0,0,255)] w-[72px] h-[72px] flex items-center justify-center">
              <FaLeaf className="text-[#4CAF50] w-9 h-9" />
            </div>
          </div>
          {/* Title Overlay */}
          <div className="absolute left-8 top-[120px]">
            <h1 className="text-[56px] leading-[1.1] font-bold text-white">
              Testing<br />&amp; Quality
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 pt-12 pb-16 space-y-10">
          <h2 className="text-[40px] leading-[1.2] font-bold text-black">
            How do you distinguish quality olive oil from others?
          </h2>

          <div className="space-y-3">
            <p className="text-[24px] text-black">Two measurable values:</p>
            <p className="text-[32px]">
              <span className="font-bold">Free acidity</span>
              <span className="font-normal"> and </span>
              <span className="font-bold">Polyphenols</span>
            </p>
          </div>

          <Link 
            href="/test-results" 
            className="inline-flex items-center gap-3 text-[24px] hover:opacity-80 transition-opacity"
          >
            <span>Review test results</span>
            <HiArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  )
}
