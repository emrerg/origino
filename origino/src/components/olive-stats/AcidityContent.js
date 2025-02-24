"use client";

import Origino from "@/components/Images/origino.svg";

const AcidityContent = ({ isAcidityOpen }) => {
  if (!isAcidityOpen) return null;

  return (
    <div
      id="acidity-content"
      className="bg-[#F5F5F5] px-6 pb-24 pt-8"
      role="region"
      aria-label="Free Acidity Details"
    >
      <h3 className="text-xl mb-12">The less the better...</h3>
      <div className="relative pl-[70px]">
        <div
          className="absolute left-32 top-0 bottom-0 w-[2px] h-[300px]"
          style={{
            background:
              "linear-gradient(180deg, #4AFF00 0%, #FFB800 50%, #FF0000 100%)",
          }}
        />
        <div className="space-y-8 ml-1">
          {/* 0% Marking */}
          <div className="flex items-start">
            <span className="absolute left-[59px] -top-3 text-xl w-29 h-16 font-normal">
              0%
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative left-[47px] top-0" />
          </div>

          {/* 0.35% Marking */}
          <div className="flex items-start mb-2">
            <span className="absolute left-[59px] text-xl w-29 h-16 font-normal">
              0.35%
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative left-[47px] top-3" />
            <div className="absolute w-[29px] h-[2px] bg-black opacity-10 left-[135px] top-[46px]" />
          </div>

          {/* 0.4% Marking with Origino */}
          <div className="flex items-start mb-2">
            <span className="absolute left-[59px] text-xl w-29 h-16 font-normal">
              0.4%
            </span>
            <div className="w-4 h-[2px] bg-[#000000] relative left-[47px] top-3" />
            <div className="absolute w-[29px] h-[2px] bg-black opacity-10 left-[135px] top-[79px]" />
            <div className="ml-24">
              <Origino className = "absolute top-[37px]" />
            </div>
          </div>

          {/* Rest of the markings... */}
          {/* Premium Quality Section */}
          <div className="flex items-start mb-2">
            <div className="w-4 h-[2px] bg-[#000000] relative left-[47px] top-[-10px]" />
            <div className="absolute w-[29px] h-[2px] bg-black opacity-10 left-[135px] top-[46px]" />
            <div className="absolute w-[19px] h-[2px] bg-black opacity-10 left-[129px] top-[103px]" />
            <div className="absolute w-[2px] h-[40px] bg-black opacity-10 left-[148px] top-[103px]" />
            <div className="absolute w-[10px] h-[2px] bg-black opacity-10 left-[149px] top-[122px]" />
            <div className="absolute w-[19px] h-[2px] bg-black opacity-10 left-[129px] top-[141px]" />
            <div className="ml-6">
              <p className="w-[201px] h-[24px] font-semibold relative top-[-33px] ml-20">
                Premium Quality
              </p>
              <p className="w-[201px] h-[20px] font-semibold relative top-[-18px] ml-20">
                Most boutique
                <br />
                olive oils
              </p>
            </div>
          </div>

          {/* 0.8% Marking */}
          <div className="flex items-start">
            <span className="absolute top-[157px] left-[59px] text-xl">
              0.8%
            </span>
            <div className="w-4 h-[2px] bg-[#000000] absolute left-[121px] top-[170px]" />
            <div className="absolute w-[29px] h-[2px] bg-black opacity-10 left-[129px] top-[170px]" />
            <div className="absolute w-[19px] h-[2px] bg-black opacity-10 left-[131px] top-[215px]" />
            <div className="absolute w-[2px] h-[75px] bg-black opacity-10 left-[150px] top-[215px]" />
            <div className="absolute w-[10px] h-[2px] bg-black opacity-10 left-[151px] top-[248px]" />
            <div className="absolute w-[19px] h-[2px] bg-black opacity-10 left-[132px] top-[289px]" />
            <div className="ml-6">
              <p className="w-[201px] h-[24px] font-semibold relative top-[-20px] ml-20">
                Required for "Extra
                <br />
                Virgin" label
              </p>
            </div>
          </div>

          {/* 2% Marking */}
          <div className="flex items-start">
            <span className="absolute top-[237px] left-[70px] text-xl">2%</span>
            <div className="w-4 h-[2px] bg-[#000000] absolute left-[121px] top-[249px] z-10" />
            <div className="ml-6">
              <p className="w-[201px] h-[24px] font-semibold relative top-[2px] ml-20">
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

export default AcidityContent;
