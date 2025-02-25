"use client";

import Origino from "@/components/Images/origino.svg";

const PolyphenolsContent = ({ isPolyphenolsOpen }) => {
  if (!isPolyphenolsOpen) return null;

  return (
    <div
      id="polyphenols-content"
      className="bg-[#F5F5F5]  pl-8 py-12"
      role="region"
      aria-label="Polyphenols Details"
    >
      <h3 className="text-xl">The more the better...</h3>
      <p className="text-base text-[#666666] mb-12">
        Measured as milligrams in 1 kg
      </p>
      <div className="relative pl-[90px]">
        {/* Up Arrow */}
        <div className="absolute left-[85px] -top-3">
          <svg
            width="26"
            height="24"
            viewBox="0 0 24 24"
            className="text-[#86CA46]"
          >
            <path
              d="M12 20V4M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Vertical Line */}
         <div className="absolute left-24 top-0 bottom-0 w-[4px]">
         <div className="w-full h-[31%] bg-[#86CA46]" />
         <div className="w-full h-[25%] bg-[#FBBF12]" />
         <div className="w-full h-[40%] bg-[#EF3E25]" />
         </div>


        {/* Data Points */}
        <div className="space-y-8">
          <div className="flex items-start">
            <span className="absolute left-0 text-xl whitespace-nowrap">
              280<span className="text-sm">mg/kg</span>
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative -left-[1px] top-3" />
            <div
              className="absolute w-[29px] h-[2px] bg-black opacity-10"
              style={{ left: "95px", top: "12px" }}
            />
             <div className="ml-4 pl-2">
              <Origino className = "absolute " />
            </div>
      
          </div>

          <div className="flex items-start ">
            <span className="absolute left-0 text-xl whitespace-nowrap top-[100px]">
              250<span className="text-sm">mg/kg</span>
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative -left-[0.5px] top-[76px]" />
            <div
              className="absolute w-[29px] h-[2px] bg-black opacity-10 "
              style={{ left: "95px", top: "110px" }}
            />
            <div className="ml-6 pt-10">
              <p className=" text-base font-semibold ">
                Required value to
                <br />
                claim health benefits
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <span
              className="absolute left-0 text-xl whitespace-nowrap"
              style={{ top: "308px" }}
            >
              0<span className="text-sm">mg/lt</span>
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative left-[-0.5px] top-[192px]" />
            <div className="ml-6">
              <p className="text-base text-[#FFB800] font-semibold">
                Most boutique
                <br />
                olive oils
              </p>

              <p className="text-base text-[#EF3E25] py-14 font-semibold">
                Most supermarket
                <br />
                olive oils
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolyphenolsContent;