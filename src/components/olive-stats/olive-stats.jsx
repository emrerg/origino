'use client';

import { ChevronDown, Droplet, Leaf } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accodian';

const ScaleMarkerProps = {
  value: String,
  label: String,
  color: String,
  position: Number,
};

const VerticalScaleProps = {
  markers: [ScaleMarkerProps],
  height: Number,
  gradientColors: [String],
};

function VerticalScale({
  markers,
  height = 300,
  gradientColors = ['#22c55e', '#eab308', '#ef4444'],
}) {
  return (
    <div className="relative ml-12 mt-6" style={{ height: height }}>
      {/* Vertical line */}
      <div
        className="absolute left-0 w-1 rounded"
        style={{
          height: '100%',
          background: `linear-gradient(to bottom, ${gradientColors.join(', ')})`,
        }}
      />

      {/* Markers */}
      {markers &&
        markers.length > 0 &&
        markers?.map((marker, index) => (
          <div
            key={index}
            className="absolute flex items-center gap-3"
            style={{
              bottom: `${marker.position}%`,
              transform: 'translateY(50%)',
            }}
          >
            {/* Horizontal line */}
            <div className="h-[2px] w-3 bg-gray-400" />

            {/* Value and label */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{marker.value}</span>
              <span className="text-sm text-gray-600">{marker.label}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export function OliveStats() {
  const acidityMarkers = [
    {
      value: '0%',
      label: 'origino',
      position: 100,
    },
    {
      value: '0.35%',
      label: 'Premium Quality',
      position: 80,
    },
    {
      value: '0.4%',
      label: 'Most boutique olive oils',
      position: 60,
    },
    {
      value: '0.8%',
      label: 'Required for "Extra Virgin" label',
      position: 40,
    },
    {
      value: '2%',
      label: 'Most supermarket olive oils',
      position: 0,
    },
  ];

  const polyphenolMarkers = [
    {
      value: '280mg/kg',
      label: 'origino',
      position: 100,
    },
    {
      value: '250mg/kg',
      label: 'Required value to claim health benefits',
      position: 60,
    },
    {
      value: '0mg/kg',
      label: 'Most supermarket olive oils',
      position: 0,
    },
  ];

  return (
    <div className="mx-auto max-w-md p-4">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="acidity" className="border-0">
          <AccordionTrigger className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 hover:no-underline">
            <div className="flex flex-row items-center gap-2">
              <Droplet className="h-5 w-5" />
              <span>Free Acidity</span>
            </div>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <p className="mb-2 text-sm text-gray-600">The less the better...</p>
            <VerticalScale markers={acidityMarkers} />
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="polyphenols" className="border-0">
          <AccordionTrigger className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 hover:no-underline">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <span>Polyphenols</span>
            </div>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <p className="mb-2 text-sm text-gray-600">The more the better...</p>
            <p className="mb-4 text-xs text-gray-500">Measured in milligrams in a kg</p>
            <VerticalScale markers={polyphenolMarkers} />
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
}

export default OliveStats;
