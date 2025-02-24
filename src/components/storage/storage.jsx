import { Circle, Sun, Thermometer, Wind } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
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
          <h1 className="text-[100px] font-semibold leading-[80px] tracking-tight">
            Sto
            <br />
            rage?
          </h1>
          <p className="text-[#D4E631]  text-[32px] leading-[32px] font-medium">
            What are the most appropriate storage conditions?
          </p>
        </div>

        <div className="space-y-8">
          {/* Light Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="w-10 h-10 text-[#D4E631]" />
              <h2 className="text-[48px] leading-[64px] tracking-tight font-semibold">Light</h2>
            </div>
            <p className="text-[#FFFFFF80]">
              Avoid placing olive oil in areas exposed to direct sunlight.
            </p>
            <p className="text-[#FFFFFF80]">
              Light accelerates oxidation leading to loss of flavor and
              nutritional value.
            </p>
            <p className="text-[#FFFFFF80]">
              This is why many olive oils are stored in dark-colored glass or
              containers that block light.
            </p>
          </div>

          {/* Temperature Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-10 h-10 text-[#D4E631]" />
              <h2 className="text-[48px] leading-[64px] tracking-tight  font-semibold">Temperature</h2>
            </div>
            <p className="text-[#FFFFFF80]">
              The ideal storage temperature is generally between 15-25°C
              (59-77°F)
            </p>
            <p className="text-[#FFFFFF80]">
              Very high temperatures (for example, those found near the stove)
              can speed up oxidation and spoilage.
            </p>
            <p className="text-[#FFFFFF80]">
              Very low temperatures (such as in the refrigerator) can make olive
              oil solidify. Although this is temporary, it may cause turbid or
              cloudy once it warms up. This doesn't affect the taste but may
              change the appearance.
            </p>
          </div>

          {/* Oxygen Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Circle className="w-10 h-10 text-[#D4E631]" />
              <h2 className="text-[48px] leading-[64px] tracking-tight font-semibold">Oxygen</h2>
            </div>
            <p className="text-[#FFFFFF80]">Minimize the contact with air.</p>
            <p className="text-[#FFFFFF80]">
              After each use, seal the bottle tightly to prevent oxidation.
            </p>
            <p className="text-[#FFFFFF80]">
              If you buy large tins or bottles, and you'd like to use them
              gradually, try transferring some oil into smaller containers with
              minimal headspace for exposure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
