'use client'
import Image from "next/image"
import Link from "next/link"
import { FaLeaf } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi2'
import Testing from '../../components/Images/testQuality.svg'

export default function TestingQuality() {
  return (
    <div className="w-full bg-white px-5 ">
      <div className="max-w-[640px] mx-auto">
        {/* Background Image */}
        <div className="relative w-full  px-5  h-[480px]">
          <Image
            src={Testing}
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
       
        </div>

        {/* Content Section */}
        <div className="px-4 pt-12 pb-5 space-y-10 my-5 bg-[#F5F5F5] ">
          <h2 className="text-[40px] leading-[40px] font-bold text-black">
            How do you distinguish quality olive oil from others?
          </h2>

          <div className="space-y-3">
            <p className="text-[20px] leading-6 text-black font-normal">Two measurable values:</p>
            <p className="text-[24px] leading-6 text-black">
              <span className="font-bold">Free acidity</span>
              <span className="font-normal"> and </span>
              <span className="font-bold">Polyphenols</span>
            </p>
          </div>

          <Link 
            href="/test-results" 
            className="inline-flex   justify-end w-full items-end gap-3 text-[18px]   leading-6 text-black font-semibold transition-opacity"
          >
            <span>Review test results</span>
            <HiArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  )
}
