import * as React from "react";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
import { cx } from "./common.ts";
import TopbarButtons from "./TopbarButtons.tsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

export default function Topbar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [showPopup, setShowPopup] = useState(false);
  const editor = (window as any).editor;
  const exportToZip = () => {
    const editor = (window as any).editor;
    if (editor) {
      const html = editor.getHtml();
      const css = editor. getCss();
      const zip = new JSZip();
      zip.file(
        "index.html",
        `<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="./styles.css">\n</head>\n${html}\n</html>`
      );
      if (css.trim()) {
        zip.file("styles.css", css);
      }
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "project.zip");
      });
    }
  };

  const handleClick = () => {
    const editor = (window as any).editor;
    if (editor) {
      //editor.runCommand("core:open-code");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
            strokeWidth="1.35519"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Get Code
      </button>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0B0B0B] rounded-lg shadow-lg p-6 w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center font-sans text-white">
              Code
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              <div
                className="bg-[#1E1E1E] p-4 rounded-lg border border-[#646464] text-white flex-1 overflow-y-auto custom-scrollbar"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                <h3 className="text-lg font-semibold mb-2">HTML</h3>
                {editor &&
                  editor
                  .getHtml()
                  .split(">")
                  .map((line, index) => (
                    <div key={index}>
                      {line.trim()}
                      {index < editor.getHtml().split(">").length - 1 && ">"}
                    </div>
                  ))}
              </div>
              <div
                className="bg-[#1E1E1E] p-4 rounded-lg border border-[#646464] text-white flex-1 overflow-y-auto"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                <h3 className="text-lg font-semibold mb-2">CSS</h3>
                {editor &&
                  editor
                  .getCss()
                  .split(";")
                  .map((line, index) => (
                    <div key={index}>
                      {line.trim()}
                      {index < editor.getCss().split(";").length - 1 && ";"}
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#FFFFFF] text-[#000000] text-400 px-4 py-2 rounded"
                onClick={exportToZip}
              >
                <div className="flex justify-center gap-2 align-center">
                <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.5 22.5769C23.5 24.1913 22.1569 25.5 20.5 25.5H11.5C9.84314 25.5 8.5 24.1913 8.5 22.5769L8.50002 12.3462M14.5 6.5H13.75L8.50002 11.6154L8.50002 12.3462M14.5 6.5H20.5C22.1569 6.5 23.5 7.80871 23.5 9.42308L23.5 12.3462M14.5 6.5V12.3462H8.50002M14.5 17.4615H22.75M22.75 17.4615L19.75 14.5385M22.75 17.4615L19.75 20.3846" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                  Zip
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}