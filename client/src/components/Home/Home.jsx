import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Login/LogOut.tsx";
import Template from "./Template.tsx";
import { createChat, getCode } from "../../utils/code.js";

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [codes, setCodes] = useState([]);
  const [id, setId] = useState("");

  const getuser = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/get-user", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setPrompts(data.user.prompts);
      setId(data.user._id);
    } catch (error) {
      console.error("Error in getuser:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseChat = await createChat(prompt, id, navigate);
      setPrompt("");
      navigate(`/editor/${responseChat._id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const codeArray = await Promise.all(
          prompts.map(async (p) => {
            const code = await getCode(p);
            return code;
          })
        );
        setCodes(codeArray);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    if (prompts.length > 0) {
      fetchTitles();
    }
  }, [prompts]);

  const handleChange = (e) => setPrompt(e.target.value);
  return (
    <div className="flex flex-col items-center text-center min-h-screen">
      <header className="w-full flex h-[70px] justify-between items-center py-4 px-6 bg-gray-800">
        <div className="flex items-center space-x-2 text-white cursor-pointer">
          <span className="text-xl">▼</span>
          <span className="text-sm font-medium">Humare WEBSITE</span>
        </div>
      </header>

      <main className="w-full h-[calc(100vh-70px)] flex">
        <div className="w-[400px] bg-black text-white p-4">
          {codes.map((code, index) => {
            return (
              <h1
                key={index}
                onClick={() => navigate(`/editor/${code._id}`)}
                className="text-lg mb-2 hover:cursor-pointer text-gray-300 hover:text-white"
              >
                {code.title}
              </h1>
            );
          })}
        </div>
        <div className="w-full mt-40">
          <h1 className="text-3xl font-bold">Lorem ipsum dolor sit amet.</h1>

          <div className="flex justify-center items-center mt-10">
            <input
              type="text"
              value={prompt}
              placeholder="Enter your prompt"
              className="w-1/2 p-3 rounded-lg text-black"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="ml-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-4"
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

          <div className="mt-10">
            <h2 className="text-xl font-semibold">Templates</h2>
            <div className="flex justify-center gap-4 mt-6">
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
          <div className="mt-8">
            <Logout />
          </div>
        </div>
      </main>
    </div>
  );
}
