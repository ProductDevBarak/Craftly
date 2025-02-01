import clsx from "clsx";
import React from "react";

const accordionIconWhite = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 20.5L16 11.5L25 20.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const accordionIconGray = (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M7 20.5L16 11.5L25 20.5" 
      stroke="white" 
      stroke-opacity="0.56" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const CustomAccordion = ({ title, children, className, size, colour, font, svg, border }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const textSizeClass = clsx({
    "text-xs": size === "xs",
    "text-sm": size === "sm",
    "text-md": size === "md",
    "font-[500]": size === "lg",
  });

  const selectedIcon = svg === "Gray" ? accordionIconGray : accordionIconWhite;
  return (
    <div className={`custom-accordion ${className} border-t border-[#646464] mb-4 pt-3`}>
      {/* Accordion Header */}
      <div
        className={`accordion-header cursor-pointer flex items-center align-middle justify-between px-4 pt-2 pb-2 font-${font} ${textSizeClass}  text-${colour}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {selectedIcon}
        </span>
      </div>
      {/* Accordion Content */}
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
