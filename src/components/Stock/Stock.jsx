import Image from "next/image"
import Link from "next/link"
import stock from "../Images/stock.png"
import harvast from "../Images/buy-harvast.png"


export default function BuyInStock() {
  return (

    <>
    <div className="flex justify-center items-center w-full">

    <Image src={harvast} alt="Origino Olive Oil"  />
    </div>
    <Link href="" className="group flex flex-col items-center gap-6 p-4">
      {/* Product Image Container */}
      <div className="relative my-5 w-[200px] transition-transform duration-300 group-hover:scale-105">
        <Image
          src={stock}
          alt="Origino Olive Oil"
        
          className="object-cover  h-[329px] "
          priority
        />
      </div>

      {/* CTA Button */}
      <button className="rounded-full border-2 border-[#00bf63] bg-white px-6 py-2.5 text-sm font-medium text-[#00bf63] transition-colors ">
        OR BUY WHILE IN STOCK
      </button>
    </Link>
    </>
  )
}

