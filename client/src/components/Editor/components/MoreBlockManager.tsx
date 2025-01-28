import React, { useState } from "react";
import { MAIN_BORDER_COLOR, cx } from "./common.ts";

export interface BlockAttribute {
  label: string;
  prop: any;
}

export interface CategorizedBlock {
  name: string;
  attributes: BlockAttribute[];
}

interface MoreBlockManagerProps {
  mapCategoryBlocks: any;
  dragStart: (block: any, event: DragEvent) => void;
  dragStop: (isDragging: boolean) => void;
}

const segregateBlocks = (mapCategoryBlocks: any): CategorizedBlock[] => {
  const moreblocks: CategorizedBlock[] = [
    { name: "Columns", attributes: [] },
    { name: "Text", attributes: [] },
    { name: "Media", attributes: [] },
    { name: "Input", attributes: [] },
    { name: "Extra", attributes: [] },
  ];

  mapCategoryBlocks.forEach((block: any) => {
    block.forEach((p: any) => {
      if (
        p.attributes.label === "1 Column" ||
        p.attributes.label === "2 Columns" ||
        p.attributes.label === "3 Columns" ||
        p.attributes.label === "2 Columns 3/7"
      ) {
        moreblocks[0].attributes.push({ label: p.attributes.label, prop: p });
      }
      if (p.attributes.label === "Text") {
        moreblocks[1].attributes.push({ label: p.attributes.label, prop: p });
      }
      if (p.attributes.label === "Image" || p.attributes.label === "Video") {
        moreblocks[2].attributes.push({ label: p.attributes.label, prop: p });
      }
      if (
        p.attributes.label === "Form" ||
        p.attributes.label === "Input" ||
        p.attributes.label === "Textarea" ||
        p.attributes.label === "Select" ||
        p.attributes.label === "Label" ||
        p.attributes.label === "Checkbox" ||
        p.attributes.label === "Radio"
      ) {
        moreblocks[3].attributes.push({ label: p.attributes.label, prop: p });
      }
      if (
        p.attributes.label === "Countdown" ||
        p.attributes.label === "Tooltip" ||
        p.attributes.label === "Custom Code" ||
        p.attributes.label === "Calendar" ||
        p.attributes.label === "Map"
      ) {
        moreblocks[4].attributes.push({ label: p.attributes.label, prop: p });
      }
    });
  });

  return moreblocks;
};

const MoreBlockManager: React.FC<MoreBlockManagerProps> = ({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}) => {
  const categorizedBlocks = segregateBlocks(mapCategoryBlocks);

  const [visibleCategories, setVisibleCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategoryVisibility = (categoryName: string) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="gjs-custom-block-manager text-left">
      {categorizedBlocks.map((block) => {
        if (block.attributes.length === 0) return null;

        const isVisible = visibleCategories[block.name] ?? false;

        return (
          <div key={block.name}>
            <div
              className={cx("py-2 px-4 border-[#646464] border-t my-1 flex justify-between items-center cursor-pointer")}
              onClick={()=> toggleCategoryVisibility(block.name)}
            >
              <span className="text-gray-400 font-inter">{block.name}</span>
              <button
                className="pl-2 py-1"
              >
                <svg
                  className={`transform transition-transform duration-300 ${
                    isVisible ? "rotate-180" : "rotate-0"
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
                  stroke-opacity="0.56" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            {isVisible && (
              <div className="grid grid-cols-2 gap-2 p-2">
                {block.attributes.map((attribute) => (
                  <div
                    key={attribute.label}
                    draggable
                    className={cx(
                      "flex flex-col items-center border-t rounded cursor-pointer py-2 px-5 transition-colors",
                      MAIN_BORDER_COLOR
                    )}
                    onDragStart={(ev: React.DragEvent<HTMLDivElement>) =>
                      dragStart(attribute.prop, ev.nativeEvent)
                    }
                    onDragEnd={() => dragStop(false)}
                  >
                    <div
                      className="h-10 w-10"
                      dangerouslySetInnerHTML={{
                        __html: attribute.prop.getMedia(),
                      }}
                    />
                    <div
                      className="text-sm text-center w-full"
                      title={attribute.label}
                    >
                      {attribute.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MoreBlockManager;
