import * as React from "react";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
import { cx } from "./common.ts";
import TopbarButtons from "./TopbarButtons.tsx";

export default function Topbar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const handleClick = () => {
    const editor = (window as any).editor;
    if (editor) {
      editor.runCommand("core:open-code");
    }
  };

  return (
    <div
      className={cx(
        "gjs-top-sidebar flex justify-between items-center p-1",
        className
      )}
    >
      <div
        className="flex items-center justify-center relative"
        style={{ width: "calc(100% - 350px)" }}
      >
        <DevicesProvider>
          {({ selected, select, devices }) => (
            <div className="flex justify-center flex-grow">
              <div
                key="Desktop"
                className={`cursor-pointer p-1 pr-1.5 m-1 mb-1.5 rounded ${
                  selected === "desktop"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
                onClick={() => select("Desktop")}
                title="Desktop"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5469 17.4936L6.51172 17.4936M20.4221 25.5469H11.6366M13.1008 25.5469V21.1542M18.9578 25.5469V21.1542M23.5432 21.1542L8.51543 21.1542C7.40881 21.1542 6.51172 20.2571 6.51172 19.1505L6.51172 8.51544C6.51172 7.40882 7.40881 6.51173 8.51542 6.51173L23.5432 6.51172C24.6498 6.51172 25.5469 7.40881 25.5469 8.51543V19.1505C25.5469 20.2571 24.6498 21.1542 23.5432 21.1542Z"
                    stroke="white"
                    strokeWidth="1.60297"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <svg
                className="my-1 mt-1.5"
                width="20"
                height="30"
                viewBox="0 0 23 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8906 0.199219V33.8615"
                  stroke="white"
                  strokeOpacity="0.5"
                  strokeWidth="1.20222"
                />
              </svg>

              <div
                key="MobilePortrait"
                className={`cursor-pointer p-1 pt-0.5 pr-1.5 m-1 ml-4 mb-1.5 rounded ${
                  selected === "mobilePortrait"
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-700"
                }`}
                onClick={() => select("mobilePortrait")}
                title="MobilePortrait"
              >
                <svg
                  className="mb-1 mt-0.5"
                  width="22"
                  height="22"
                  viewBox="0 0 30 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3302 23.4199C19.7728 23.4199 20.1317 23.0611 20.1317 22.6184C20.1317 22.1758 19.7728 21.8169 19.3302 21.8169V23.4199ZM12.9655 21.8169C12.5228 21.8169 12.164 22.1758 12.164 22.6184C12.164 23.0611 12.5228 23.4199 12.9655 23.4199V21.8169ZM20.1552 6.51172L20.1552 7.3132L20.1552 6.51172ZM12.1404 6.51172L12.1404 5.71024L12.1404 6.51172ZM10.1367 23.5432L10.9382 23.5432L10.9382 23.5432L10.1367 23.5432ZM10.1367 8.51543L9.33524 8.51543V8.51543L10.1367 8.51543ZM20.1552 25.5469L20.1552 24.7454H20.1552V25.5469ZM12.1404 25.5469L12.1404 26.3484H12.1404V25.5469ZM22.1589 23.5432L22.9604 23.5432L22.9604 23.5432L22.1589 23.5432ZM22.159 8.51543L21.3575 8.51543L21.3575 8.51543L22.159 8.51543ZM20.1552 5.71024L12.1404 5.71024L12.1404 7.3132L20.1552 7.3132L20.1552 5.71024ZM10.9382 23.5432L10.9382 8.51543L9.33524 8.51543L9.33524 23.5432L10.9382 23.5432ZM20.1552 24.7454H12.1404V26.3484H20.1552V24.7454ZM22.9604 23.5432L22.9604 8.51543L21.3575 8.51543L21.3575 23.5432L22.9604 23.5432ZM20.1552 26.3484C21.7045 26.3484 22.9604 25.0925 22.9604 23.5432L21.3575 23.5432C21.3575 24.2072 20.8192 24.7454 20.1552 24.7454L20.1552 26.3484ZM20.1552 7.3132C20.8192 7.3132 21.3575 7.85146 21.3575 8.51543L22.9604 8.51543C22.9604 6.96616 21.7045 5.71024 20.1552 5.71024L20.1552 7.3132ZM12.1404 5.71024C10.5912 5.71024 9.33524 6.96616 9.33524 8.51543L10.9382 8.51543C10.9382 7.85145 11.4765 7.3132 12.1404 7.3132L12.1404 5.71024ZM9.33524 23.5432C9.33524 25.0925 10.5912 26.3484 12.1404 26.3484L12.1404 24.7454C11.4765 24.7454 10.9382 24.2072 10.9382 23.5432L9.33524 23.5432ZM12.9655 23.4199H19.3302V21.8169H12.9655V23.4199Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          )}
        </DevicesProvider>{" "}
        <div className="absolute right-0">
          <WithEditor>
            <TopbarButtons className="ml-auto px-2" />
          </WithEditor>
        </div>
      </div>

      <button
        className="bg-white text-black px-2 pr-3 py-1 text-sm font-sm rounded mx-2 flex gap-1 items-center justify-between hover:bg-gray-200"
        onClick={handleClick}
      >
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.90644 7.68397L5.26013 10.2794C4.72579 10.8035 4.72579 11.6532 5.26013 12.1772L7.90644 14.7726M14.3169 7.76857L16.877 10.2794C17.4113 10.8034 17.4113 11.6531 16.877 12.1772L14.3169 14.688M12.703 5.46875L9.54088 16.9878"
            stroke="black"
            stroke-width="1.35519"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Get Code
      </button>
    </div>
  );
}
