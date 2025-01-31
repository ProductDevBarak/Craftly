import { useState } from "react";

export default function RepromptButton() {
  const [state, setState] = useState("normal");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="block">
      {state === "clicked" ? (
        <div
          className="flex items-center gap-2 w-full max-w-[600px] p-1 h-auto rounded-full bg-white border-2 border-transparent transition-all duration-300 font-dmSans"
          onMouseLeave={() => setState("normal")}
        >
          <button
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer"
            onClick={() => setState("normal")}
          >
            <svg
              width="1"
              height="15"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 19L1.5 10L10.5 1"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 bg-white text-black placeholder-black border-none focus:outline-none font-dmSans"
            autoFocus
            placeholder="Fine-tune your prompt here"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 46 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6476 17.0072C16.6476 13.2235 19.4593 10.1562 22.9277 10.1562C26.3961 10.1562 29.2077 13.2235 29.2077 17.0072V23.8582C29.2077 27.6418 26.3961 30.7091 22.9277 30.7091C19.4593 30.7091 16.6476 27.6419 16.6476 23.8582V17.0072Z"
              fill="#525252"
            />
          </svg>
        </div>
      ) : (
        <div className="border-animation">
        <button
          className={`flex items-center gap-2 p-4 rounded-full bg-white text-black cursor-pointer transition-all duration-300 animated-button ${
            state === "hovered" ? "w-48" : "w-12"
          }`}
          onMouseEnter={() => setState("hovered")}
          onMouseLeave={() => setState("normal")}
          onClick={() => setState("clicked")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.61538 19.5H0.5L0.5 14.3747L11.0962 3.75803M5.61538 19.5L19.5 19.5M5.61538 19.5L16.2115 8.88332M11.0962 3.75803L13.2885 1.56148C14.701 0.146165 16.9913 0.146166 18.4038 1.56148C19.8164 2.97679 19.8164 5.27146 18.4038 6.68677L16.2115 8.88332M11.0962 3.75803L16.2115 8.88332"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {state === "hovered" && (
            <div className="text-black font-dmSans">
              Fine-tune your prompt
            </div>
          )}
        </button>
        </div>
      )}
      <style>
        {`
          .border-animation {
                position: relative;
                display: inline-block;
                padding: 3px;
                border-radius: 9999px;
                background: conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red);
                animation: rotate 8s linear infinite;
            }

            .animated-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            position: relative;
            z-index: 1; /* Ensures the button is above the animated border */
            }

            @keyframes rotate {
            0% {
                background: conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red);
            }
            100% {
                background: conic-gradient(from 360deg, red, yellow, lime, aqua, blue, magenta, red);
            }
            }
        `}
      </style>
    </div>
  );
}
