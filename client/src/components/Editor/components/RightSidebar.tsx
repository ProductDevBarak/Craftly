import * as React from "react";
import {
  BlocksProvider,
  LayersProvider,
  StylesProvider,
} from "@grapesjs/react";
import { useState } from "react";
import CustomBlockManager from "./CustomBlockManager.tsx";
import { cx } from "./common.ts";
import CustomLayerManager from "./CustomLayerManager.tsx";
import CustomStyleManager from "./CustomStyleManager.tsx";

const TABS = [
  {
    id: 0,
    label: "Components",
    svg: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9547 20.9372L7.55272 22.3407C6.97201 22.9221 6.97201 23.8647 7.55272 24.446C8.13344 25.0274 9.07497 25.0274 9.65568 24.446L11.0577 23.0425M20.1705 11.8145L16.3151 15.6741M12.8101 24.1171L24.0478 12.8671C25.4028 11.5107 25.4028 9.31136 24.0478 7.95487C22.6928 6.59838 20.4959 6.59838 19.1409 7.95487L7.90323 19.2049L12.8101 24.1171Z"
          stroke="#65E06B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 1,
    label: "Edit Menu",
    svg: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9547 20.9372L7.55272 22.3407C6.97201 22.9221 6.97201 23.8647 7.55272 24.446C8.13344 25.0274 9.07497 25.0274 9.65568 24.446L11.0577 23.0425M20.1705 11.8145L16.3151 15.6741M12.8101 24.1171L24.0478 12.8671C25.4028 11.5107 25.4028 9.31136 24.0478 7.95487C22.6928 6.59838 20.4959 6.59838 19.1409 7.95487L7.90323 19.2049L12.8101 24.1171Z"
          stroke="#65E06B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Layers",
    svg: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2884 13.0769H22.5C24.1568 13.0769 25.5 14.4201 25.5 16.0769V22.5C25.5 24.1568 24.1568 25.5 22.5 25.5H16.0769C14.4201 25.5 13.0769 24.1568 13.0769 22.5V19.2884M9.5 18.9231H15.9231C17.5799 18.9231 18.9231 17.5799 18.9231 15.9231V9.5C18.9231 7.84315 17.5799 6.5 15.9231 6.5H9.5C7.84315 6.5 6.5 7.84315 6.5 9.5V15.9231C6.5 17.5799 7.84315 18.9231 9.5 18.9231Z"
          stroke="#E27F7F"
        />
      </svg>
    ),
  },
];

export default function RightSidebar() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="bg-gradient-to-br from-neutral-950 to-neutral-800 gjs-right-sidebar flex flex-col px-2 min-w-[350px] max-w-[350px] h-full pb-2">
      <div className="flex justify-between w-full gap-0 mt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={cx(
              "flex items-center p-2 rounded-t-lg text-xs font-sans space-nowrap justify-center ",
              selectedTab === tab.id
                ? "border border-gray-500 border-b-transparent"
                : "border border-transparent border-b-gray-500 bg-transparent"
            )}
            style={{ flex: 1, textAlign: "center" }}
          >
            {tab.svg}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      <div
        className="overflow-y-scroll flex-grow border border-gray-500 border-t-transparent rounded-b-lg h-0 custom-scrollbar"
        style={{ minHeight: 0 }}
      >
        {selectedTab === 0 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
        {selectedTab === 1 && (
          <StylesProvider>
            {(props) => <CustomStyleManager {...props} />}
          </StylesProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
      </div>
    </div>
  );
}
