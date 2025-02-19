import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StorageMainLayout() {
  return (
    <div className="bg-black text-white  px-2 py-4  w-[90vw]  ">
      <div className=" text-white  p-4  space-y-6">
        <div className="space-y-2">
          <h1 className="text-[100px] font-semibold leading-[80px] tracking-tight">
            <span className="block">Sto</span>
            <span className="block">rage?</span>
          </h1>
          <p className="text-[#D4E631] text-[32px] leading-[32px] mt-2 max-w-[285px]">
            What are the most appropriate storage conditions?
          </p>
        </div>
      </div>

        <Link
          href="/storage"
          className="inline-flex items-center justify-end font-semibold border-t-[1px] pt-3  border-t-white w-full text-[#D4E631] leading-[24px] transition-colors"
        >
          Storage Tips
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
    </div>
  );
}
