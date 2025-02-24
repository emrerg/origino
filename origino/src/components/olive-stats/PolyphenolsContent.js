"use client";

const PolyphenolsContent = ({ isPolyphenolsOpen }) => {
  if (!isPolyphenolsOpen) return null;

  return (
    <div
      id="polyphenols-content"
      className="bg-[#F5F5F5] p-6 py-12"
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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-[#4AFF00]"
          >
            <path
              d="M12 20V4M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Vertical Line */}
        <div
          className="absolute left-24 top-0 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #4AFF00 0%, #FFB800 50%, #FF0000 100%)",
          }}
        />

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
            <div className="ml-7">
              <span className="text-xl font-serif">origino</span>
            </div>
          </div>

          <div className="flex items-start">
            <span className="absolute left-0 text-xl whitespace-nowrap">
              250<span className="text-sm">mg/kg</span>
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative -left-[1px] top-3" />
            <div
              className="absolute w-[29px] h-[2px] bg-black opacity-10"
              style={{ left: "95px", top: "72px" }}
            />
            <div className="ml-6">
              <p className="text-base font-semibold">
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
            <div className="w-4 h-[2px] bg-[#000000] relative -left-[1px] top-[190px]" />
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