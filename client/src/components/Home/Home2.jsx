import React, { useState } from "react";
import Template from "./Template";
import ChatHistory from "./ChatHistory.jsx";
import "../Home/home.css";
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
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
    "Hello, how are you?",
    "What's the weather today?",
    "Tell me a joke.",
    "Explain React hooks.",
    "Generate a landing page template.",
  ]);
const [username] = "Deepak";
  const handleSubmit = async (e) => {
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

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  return (
    <div className="app">
      <header className="header">
      <div className="left-icon">
        <div className="logo">
          <span className="dropdown-arrow">▼</span>
          <span className="dropdown-text">CraFtLy</span>
        </div>
        <button className={!isVisible ? "toggle-button-closed":"toggle-button-opened"} onClick={toggleVisibility}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-layout-sidebar-inset-reverse"
          viewBox="0 0 16 16"
        >
          <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
          <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
        </svg>
      </button>
      </div>
        <div className="user-icon">
        {username.charAt(0).toUpperCase()}
        </div>
      </header>
      <div className="body">
        <ChatHistory onSelectChat={handleSelectChat} history={history} isVisible={isVisible} />
        <main className="main-content">
          <h1>Let's try something?</h1>
          <div className="input-container">
            <input
              type="text"
              value={prompt}
              placeholder="Write your idea"
              className="input-box"
              onChange={handleChange}
            />
            <button onClick={handleSubmit} className="submit-button">
              <span>
                <svg
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10.5H21.5M21.5 10.5L13 2M21.5 10.5L13 19"
                    stroke="black"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="Templates3">
            <div>wanna try these???</div>
            <div className="temp">
              <Template
                title="Portfolio"
                svg={
                  <svg
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="49" height="49" fill="#D9D9D9" />
                  </svg>
                }
              />
              <Template
                title="Landing Page"
                svg={
                  <svg
                    width="43"
                    height="37"
                    viewBox="0 0 43 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 0L42.7176 36.75H0.282377L21.5 0Z"
                      fill="#D9D9D9"
                    />
                  </svg>
                }
              />
              <Template
                title="E-commerce"
                svg={
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22" cy="22" r="22" fill="#D9D9D9" />
                  </svg>
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}