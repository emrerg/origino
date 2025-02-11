import { AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection/HeroSection';
import AccordionComponent from '@/components/Accordian/Accordian';
import TestingQuality from '@/components/testing-and-quality';
import OliveStats from '@/components/olive-stats/olive-stats';

export default function HomePage() {
  const items = [
    // ... your existing items array
    'TestOne'
  ];

  return (
    <AnimatePresence mode="wait" className='px-5'>
      <HeroSection />
      <div className="flex flex-col justify-center items-center bg-[rgb(0,150,33)] p-5">
        <AccordionComponent items={items} />
        <AccordionComponent items={items} />
        <AccordionComponent items={items} />
      </div>
      <div>
        <TestingQuality />
      </div>
      <div>
        <OliveStats />
      </div>
    </AnimatePresence>
  );
}
