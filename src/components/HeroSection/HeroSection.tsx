import { ArrowDown } from "lucide-react"

export default function HeroSection() {
  return (
    <div className=" bg-[#00B517] flex items-center justify-center pt-[200px] pb-[50px] px-5">
      <div className="bg-white rounded-lg p-8 max-w-md w-full space-y-4">
        <h1 className="text-[100px] leading-[80px]  font-medium tracking-tight">Hi there!</h1>
        <p className="text-[32px] leading-[32px] font-medium">Your Origino® finally has reached its final destination.</p>
        <div className="flex items-center gap-5 text-[#00B517]   pt-[100px] ">
          <ArrowDown className="w-5 h-5" />
          <p className="text-lg">And it&apos;s been an adventurous journey...</p>
        </div>
      </div>
    </div>
  )
}

