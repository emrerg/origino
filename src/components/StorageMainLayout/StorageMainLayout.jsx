import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StorageMainLayout() {
  return (
    <div className="bg-black text-white  px-16 py-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold leading-none tracking-tight">
          <span className="block">Sto</span>
          <span className="block">rage?</span>
        </h1>
        <p className="text-[#d2ff4c] text-2xl leading-tight max-w-[15ch]">
          What are the most appropriate storage conditions?
        </p>
      </div>
      <Link
        href="/storage"
        className="inline-flex items-center text-[#d2ff4c] hover:text-[#e5ff85] transition-colors"
      >
        Storage Tips
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  )
}

