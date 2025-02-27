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
    if (openAccordion === section) {
      // Close the currently open accordion
      if (section === "picked") {
        events.pickedAccordionClosed();
      } else if (section === "pressed") {
        events.pressedAccordionClosed();
      } else if (section === "packed") {
        events.packedAccordionClosed();
      }
      setOpenAccordion(null); 
    } else {
      // Open the selected accordion
      if (section === "picked") {
        events.pickedAccordionExpanded();
      } else if (section === "pressed") {
        events.pressedAccordionOpen();
      } else if (section === "packed") {
        events.packedAccordionExpanded();
      }
      setOpenAccordion(section);
    }
  };
  
  
  const handleShowStories = (section) => {
    setCurrentSection(section);
    setShowStories(true);

    events.pressedStoriesClicked();
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
    if (section === "picked") {
      events.pickedLocationClicked();
    } else if (section === "pressed") {
      events.pressedLocationClicked();
    } else if (section === "packed") {
      events.packedLocationClicked();
    }
    const locationText = getLocationText(section);
    router.push(
      `/map?section=${section}&location=${encodeURIComponent(locationText)}`
    );
  };
  

  return (
    <>
      <div className="w-full max-w-full  mx-auto px-4  pb-16  bg-[#008c28] ">
        {/* Picked Section */}
        <div className="mb-1  overflow-hidden">
          <div
            className={`bg-[#00532C] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "picked" ? "" : ""}`}
            onClick={() => toggleAccordion("picked")}
          >
            <div className="flex items-center gap-4">
              <Image src={picked} alt="picked" className="w-8 h-8" />
              <h2 className="text-[#59E631] text-2xl font-semibold">Picked</h2>
            </div>
            {openAccordion === "picked" ? (
              <IoChevronUpOutline className="text-[#59E631] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[#59E631] text-xl" />
            )}
          </div>
          {openAccordion === "picked" && (
            <div className="bg-[#006837]  ">
              <div className="space-y-4 text-[#59E631]">
                <div className="p-6">

              
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px] ">
                    HARVEST DATE
                  </h3>
                  <p className="text-xl text-white text-[20px] ">November 8th, 2023</p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631] text-[16px] ">
                    GROVE LOCATION
                  </h3>
                  <p className="text-[20px] flex items-start text-white justify-between ">
                    Northwest of Iznik Lake, Bursa, Turkiye
                    <div
                      className="mt-1 cursor-pointer"
                      onClick={() => handleLocationClick("picked")}
                    >
                      <IoChevronForwardSharp
                        className="text-[#59E631]"
                        fill="#59E631"
                        size={20}
                      />
                    </div>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px] ">
                    HEAD CULTIVATOR
                  </h3>
                  <p className="text-xl text-white text-[20px] ">Turker Yalcinkaya (42)</p>
                </div>
                </div>
                <button
                  className="w-full p-6 text-end pt-5 border-t-[1px] flex items-center   text-[18px] leading-6 font-medium  justify-end gap-4 border-t-[#008c28] text-lg hover:opacity-80 transition-opacity"
                  onClick={() => handleShowStories("picked")}
                >
                  See the picking stories
                  <FaArrowRight className="text-[#59E631]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pressed Section */}
        <div className="mb-1 overflow-hidden">
          <div
            className={`bg-[#00532C] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "pressed" ? "" : ""}`}
            onClick={() => toggleAccordion("pressed")}
          >
            <div className="flex items-center gap-4">
              <Image src={pressed} alt="picked" className="w-8 h-8" />

              <h2 className="text-[#59E631] text-2xl font-semibold">Pressed</h2>
            </div>
            {openAccordion === "pressed" ? (
              <IoChevronUpOutline className="text-[#59E631] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[#59E631] text-xl" />
            )}
          </div>
          {openAccordion === "pressed" && (
            <div className="bg-[#006837] rounded-b-lg">
              <div className="space-y-4 p-6  text-[#59E631]">
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631] text-[16px]  ">
                    PRESSING DATE
                  </h3>
                  <p className="text-xl text-white text-[20px]">November 8th, 2023</p>
                </div>
                <div>
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px]">
                  TIME BETWEEN PICKING & PRESSING
                  </h3>
                  <p className="text-xl  mb-2 text-white  text-[20px] ">&lt;12 hours</p>
                </div>
                  <h3 className="text-lg opacity-70 text-[#59E631] text-[16px] ">
                    MILL LOCATION
                  </h3>
                  <p className="text-xl flex items-start  mb-2 text-white justify-between text-[20px] ">
                    Miras Olive Oil Mill
                    <div
                      className="mt-2 cursor-pointer"
                      onClick={() => handleLocationClick("pressed")}
                    >
                      <IoChevronForwardSharp
                        className="text-[#59E631]"
                        fill="#59E631"
                        size={20}
                      />
                    </div>
                  </p>

                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px] ">
                  DISTANCE TRAVELLED FROM GROVE
                  </h3>
                  <p className="text-xl text-white  mb-2 text-[20px] ">5.8 Km</p>


                  <h3 className="text-lg opacity-70 text-[#59E631] text-[16px]">
                   PRESSING TEMPERATURE
                  </h3>
                  <p className="text-xl  mb-2 text-white text-[20px]">24C (Cold Pressed)</p>


                  <h3 className="text-lg opacity-70 text-[#59E631] text-[16px]">
                HEAD MILLER
                  </h3>
                  <p className="text-xl text-white text-[20px] ">Semih Aydin(78)</p>

                </div>
             
              </div>
              <button
                  className="text-[#59E631] p-6 w-full text-end  border-t-[1px] pt-5  flex items-center text-[18px] leading-6 font-medium  justify-end gap-4 border-t-[#008c28] text-lg hover:opacity-80 transition-opacity"
                  onClick={() => handleShowStories("pressed")}
                >
                  See the pressing stories
                  <FaArrowRight className="text-[#59E631]" />
                </button>
            </div>
          )}
        </div>

        {/* Packed Section */}
        <div className="overflow-hidden">
          <div
            className={`bg-[#00532C] p-6 cursor-pointer flex items-center justify-between ${openAccordion === "packed" ? "" : ""}`}
            onClick={() => toggleAccordion("packed")}
          >
            <div className="flex items-center gap-4">
              <Image src={packed} alt="packed" className="w-8 h-8" />

              <h2 className="text-[#59E631] text-2xl font-semibold">Packed</h2>
            </div>
            {openAccordion === "packed" ? (
              <IoChevronUpOutline className="text-[#59E631] text-xl" />
            ) : (
              <IoChevronDownOutline className="text-[#59E631] text-xl" />
            )}
          </div>
          {openAccordion === "packed" && (
            <div className="bg-[#006837] p-6 rounded-b-lg">
              <div className="space-y-4 text-[#59E631]">
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px] ">
                  PACKING DATE
                  </h3>
                  <p className="text-xl text-white text-[20px] ">February 2024</p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[16px] ">PACKED BY</h3>
                  <p className="text-xl flex items-start text-white justify-between text-[20px] ">
                    Biziz Foods Ltd
                    <div
                      className="mt-2 cursor-pointer"
                      onClick={() => handleLocationClick("packed")}
                    >
                      <IoChevronForwardSharp
                        className="text-[#59E631]"
                        fill="#59E631"
                        size={20}
                      />
                    </div>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg opacity-70 text-[#59E631]  text-[16px]">
                  PACKING DETAILS
                  </h3>
                  <p className=" text-xl text-white text-[20px] ">Food-grade tin, with minimum plastic contact, eliminating oxygen and light exposure. </p>
                </div>
           
              </div>
            </div>
          )}
        </div>
      </div>

      {showStories && (
        <Stories
          section={currentSection}
          onClose={() => {setShowStories(false)
            events.pressedStoriesClosed();
          }}
          
        />
      )}
    </>
  );
};

export default ProcessedSection;
