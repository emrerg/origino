"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: index === activeIndex,
            onClick: () => handleItemClick(index),
          });
        }
        return null;
      })}
    </div>
  );
};

const AccordionItem = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className={cn("border-b", props.className, {
      "bg-gray-100": props.isActive,
    })}
    onClick={props.onClick}
    {...props}
  >
    {props.children}
  </div>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef((props, ref) => (
  <div className="flex p-4 cursor-pointer" {...props}>
    <div className={cn("flex-1", props.className)}>{props.children}</div>
    <ChevronDown
      className="h-4 w-4 transition-transform duration-200"
      style={{
        transform: props.isActive ? "rotate(180deg)" : "rotate(0deg)",
      }}
    />
  </div>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className={cn("overflow-hidden text-sm transition-all", props.className, {
      "max-h-0": !props.isActive,
    })}
    style={{ maxHeight: props.isActive ? "1000px" : "0px" }}
    {...props}
  >
    <div className={cn("pb-4 pt-0", props.className)}>{props.children}</div>
  </div>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
