import Image from "next/image"
import Link from "next/link"

export default function BuyNextHarvest() {
  return (
    <Link href="/reserve" className="group relative block max-w-sm overflow-hidden rounded-lg">
      <div className="relative h-[500px]   w-full">
        {/* Tree Image Section */}
        {/* <div className="absolute inset-0 h-1/2 overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YFxoPw6mngEWsR3FC4zlDNxrJQ5KoH.png"
            alt="Olive Tree"
            width={400}
            height={200}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div> */}

        {/* Green Background Section */}
        <div className=" bottom-0 h-1/2 w-full  py-5  bg-[#00bf63]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-start space-y-6 p-6">
          <h2 className="text-center text-white">
            <span className="block text-5xl font-bold tracking-tight">Buy</span>
            <span className="block text-xl font-medium italic opacity-80">our</span>
            <span className="block text-4xl font-bold tracking-tight">Next</span>
            <span className="block text-4xl font-bold tracking-tight">Harvest</span>
          </h2>

          <button className="rounded-full bg-[#004d28] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003d20]">
            RESERVE
          </button>
        </div>
      </div>
    </Link>
  )
}

