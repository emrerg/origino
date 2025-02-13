      import { Sun, Thermometer, Wind } from "lucide-react"
import { X } from "lucide-react"
import Link from "next/link"
export default function StorageGuide() {
  return (
    <div className="bg-black text-white p-6 max-w-md mx-auto">

<Link href="/">

      <div className="absolute top-10   cursor-pointer right-10">
        <X className="w-6 h-6 text-white" />
      </div>
</Link>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Sto
            <br />
            rage?
          </h1>
          <p className="text-[#ADFF2F] font-medium">What are the most appropriate storage conditions?</p>
        </div>

        <div className="space-y-8">
          {/* Light Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-[#ADFF2F]" />
              <h2 className="text-xl font-semibold">Light</h2>
            </div>
            <p className="text-gray-300">Avoid placing olive oil in areas exposed to direct sunlight.</p>
            <p className="text-gray-300">
              Light accelerates oxidation leading to loss of flavor and nutritional value.
            </p>
            <p className="text-gray-300">
              This is why many olive oils are stored in dark-colored glass or containers that block light.
            </p>
          </div>

          {/* Temperature Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-[#ADFF2F]" />
              <h2 className="text-xl font-semibold">Temperature</h2>
            </div>
            <p className="text-gray-300">The ideal storage temperature is generally between 15-25°C (59-77°F)</p>
            <p className="text-gray-300">
              Very high temperatures (for example, those found near the stove) can speed up oxidation and spoilage.
            </p>
            <p className="text-gray-300">
              Very low temperatures (such as in the refrigerator) can make olive oil solidify. Although this is
              temporary, it may cause turbid or cloudy once it warms up. This doesn't affect the taste but may change
              the appearance.
            </p>
          </div>

          {/* Oxygen Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wind className="w-6 h-6 text-[#ADFF2F]" />
              <h2 className="text-xl font-semibold">Oxygen</h2>
            </div>
            <p className="text-gray-300">Minimize the contact with air.</p>
            <p className="text-gray-300">After each use, seal the bottle tightly to prevent oxidation.</p>
            <p className="text-gray-300">
              If you buy large tins or bottles, and you'd like to use them gradually, try transferring some oil into
              smaller containers with minimal headspace for exposure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

