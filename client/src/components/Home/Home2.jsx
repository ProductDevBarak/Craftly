import React, { useState } from "react";
// import ChatHistory from "./ChatHistory.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [history] = useState([
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
  ]);
  const [username] = useState("Deepak");
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (e) => {
    console.log(prompt);
    e.preventDefault();
    setPrompt("");
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSelectChat = (chat) => {
    navigate(`/chat?message=${encodeURIComponent(chat)}`);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="text-white font-dmSans bg-[url(../public/images/Rectangle54.png)] h-screen flex flex-col">
      {/* <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex items-center">
          <div className="text-xl font-bold cursor-pointer">CraFtLy</div>
          <button
            className="ml-4 p-2 rounded bg-gray-600 hover:bg-gray-500"
            onClick={toggleVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
              <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
            </svg>
          </button>
        </div>
        <div className="w-10 h-10 bg-indigo-500 text-white flex justify-center items-center rounded-full text-lg font-bold cursor-pointer">
          {username.charAt(0).toUpperCase()}
        </div>
      </header> */}
      <div className="flex flex-grow">
        {/* <ChatHistory
          onSelectChat={handleSelectChat}
          history={history}
          isVisible={isVisible}
        /> */}
        <main className="flex flex-col items-center flex-grow p-8">
          <h1 className="text-2xl font-bold mb-4">Let's try something?</h1>
          <div className="flex items-center space-x-2 mb-6 w-full max-w-lg">
            <input
              type="text"
              value={prompt}
              placeholder="Write your idea"
              className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none text-white"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="p-3 rounded-full bg-gray-600 hover:bg-gray-500"
            >
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 10.5H21.5M21.5 10.5L13 2M21.5 10.5L13 19"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 text-lg">Wanna try these???</div>
        </main>
      </div>
    </div>
  );
}
