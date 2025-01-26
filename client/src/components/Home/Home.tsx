import React from "react";
import Template from "./Template.tsx";
import "../Home/home.css";
import { useState } from "react";
import { createChat } from "../../utils/code.js";
import { useNavigate } from "react-router-dom";
import Logout from "../Login/LogOut.tsx";

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    console.log(prompt);
    e.preventDefault();
    const response = await createChat(prompt, navigate);
    // console.log(response);
    setPrompt("");
    const id = response._id;
    console.log(id);
    navigate(`/editor/${id}`);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="dropdown-arrow">▼</span>
          <span className="dropdown-text">Humare WEBSITE</span>
        </div>
      </header>
      <main className="main-content">
        <h1>Lorem ipsum dolor sit amet.</h1>
        <div className="input-container">
          <input
            type="text"
            value={prompt}
            placeholder="Enter your prompt"
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
          <div>template</div>
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
        <Logout />
      </main>
    </div>
  );
}
