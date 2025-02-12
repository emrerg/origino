"use client"

import { ChevronDown, Droplet, Leaf } from "lucide-react"
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';

const VerticalScale = (props) => {
  const { markers, height = 300, title, subtitle } = props;
  
  return (
    <div className="p-4 bg-white   ">
      {title && <p className="text-sm text-gray-700 mb-1">{title}</p>}
      {subtitle && <p className="text-xs text-gray-500 mb-4">{subtitle}</p>}
      <div className="relative ml-12" style={{ height }}>
        {/* Vertical line with gradient */}
        <div
          className="absolute left-0 w-1"
          style={{
            height: "100%",
            background: "linear-gradient(to bottom, #22c55e 0%, #eab308 50%, #ef4444 100%)",
          }}
        />

        {/* Markers */}
        {markers && markers.map((marker, index) => (
          <div
            key={index}
            className="absolute flex items-center gap-3"
            style={{
              bottom: `${marker.position}%`,
              transform: "translateY(50%)",
              left: 0,
            }}
          >
            {/* Horizontal line */}
            <div className="h-[2px] w-3 bg-gray-400" />

            {/* Value and label */}
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-gray-900">{marker.value}</span>
              <span
                className={`text-sm text-gray-600 ${
                  marker.label.toLowerCase() === "origino" ? "italic font-medium" : ""
                }`}
              >
                {marker.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function OliveStats() {
  const [openItem, setOpenItem] = useState(null);

  const acidityMarkers = [
    { value: "0%", label: "origino", position: 100 },
    { value: "0.35%", label: "Premium Quality", position: 80 },
    { value: "0.4%", label: "Most boutique olive oils", position: 60 },
    { value: "0.8%", label: 'Required for "Extra Virgin"', position: 40 },
    { value: "2%", label: "Most supermarket olive oils", position: 0 },
  ]

  const polyphenolMarkers = [
    { value: "280mg/kg", label: "origino", position: 100 },
    { value: "250mg/kg", label: "Required value to claim health benefits", position: 60 },
    { value: "0mg/kg", label: "Most supermarket olive oils", position: 0 },
  ]

  return (
    <div className="mx-auto max-w-md">
      <Accordion.Root 
        type="single" 
        collapsible 
        className="space-y-3"
        value={openItem}
        onValueChange={setOpenItem}
      >
        <Accordion.Item value="acidity" className="border-none">
          <Accordion.Trigger className="flex w-full items-center justify-between rounded-lg bg-[#2563eb] px-4 py-3 text-white hover:bg-[#2563eb]/90">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              <span className="font-medium">Free Acidity</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${openItem === 'acidity' ? 'rotate-180' : ''}`} />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <VerticalScale 
              markers={acidityMarkers} 
              title="The less the better..." 
              height={400} 
            />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="polyphenols" className="border-none">
          <Accordion.Trigger className="flex w-full items-center justify-between rounded-lg bg-[#2563eb] px-4 py-3 text-white hover:bg-[#2563eb]/90">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">Polyphenols</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${openItem === 'polyphenols' ? 'rotate-180' : ''}`} />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <VerticalScale
              markers={polyphenolMarkers}
              title="The more the better..."
              subtitle="Measured in milligrams in a kg"
              height={400}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}

export default OliveStats

