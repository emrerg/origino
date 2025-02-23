import Image from "next/image";
import { ArrowDown } from "lucide-react";

import hithere from "../../components/Images/bg.png";

export default function HeroSection() {
  return (
    <div className="relative">
      <div
        className="flex items-center relative justify-center pb-[20px] px-5"
        style={{
          background:
            "linear-gradient(to bottom, #00B517 80%, rgb(0,139,40) 20%)",
        }}
      >
        {/* Background Pattern */}
        <div className=" w-full absolute top-0 right-0 h-full overflow-hidden pointer-events-none">
          <Image
            src={hithere}
            alt="background pattern"
            className="absolute top-0 right-0  w-auto h-full object-cover"
          />
        </div>

        <div className="pt-[160px]">
          <div className="bg-white rounded-lg p-8 max-w-md w-full space-y-4 relative  flex flex-col justify-between h-[598px] ">
            <div>
              <h1 className="text-[100px] leading-[80px]  mb-6 font-medium tracking-tight">
                Hi there!
              </h1>
              <p className="text-[32px] leading-[32px] font-medium">
                Your Origino® finally has reached its final destination.
              </p>
            </div>
            <div className="flex items-center gap-5  text-[#29BA00] pt-[100px] text-[24px] leading-[24px] font-medium ">
              <ArrowDown className="w-16 h-16" />
              <p className="text-xl">
                And it&apos;s been an <span>adventurous journey...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
