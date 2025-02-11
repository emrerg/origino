"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Calendar, User, Factory, Thermometer, Package, Truck } from "lucide-react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto mt-2 mb-2">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow-md bg-green-800">
          <button
            className="w-full flex justify-between items-center px-5 py-4 text-white font-semibold"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center gap-2">
              {item.title === "Picked" && <User size={18} />}
              {item.title === "Pressed" && <Factory size={18} />}
              {item.title === "Packed" && <Package size={18} />}
              <span>{item.title}</span>
            </div>
            {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {activeIndex === index && (
            <div className="p-5 bg-green-700 text-white text-sm space-y-3">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
