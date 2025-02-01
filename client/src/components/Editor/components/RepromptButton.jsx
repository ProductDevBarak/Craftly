import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { updateChat, getCode } from "../../../utils/code";
import { Editor, EditorConfig } from "grapesjs";

export default function RepromptButton({ editor, setLoading }) {
  const { id } = useParams();
  const [state, setState] = useState("normal");
  const [searchTerm, setSearchTerm] = useState("");
  const [sendCode, setSendCode] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const html = editor.getHtml();
        const css = editor.getCss();
        const result = html + "\n" + css;
        setSendCode(result);
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState("normal");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const responseChat = await updateChat(sendCode, searchTerm, id);
      console.log("patience");
      if (editor) {
        editor.setStyle(responseChat.CSS);
        editor.setComponents(responseChat.HTML);
        console.log(responseChat.CSS);
        console.log(responseChat.HTML);
      } else {
        console.error("Editor not found");
      }
      setLoading(false);
      setTimeout(() => {
        setSearchTerm("");
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className="block border-animation" ref={ref}>
      {state === "clicked" ? (
        <div className="flex items-center gap-2 min-w-[calc(100vw-410px)] p-1 h-auto rounded-full bg-white border-2 border-transparent transition-all duration-300 font-dmSans">
          <button
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer animated-button p-1"
            onClick={() => setState("normal")}
          >
            <svg
              width="15"
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
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
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
            padding: 1.5px;
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
            z-index: 1; 
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
