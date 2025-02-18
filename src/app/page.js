"use client"
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection/HeroSection';
import TestingQuality from '@/components/testing-and-quality';
import StorageCard from '@/components/storage/storage';
import BuyNextHarvest from '@/components/buy-harvast/BuyNextHarvest';
import BuyInStock from '@/components/Stock/Stock';
import StorageMainLayout from '@/components/StorageMainLayout/StorageMainLayout';
import ProcessedSection from '@/components/processed-section';
import OliveStats from '@/components/olive-stats/OliveStats';
import Footer from '@/components/footer/Footer'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export default function HomePage() {
  useGoogleAnalytics()

  return (
    <>
      <HeroSection />
      <ProcessedSection />
      <TestingQuality />
      <div className='px-5 mt-5'>
        <OliveStats />
      </div>
      <div className='px-5 mt-5'>
        <StorageMainLayout/>
      </div>
      <div className='mt-5'>
        <BuyInStock />
      </div>
      <Footer />
    </>
  )
}