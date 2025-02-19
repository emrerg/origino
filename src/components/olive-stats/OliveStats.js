'use client'
import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Acidity from "@/components/Images/acidity.svg"
import polycide from "@/components/Images/polycide.svg"
import { event, events } from '@/lib/gtag'
import freeAcidity from '../../components/Images/freeAcidity.png'
import Polyphenols from '../../components/Images/polyphenola.png'


export default function OliveStats() {
  const [isAcidityOpen, setAcidityOpen] = useState(true)
  const [isPolyphenolsOpen, setPolyphenolsOpen] = useState(true)

  const handleStatToggle = (statType, isOpen) => {
    if (statType === 'acidity') {
      isOpen ? events.freeAcidityAccordionExpanded() : events.freeAcidityAccordionClosed();
    } else if (statType === 'polyphenols') {
      isOpen ? events.polyphenolsAccordionExpanded() : events.polyphenolsAccordionClosed();
    }
    event({
      action: isOpen ? 'expand_stat' : 'collapse_stat',
      category: 'stats_interaction',
      label: statType
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Free Acidity Section */}
      <div className="w-full">
        <button
          onClick={() => {
            setAcidityOpen(!isAcidityOpen)
            handleStatToggle('acidity', !isAcidityOpen)
          }}
          className="w-full bg-[#0000FF] min-h-[90px] text-white py-4 px-6 flex items-center justify-between"
          aria-expanded={isAcidityOpen}
          aria-controls="acidity-content"
        >
          <div className="flex items-center gap-3">
            <Image 
              src={freeAcidity} 
              alt="" 
              width={32} 
              height={32} 
              aria-hidden="true"
            />
            <span className="text-[#38FF00] text-[24px] leading-6 font-semibold">Free Acidity</span>
          </div>
          <ChevronUp 
            className={`w-6 h-6 text-[#4AFF00] transition-transform duration-200 ${
              !isAcidityOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>

        {isAcidityOpen && (
          <div 
            id="acidity-content"
            className="bg-[#F5F5F5] px-6 py-4"
            role="region"
            aria-label="Free Acidity Details"
          >
            <h3 className="text-2xl mb-12">The less the better...</h3>
            <div className="relative pl-[70px]">
              {/* Vertical Line */}
              <div className="absolute left-20 top-0 bottom-0 w-[2px]" 
                style={{
                  background: 'linear-gradient(180deg, #4AFF00 0%, #FFB800 50%, #FF0000 100%)'
                }}
              />
              
              {/* Data Points */}
              <div className="space-y-8  ml-1">
                <div className="flex items-start">
                  <span className="absolute left-0 text-xl">0%</span>
                  <div className="w-4 h-[2px] bg-[#4AFF00] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-xl font-serif">origino</p>
                    <p className="text-base">Premium Quality</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl">0.35%</span>
                  <div className="w-4 h-[2px] bg-[#4AFF00] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base">Most boutique<br />olive oils</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl">0.4%</span>
                  <div className="w-4 h-[2px] bg-[#4AFF00] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base">Required for "Extra<br />Virgin" label</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl">0.8%</span>
                  <div className="w-4 h-[2px] bg-[#FFB800] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base">Most supermarket<br />olive oils</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl">2%</span>
                  <div className="w-4 h-[2px] bg-[#FF0000] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base">Most supermarket<br />olive oils</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Polyphenols Section */}
      <div className="w-full mt-1">
        <button
          onClick={() => {
            setPolyphenolsOpen(!isPolyphenolsOpen)
            handleStatToggle('polyphenols', !isPolyphenolsOpen)
          }}
          className="w-full bg-[#0000FF] text-white min-h-[90px] py-4 px-6 flex items-center justify-between"
          aria-expanded={isPolyphenolsOpen}
          aria-controls="polyphenols-content"
        >
          <div className="flex items-center gap-3">
            <Image 
              src={Polyphenols} 
              alt="" 
              width={32} 
              height={32} 
              aria-hidden="true"
            />
            <span className="text-[#38FF00] text-[24px] leading-6 font-semibold">Polyphenols</span>
          </div>
          <ChevronUp 
            className={`w-6 h-6 text-[#4AFF00] transition-transform duration-200 ${
              !isPolyphenolsOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>

        {isPolyphenolsOpen && (
          <div 
            id="polyphenols-content"
            className="bg-[#F5F5F5] p-6 "
            role="region"
            aria-label="Polyphenols Details"
          >
            <h3 className="text-2xl">The more the better...</h3>
            <p className="text-base text-[#666666] mb-12">Measured as milligrams in 1 kg</p>
            <div className="relative pl-[90px]">
              {/* Up Arrow */}
              <div className="absolute left-[85px] -top-8">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#4AFF00]">
                  <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              {/* Vertical Line */}
              <div className="absolute left-24 top-0 bottom-0 w-[2px]" 
                style={{
                  background: 'linear-gradient(180deg, #4AFF00 0%, #FFB800 50%, #FF0000 100%)'
                }}
              />
              
              {/* Data Points */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <span className="absolute left-0 text-xl whitespace-nowrap">280<span className="text-sm">mg/kg</span></span>
                  <div className="w-4 h-[2px] bg-[#4AFF00] relative -left-[1px] top-3" />
                  <p className="ml-6 text-xl font-serif">origino</p>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl whitespace-nowrap">250<span className="text-sm">mg/kg</span></span>
                  <div className="w-4 h-[2px] bg-[#FFB800] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base">Required value to<br />claim health benefits</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="absolute left-0 text-xl whitespace-nowrap">0<span className="text-sm">mg/lt</span></span>
                  <div className="w-4 h-[2px] bg-[#FF0000] relative -left-[1px] top-3" />
                  <div className="ml-6">
                    <p className="text-base text-[#FFB800]">Most boutique<br />olive oils</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
