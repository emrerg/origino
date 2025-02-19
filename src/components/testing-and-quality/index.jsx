'use client'
import Image from "next/image"
import { useState } from "react"
import { FaLeaf } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi2'
import { X } from "lucide-react"
import Testing from '../../components/Images/testQuality.svg'
import { event } from '@/lib/gtag'
import testQuality from '../../components/Images/test-quality.png'
import { FaArrowRight } from "react-icons/fa";

export default function TestingQuality() {
  const [showPdf, setShowPdf] = useState(false)

  const handlePdfView = () => {
    event({
      action: 'view_test_results',
      category: 'document_interaction',
      label: 'test_results_pdf'
    })
    setShowPdf(true)
  }

  const handlePdfClose = () => {
    event({
      action: 'close_test_results',
      category: 'document_interaction',
      label: 'test_results_pdf'
    })
    setShowPdf(false)
  }

  return (
    <>
      <div className="w-full bg-white px-5">
        <div className="max-w-[640px] mx-auto">
          <div 
            className="relative w-full -5 "
            role="i"
            aria-label="Olive branches with olives in grayscale"
          >
            <Image
              src={testQuality}
              alt="Decorative olive branches with olives"
             
              className="w-[353px] h-[393px]"
              priority
            />
         
          </div>

          <div className="px-4 pt-12 pb-5 space-y-10 my-5 bg-[#F5F5F5]">
            <h2 className="text-[40px] leading-[40px] font-semibold text-black">
              How do you distinguish quality olive oil from others?
            </h2>

            <div className="space-y-3">
              <p className="text-[20px] leading-6 text-black font-normal">
                Two measurable values:
              </p>
              <p className="text-[20px] leading-3 text-black">
                <span className="font-semibold">Free acidity</span>
                <span className="font-normal"> and </span>
                <span className="font-semibold">Polyphenols</span>
              </p>
            </div>

            <button 
              onClick={handlePdfView}
              className="inline-flex justify-end w-full  border-t-[1px] border-t-white pt-4  items-end gap-3 text-[18px] leading-6 text-black font-semibold transition-opacity"
              aria-label="Review test results document"
            >
              <span>Review test results</span>
              <FaArrowRight className="w-7 h-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdf && (
        <div 
          className="fixed inset-0  z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-title"
        >
          <div className="relative w-full h-full max-w-md mx-auto bg-white  overflow-hidden">
            <div className="p-6 pb-0">
              <div className="flex justify-between items-start">
                <h2 
                  id="pdf-title"
                  className="text-[32px] leading-[38px] font-bold text-black"
                >
                  TÜBİTAK,
                  <br />
                  Bursa Test & Analysis
                  <br />
                  Laboratory
                </h2>
                <button
                  className="p-2 hover:opacity-80"
                  onClick={handlePdfClose}
                  aria-label="Close test results"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6 h-[calc(100vh-200px)] overflow-hidden px-6">
              <iframe
                src="https://origino-journey.s3.us-east-2.amazonaws.com/test-analysis-report.pdf"
                className="w-full h-full rounded-lg"
                title="Test Report PDF Document"
                aria-label="Test results document"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
