"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import AcidityContent from "./AcidityContent";
import PolyphenolsContent from "./PolyphenolsContent";
import freeAcidity from "../../components/Images/freeAcidity.png";
import Polyphenols from "../../components/Images/polyphenola.png";

const OliveStats = () => {
  const [isAcidityOpen, setAcidityOpen] = useState(true);
  const [isPolyphenolsOpen, setPolyphenolsOpen] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Acidity Section */}
      <div className="w-full">
        <button
          onClick={() => {
            setAcidityOpen(!isAcidityOpen);
            handleStatToggle("acidity", !isAcidityOpen);
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
            <span className="text-[#38FF00] text-[24px] leading-6 font-semibold">
              Free Acidity
            </span>
          </div>
          <ChevronUp
            className={`w-6 h-6 text-[#4AFF00] transition-transform duration-200 ${
              !isAcidityOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <AcidityContent isAcidityOpen={isAcidityOpen} />
      </div>

      {/* Polyphenols Section */}
      <div className="w-full mt-1">
        <button
          onClick={() => {
            setPolyphenolsOpen(!isPolyphenolsOpen);
            handleStatToggle("polyphenols", !isPolyphenolsOpen);
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
            <span className="text-[#38FF00] text-[24px] leading-6 font-semibold">
              Polyphenols
            </span>
          </div>
          <ChevronUp
            className={`w-6 h-6 text-[#4AFF00] transition-transform duration-200 ${
              !isPolyphenolsOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <PolyphenolsContent isPolyphenolsOpen={isPolyphenolsOpen} />
      </div>
    </div>
  );
};

export default OliveStats;