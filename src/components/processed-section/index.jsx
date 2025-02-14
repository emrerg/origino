'use client';
import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import { GiOlive } from 'react-icons/gi';
import { LuPackage2 } from 'react-icons/lu';
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';

const ProcessedSection = () => {
  const [openAccordion, setOpenAccordion] = useState('picked');

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Picked Section */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <div 
          className={`bg-[#004225] p-6 cursor-pointer flex items-center justify-between ${openAccordion === 'picked' ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={() => toggleAccordion('picked')}
        >
          <div className="flex items-center gap-4">
            <FaLeaf className="text-[#4CAF50] text-2xl" />
            <h2 className="text-[#4CAF50] text-2xl font-semibold">Picked</h2>
          </div>
          {openAccordion === 'picked' ? 
            <IoChevronUpOutline className="text-[#4CAF50] text-xl" /> : 
            <IoChevronDownOutline className="text-[#4CAF50] text-xl" />
          }
        </div>
        {openAccordion === 'picked' && (
          <div className="bg-[#004225]/90 p-6 rounded-b-lg">
            <div className="space-y-4 text-[#4CAF50]">
              <div>
                <h3 className="text-lg opacity-70">HARVEST DATE</h3>
                <p className="text-2xl">November 8th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">GROVE LOCATION</h3>
                <p className="text-2xl flex items-center justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                  <IoChevronDownOutline className="text-xl" />
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">HEAD CULTIVATOR</h3>
                <p className="text-2xl">Turker Yalcinkaya (42)</p>
              </div>
              <button className="w-full text-center py-4 text-lg hover:opacity-80 transition-opacity">
                See the picking stories →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pressed Section */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <div 
          className={`bg-[#004225] p-6 cursor-pointer flex items-center justify-between ${openAccordion === 'pressed' ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={() => toggleAccordion('pressed')}
        >
          <div className="flex items-center gap-4">
            <GiOlive className="text-[#4CAF50] text-2xl" />
            <h2 className="text-[#4CAF50] text-2xl font-semibold">Pressed</h2>
          </div>
          {openAccordion === 'pressed' ? 
            <IoChevronUpOutline className="text-[#4CAF50] text-xl" /> : 
            <IoChevronDownOutline className="text-[#4CAF50] text-xl" />
          }
        </div>
        {openAccordion === 'pressed' && (
          <div className="bg-[#004225]/90 p-6 rounded-b-lg">
            <div className="space-y-4 text-[#4CAF50]">
              <div>
                <h3 className="text-lg opacity-70">PRESS DATE</h3>
                <p className="text-2xl">November 10th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">PRESS LOCATION</h3>
                <p className="text-2xl flex items-center justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                  <IoChevronDownOutline className="text-xl" />
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">PRESS METHOD</h3>
                <p className="text-2xl">First Cold Press</p>
              </div>
              <button className="w-full text-center py-4 text-lg hover:opacity-80 transition-opacity">
                See the pressing stories →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Packed Section */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <div 
          className={`bg-[#004225] p-6 cursor-pointer flex items-center justify-between ${openAccordion === 'packed' ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={() => toggleAccordion('packed')}
        >
          <div className="flex items-center gap-4">
            <LuPackage2 className="text-[#4CAF50] text-2xl" />
            <h2 className="text-[#4CAF50] text-2xl font-semibold">Packed</h2>
          </div>
          {openAccordion === 'packed' ? 
            <IoChevronUpOutline className="text-[#4CAF50] text-xl" /> : 
            <IoChevronDownOutline className="text-[#4CAF50] text-xl" />
          }
        </div>
        {openAccordion === 'packed' && (
          <div className="bg-[#004225]/90 p-6 rounded-b-lg">
            <div className="space-y-4 text-[#4CAF50]">
              <div>
                <h3 className="text-lg opacity-70">PACK DATE</h3>
                <p className="text-2xl">November 12th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">PACK LOCATION</h3>
                <p className="text-2xl flex items-center justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                  <IoChevronDownOutline className="text-xl" />
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">PACKAGING TYPE</h3>
                <p className="text-2xl">Glass Bottle</p>
              </div>
              <button className="w-full text-center py-4 text-lg hover:opacity-80 transition-opacity">
                See the packing stories →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessedSection;