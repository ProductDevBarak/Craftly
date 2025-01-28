import * as React from "react";
import { useState } from "react";
import { BlocksResultProps } from "@grapesjs/react";
import MoreBlockManager from "./MoreBlockManager.tsx";
import ThemesBlockManager from "./ThemesBlockManager.jsx";

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>;

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isThemesVisible, setIsThemesVisible] = useState(false);

  const toggleMore = () => {
    setIsMoreVisible((prev) => !prev);
    if (isThemesVisible) setIsThemesVisible(false);
  };

  const toggleThemes = () => {
    setIsThemesVisible((prev) => !prev);
    if (isMoreVisible) setIsMoreVisible(false);
  };

  return (
    <div className="custom-block-manager">
      <div
        className="themes-header flex items-center justify-between pt-3 px-4 cursor-pointer"
        onClick={toggleThemes}
      >
        <h1 className="text-lg font-sans text-[300]">Themes</h1>
        <button className="py-1 text-white rounded">
          <svg
            className={`transform transition-transform duration-300 ${
              isThemesVisible ? "rotate-180" : "rotate-0"
            }`}
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
        </button>
      </div>
      {isThemesVisible && <ThemesBlockManager />}
      <div
        className="more-header flex items-center justify-between pt-3 px-4 cursor-pointer"
        onClick={toggleMore}
      >
        <h1 className="text-lg font-sans text-[300]">More</h1>
        <button className="py-1 text-white rounded">
          <svg
            className={`transform transition-transform duration-300 ${
              isMoreVisible ? "rotate-180" : "rotate-0"
            }`}
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
        </button>
      </div>
      {isMoreVisible && (
        <MoreBlockManager
          mapCategoryBlocks={mapCategoryBlocks}
          dragStart={dragStart}
          dragStop={dragStop}
        />
      )}
    </div>
  );
}
