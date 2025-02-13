"use client"
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection/HeroSection';
import TestingQuality from '@/components/testing-and-quality';
import OliveStats from '@/components/olive-stats/olive-stats';
import StorageCard from '@/components/storage/storage';
import BuyNextHarvest from '@/components/buy-harvast/BuyNextHarvest';
import BuyInStock from '@/components/Stock/Stock';
import StorageMainLayout from '@/components/StorageMainLayout/StorageMainLayout';

const ProcessCard = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#006621] rounded-lg p-4 mb-4">
      <div 
        className="flex justify-between items-center mb-2 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {title === 'Picked' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {title === 'Pressed' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {title === 'Packed' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
            </svg>
          )}
          <span className="text-white font-semibold">{title}</span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 text-white transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="text-white space-y-2">
          <div>
            <p className="text-sm text-gray-300">HARVEST DATE</p>
            <p>{data.harvestDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">GROVE LOCATION</p>
            <p>{data.groveLocation}</p>
          </div>
          {data.additionalInfo && Object.entries(data.additionalInfo).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-300">{key.toUpperCase()}</p>
              <p>{value}</p>
            </div>
          ))}
          <div className="mt-4">
            <a href="#" className="text-green-400 text-sm">See the {title.toLowerCase()} details →</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const processData = {
    picked: {
      harvestDate: 'November 8th, 2023',
      groveLocation: 'Northwest of Iznik Lake, Bursa, Turkey',
      additionalInfo: {
        'BRANCH STATUS': 'Barker Yaklaşıldı (42)',
      }
    },
    pressed: {
      harvestDate: 'November 8th, 2023',
      groveLocation: 'Micro Olive Oil Mill',
      additionalInfo: {
        'PRESSING TEMPERATURE': '24°C (Cold Pressed)',
        'PRESSING TIME': '5-6 min',
        'BATCH': 'Batch Aydin (73)'
      }
    },
    packed: {
      harvestDate: 'November 8th, 2023',
      groveLocation: 'Bozi Foods Ltd',
      additionalInfo: {
        'PACKING NOTES': 'Food grade SS with minimum light contact, eliminating oxygen and light exposure.',
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <HeroSection />
      <div className="w-full bg-[#009621] py-12">
        <div className="max-w-2xl mx-auto px-4 space-y-3">
          <ProcessCard title="Picked" data={processData.picked} />
          <ProcessCard title="Pressed" data={processData.pressed} />
          <ProcessCard title="Packed" data={processData.packed} />
        </div>
      </div>
      <div>
        <TestingQuality />
      </div>
      <div className='px-5 mt-5'>
        <OliveStats />
      </div>
      <div className='px-5 mt-5'>
      <StorageMainLayout/>
      </div>
      <div className='px-5 mt-5'>
        <BuyNextHarvest />
      </div>
      <div className='px-5 mt-[-200px]'>
        <BuyInStock />
      </div>

    </AnimatePresence>
  );
}
