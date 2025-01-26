import clsx from "clsx";
import React from "react";

const accordionIcon = (
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

const CustomAccordion = ({ title, children, className, size }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const textSizeClass = clsx({
    "text-xs": size === "xs",
    "text-sm": size === "sm",
    "text-md": size === "md",
    "text-lg": size === "lg",
  });

  return (
    <div className={`custom-accordion ${className}`}>
      <div
        className={`accordion-header cursor-pointer flex items-center justify-between px-4 py-2 text-white ${textSizeClass}`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {accordionIcon}
        </span>
      </div>
      {isOpen && <div className="accordion-content px-4 py-2">{children}</div>}
    </div>
  );
};

export default CustomAccordion;
