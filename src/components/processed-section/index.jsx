'use client';
import React, { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import { GiOlive } from 'react-icons/gi';
import { LuPackage2 } from 'react-icons/lu';
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';
import Image from 'next/image';
import picked from '../../components/Images/picked.svg'
import pressed from '../../components/Images/pressed.svg';
import packed from '../../components/Images/Packed.svg';

const ProcessedSection = () => {
  const [openAccordion, setOpenAccordion] = useState('picked');

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-4 pb-20  bg-[#008c28] ">
      {/* Picked Section */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <div 
          className={`bg-[#004225] p-6 cursor-pointer flex items-center justify-between ${openAccordion === 'picked' ? 'rounded-t-lg' : 'rounded-lg'}`}
          onClick={() => toggleAccordion('picked')}
        >
          <div className="flex items-center gap-4">
           <Image src={picked} alt="picked" className="w-8 h-8" />
            <h2 className="text-[#59E631] text-2xl font-semibold">Picked</h2>
          </div>
          {openAccordion === 'picked' ? 
            <IoChevronUpOutline className="text-[#59E631] text-xl" /> : 
            <IoChevronDownOutline className="text-[#59E631] text-xl" />
          }
        </div>
        {openAccordion === 'picked' && (
          <div className="bg-[#006837] p-6 rounded-b-lg">
            <div className="space-y-4 text-[#59E631]">
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">HARVEST DATE</h3>
                <p className="text-2xl text-white ">November 8th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">GROVE LOCATION</h3>
                <p className="text-2xl flex items-center  text-white  justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">HEAD CULTIVATOR</h3>
                <p className="text-2xl text-white  ">Turker Yalcinkaya (42)</p>
              </div>
              <button className="w-full text-end py-4 text-lg hover:opacity-80 transition-opacity">
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
          <Image src={pressed} alt="picked" className="w-8 h-8" />

            <h2 className="text-[#59E631] text-2xl font-semibold">Pressed</h2>
          </div>
          {openAccordion === 'pressed' ? 
            <IoChevronUpOutline className="text-[#59E631] text-xl" /> : 
            <IoChevronDownOutline className="text-[#59E631] text-xl" />
          }
        </div>
        {openAccordion === 'pressed' && (
          <div className="bg-[#006837] p-6 rounded-b-lg">
            <div className="space-y-4 text-[#59E631]">
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">PRESS DATE</h3>
                <p className="text-2xl text-white ">November 10th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">PRESS LOCATION</h3>
                <p className="text-2xl flex items-center  text-white  justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                  <IoChevronDownOutline className="text-xl" />
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">PRESS METHOD</h3>
                <p className="text-2xl text-white  ">First Cold Press</p>
              </div>
              <button className="w-full text-end py-4 text-lg hover:opacity-80 transition-opacity">
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
          <Image src={packed} alt="packed" className="w-8 h-8" />

            <h2 className="text-[#59E631] text-2xl font-semibold">Packed</h2>
          </div>
          {openAccordion === 'packed' ? 
            <IoChevronUpOutline className="text-[#59E631] text-xl" /> : 
            <IoChevronDownOutline className="text-[#59E631] text-xl" />
          }
        </div>
        {openAccordion === 'packed' && (
          <div className="bg-[#006837] p-6 rounded-b-lg">
            <div className="space-y-4 text-[#59E631]">
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">PACK DATE</h3>
                <p className="text-2xl text-white ">November 12th, 2023</p>
              </div>
              <div>
                <h3 className="text-lg opacity-70">PACK LOCATION</h3>
                <p className="text-2xl flex items-center  text-white  justify-between">
                  Northwest of Iznik Lake, Bursa, Turkiye
                  <IoChevronDownOutline className="text-xl" />
                </p>
              </div>
              <div>
                <h3 className="text-lg opacity-70 text-[#59E631]  ">PACKAGING TYPE</h3>
                <p className="text-2xl text-white  ">Glass Bottle</p>
              </div>
              <button className="w-full text-end py-4 text-lg hover:opacity-80  border-t  border-[#006837]  transition-opacity">
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