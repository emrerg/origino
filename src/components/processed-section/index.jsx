"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  IoChevronDownOutline,
  IoChevronForwardSharp,
  IoChevronUpOutline,
} from "react-icons/io5";
import { events } from "@/lib/gtag";
import Image from "next/image";
import { useRouter } from "next/navigation";

import packed from "../../components/Images/packed.png";
import picked from "../../components/Images/picked.png";
import pressed from "../../components/Images/prssed.png";
import Stories from "../stories/Stories";

const ProcessedSection = () => {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState("picked");
  const [showStories, setShowStories] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const toggleAccordion = (section) => {
    if (section === "picked") {
      events.pickedAccordionClosed();
    } else if (section === "pressed") {
      events.pressedAccordionClosed();
    } else if (section === "packed") {
      events.packedAccordionClosed();
    }
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleShowStories = (section) => {
    setCurrentSection(section);
    setShowStories(true);
  };

  const getLocationText = (section) => {
    switch (section) {
      case "picked":
        return "Northwest of Iznik Lake, Bursa, Turkiye";
      case "pressed":
        return "Miras Olive Mill, Bursa, Turkiye";
      case "packed":
        return "Biziz Foods Ltd, Bursa, Turkiye";
      default:
        return "";
    }
  };

  const handleLocationClick = (section) => {
    const locationText = getLocationText(section);
    router.push(
      `/map?section=${section}&location=${encodeURIComponent(locationText)}`
    );
  };

  return (
    <>
      <div className="w-full max-w-full mx-auto px-4 pt-4 pb-16 bg-[var(--brand-green-dark)]">
        {/* Picked Section */}
        <div className="mb-1 overflow-hidden">
          <div
            className={`bg-[var(--brand-green-darkest)] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "picked" ? "" : ""}`}
            onClick={() => toggleAccordion("picked")}
          >
            <div className="flex items-center gap-4">
              <Image src={picked} alt="picked" className="w-8 h-8" />
              <h2 className="text-[var(--brand-green-light)] text-2xl font-semibold">Picked</h2>
            </div>
            {openAccordion === "picked" ? (
              <IoChevronUpOutline className="text-[var(--brand-green-light)] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[var(--brand-green-light)] text-xl" />
            )}
          </div>
          {openAccordion === "picked" && (
            <div className="bg-[var(--brand-green-darker)] p-6">
              <div className="space-y-4 text-[var(--brand-green-light)]">
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)] font-[500]">
                    HARVEST DATE
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">November 8th, 2023</p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)] font-[500]">
                    GROVE LOCATION
                  </h3>
                  <p className="text-xl flex items-start text-[var(--text-1)] justify-between">
                    Northwest of Iznik Lake, Bursa, Turkiye
                    <div
                      className="mt-1 cursor-pointer"
                      onClick={() => handleLocationClick("picked")}
                    >
                      <IoChevronForwardSharp
                        className="text-[var(--brand-green-light)]"
                        fill="var(--brand-green-light)"
                        size={20}
                      />
                    </div>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    HEAD CULTIVATOR
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">Turker Yalcinkaya (42)</p>
                </div>
                <button
                  className="w-full text-end pt-5 border-t-[1px] flex items-center text-[18px] leading-6 font-medium justify-end gap-4 border-t-[var(--brand-green-dark)] text-lg hover:opacity-80 transition-opacity"
                  onClick={() => handleShowStories("picked")}
                >
                  See the picking stories
                  <FaArrowRight className="text-[var(--brand-green-light)]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pressed Section */}
        <div className="mb-1 overflow-hidden">
          <div
            className={`bg-[var(--brand-green-darkest)] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "pressed" ? "" : ""}`}
            onClick={() => toggleAccordion("pressed")}
          >
            <div className="flex items-center gap-4">
              <Image src={pressed} alt="picked" className="w-8 h-8" />

              <h2 className="text-[var(--brand-green-light)] text-2xl font-semibold">Pressed</h2>
            </div>
            {openAccordion === "pressed" ? (
              <IoChevronUpOutline className="text-[var(--brand-green-light)] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[var(--brand-green-light)] text-xl" />
            )}
          </div>
          {openAccordion === "pressed" && (
            <div className="bg-[var(--brand-green-darker)] p-6 rounded-b-lg">
              <div className="space-y-4 text-[var(--brand-green-light)]">
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    PRESS DATE
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">November 8th, 2023</p>
                </div>
                <div>
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                  TIME BETWEEN PICKING AND PRESSING
                  </h3>
                  <p className="text-xl mb-2 text-[var(--text-1)]">&lt;12 hours</p>
                </div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    MILL LOCATION
                  </h3>
                  <p className="text-xl flex items-start mb-2 text-[var(--text-1)] justify-between">
                    Miras Olive Oil Mill
                    <div
                      className="mt-2 cursor-pointer"
                      onClick={() => handleLocationClick("pressed")}
                    >
                      <IoChevronForwardSharp
                        className="text-[var(--brand-green-light)]"
                        fill="var(--brand-green-light)"
                        size={20}
                      />
                    </div>
                  </p>

                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                 PRESSING TEMPERATURE
                  </h3>
                  <p className="text-xl text-[var(--text-1)] mb-2">24C (COLD PRESSED)</p>


                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                DISTANCE TRAVELLED FROM GROVE
                  </h3>
                  <p className="text-xl mb-2 text-[var(--text-1)]">5.8 KM</p>


                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)] mb-2">
                HEAD MILLER
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">SEMIH AYDIN(78)</p>



                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    PRESS METHOD
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">First Cold Press</p>
                </div>
                <button
                  className="w-full text-end border-t-[1px] pt-5 flex items-center text-[18px] leading-6 font-medium justify-end gap-4 border-t-[var(--brand-green-dark)] text-lg hover:opacity-80 transition-opacity"
                  onClick={() => handleShowStories("pressed")}
                >
                  See the pressing stories
                  <FaArrowRight className="text-[var(--brand-green-light)]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Packed Section */}
        <div className="overflow-hidden">
          <div
            className={`bg-[var(--brand-green-darkest)] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "packed" ? "" : ""}`}
            onClick={() => toggleAccordion("packed")}
          >
            <div className="flex items-center gap-4">
              <Image src={packed} alt="packed" className="w-8 h-8" />

              <h2 className="text-[var(--brand-green-light)] text-2xl font-semibold">Packed</h2>
            </div>
            {openAccordion === "packed" ? (
              <IoChevronUpOutline className="text-[var(--brand-green-light)] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[var(--brand-green-light)] text-xl" />
            )}
          </div>
          {openAccordion === "packed" && (
            <div className="bg-[var(--brand-green-darker)] p-6 rounded-b-lg">
              <div className="space-y-4 text-[var(--brand-green-light)]">
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    PACK DATE
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">FEBRUARY 2024</p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70">PACK BY</h3>
                  <p className="text-xl flex items-start text-[var(--text-1)] justify-between">
                    Biziz Foods Ltd
                    <div
                      className="mt-2 cursor-pointer"
                      onClick={() => handleLocationClick("packed")}
                    >
                      <IoChevronForwardSharp
                        className="text-[var(--brand-green-light)]"
                        fill="var(--brand-green-light)"
                        size={20}
                      />
                    </div>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[var(--brand-green-light)]">
                    PACKAGING TYPE
                  </h3>
                  <p className="text-xl text-[var(--text-1)]">Food-grade tin, with minimum plastic contact, eliminating oxygen and light exposure. </p>
                </div>
           
              </div>
            </div>
          )}
        </div>
      </div>

      {showStories && (
        <Stories
          section={currentSection}
          onClose={() => setShowStories(false)}
        />
      )}
    </>
  );
};

export default ProcessedSection;
