import { useState } from "react";
import "./SearchButton.css"; // Import the CSS file

const SearchButton = () => {
  const [state, setState] = useState("normal");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="search-container">
      {state === "clicked" ? (
        <div
        className={`search-button ${state === "clicked" ? "clicked" : ""}`}
          onClick={() => {
            setState("clicked");
          }}
          onMouseLeave={() => {
            setState("normal");
          }}
        >
          <button
            className="back-btn"
            onClickCapture={() => {
              setState("hovered");
            }}
          >
            
            <svg

             className="back-btn-icon"
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 19L1.5 10L10.5 1"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
            placeholder="Fine tune your Prompt here"
          />

          <svg
        
            width="46"
            height="50"
            viewBox="0 0 46 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6476 17.0072C16.6476 13.2235 19.4593 10.1562 22.9277 10.1562C26.3961 10.1562 29.2077 13.2235 29.2077 17.0072V23.8582C29.2077 27.6418 26.3961 30.7091 22.9277 30.7091C19.4593 30.7091 16.6476 27.6419 16.6476 23.8582V17.0072Z"
              fill="#525252"
            />
            <path
              d="M33.3944 21.5745V23.8582C33.3944 30.1643 28.7083 35.2764 22.9277 35.2764C17.1471 35.2764 12.4609 30.1643 12.4609 23.8582V21.5745M22.9277 36.4183V39.8438M22.9277 39.8438H27.1144M22.9277 39.8438H18.741M22.9277 30.7091C19.4593 30.7091 16.6476 27.6419 16.6476 23.8582V17.0072C16.6476 13.2235 19.4593 10.1562 22.9277 10.1562C26.3961 10.1562 29.2077 13.2235 29.2077 17.0072V23.8582C29.2077 27.6418 26.3961 30.7091 22.9277 30.7091Z"
              stroke="#646464"
              stroke-width="1.39394"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
  

          <svg
            style={{
              padding:'0px'
            }}
            width="50"
            height="41"
            viewBox="0 0 50 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6535 9.43989L36.2205 17.4437C38.4511 18.3118 38.55 20.8315 36.3919 21.8104L16.803 30.6956C14.4324 31.7709 11.6177 30.0267 12.3164 27.9155L14.6665 20.8144C14.8295 20.3218 14.7983 19.8008 14.5772 19.323L11.4276 12.5178C10.4628 10.4331 13.1591 8.46919 15.6535 9.43989Z"
              fill="#525252"
            />
          </svg>

        </div>
      ) : (
        <button
          className={`search-button ${state === "hovered" ? "hovered" : ""}`}
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
            <span className="search-text">Fine-tune your prompt</span>
          )}
        </button>
      )}
    </div>
  );
};

export default SearchButton;
