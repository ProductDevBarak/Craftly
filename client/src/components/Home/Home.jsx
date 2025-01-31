import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Login/LogOut.tsx";
import { createChat, getCode, deleteCode } from "../../utils/code.js";
import { set } from "date-fns";

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [codes, setCodes] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(true);
  const [lopen, setLopen] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLopen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      setUserName(data.user.name);
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

  const handleDelete = async (e) => {
    try {
      const response = await deleteCode({ id: e.target.id, userid: id });
      if (response.status === 200) {
        alert("Code Deleted Successfully");
        pageRefresh();
      }
    } catch (error) {
      alert("Failed to delete code");
      console.error("Error in handleDelete:", error);
    }
  };

  const pageRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const codeArray = await Promise.all(
          prompts.map(async (p) => await getCode(p))
        );
        setCodes(codeArray);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    if (prompts.length > 0) fetchTitles();
  }, [prompts]);

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 -z-40 bg-[#141414]"></div>
      <div className="absolute inset-0 -z-10 bg-[url(../public/images/Group16.png)] opacity-20 bg-cover"></div>
      <div
        style={{ backdropFilter: "blur(50px)" }}
        className="absolute inset-0 -z-20"
      ></div>
      <div className="absolute w-96 h-96 top-[-200px] left-[-200px] -z-30 rounded-full bg-[#33c8a5] animate-moveCircle1 opacity-40"></div>
      <div className="absolute w-96 h-96 bottom-[-200px] right-[-200px] -z-30 rounded-full bg-[#313E05] animate-moveCircle2 "></div>

      <style jsx>{`
        @keyframes moveCircle1 {
          0% {
            top: -200px;
            left: -200px;
          }
          25% {
            top: -200px;
            left: calc(100% - 200px);
          }
          50% {
            top: calc(100% - 200px);
            left: calc(100% - 200px);
          }
          75% {
            top: calc(100% - 200px);
            left: -200px;
          }
          100% {
            top: -200px;
            left: -200px;
          }
        }
        @keyframes moveCircle2 {
          0% {
            bottom: -200px;
            right: -200px;
          }
          25% {
            bottom: -200px;
            right: calc(100% - 200px);
          }
          50% {
            bottom: calc(100% - 200px);
            right: calc(100% - 200px);
          }
          75% {
            bottom: calc(100% - 200px);
            right: -200px;
          }
          100% {
            bottom: -200px;
            right: -200px;
          }
        }
        .animate-moveCircle1 {
          animation: moveCircle1 70s linear infinite;
        }
        .animate-moveCircle2 {
          animation: moveCircle2 70s linear infinite;
        }
      `}</style>

      <header className="w-full flex h-[120px] justify-between items-center py-[25px] px-8">
        <img src="/images/logo.png" alt="Logo" />
        <div className="flex space-x-4">
          <button
            className="flex text-black items-center space-x-2 bg-white px-4 py-2 rounded-full hover:bg-gray-200"
            onClick={() => setOpen(false)}
            style={{ display: open ? "" : "none" }}
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.01069 11.1097L16.6588 11.1072M16.6588 11.1072L13.2535 7.5909M16.6588 11.1072L13.2535 14.6236"
                stroke="black"
                strokeWidth="1.95876"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Previous projects</span>
          </button>
          <div className="relative">
            <button
              className="h-[50px] w-[50px] rounded-full bg-[#FF4E4E] border border-[#646464] flex items-center justify-center"
              onClick={(event) => {
                event.stopPropagation();
                setLopen((prev) => !prev);
              }}
            >
              <span className="text-black font-bold ">
                {userName.charAt(0)}
              </span>
            </button>

            {lopen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-4 bg-[#1E1E1E] border border-gray-700 px-4 py-2 shadow-lg rounded-lg z-50"
              >
                <Logout />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="w-full flex flex-grow pt-20 pr-48">
        <div className="flex flex-col flex-grow text-center">
          <h1 className="text-[50px] px-96 font-sans leading-tight">
            Start building your dream website
          </h1>
          <h3 className="mt-4 mb-8 text-lg">
            Describe your website in a few words, and we’ll take it from there
          </h3>
          <div className="flex justify-center items-center mt-10">
            <input
              type="text"
              value={prompt}
              placeholder="Enter your prompt"
              className="w-1/2 p-3 rounded-lg text-black"
              onChange={(e) => setPrompt(e.target.value)}
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
        </div>

        {!open && (
          <div className="fixed right-[12px] top-[100px] h-[calc(100vh-120px)] w-[300px] bg-[#1E1E1E] text-white border mx-2 mb-8 border-gray-700 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-lg font-medium">
                Your previous projects
              </span>
              <button
                onClick={() => setOpen(!open)}
                className="h-8 w-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {codes.length > 0 ? (
                codes.map((p) => (
                  <div
                    key={p._id}
                    className="text-base flex justify-between items-center my-2"
                  >
                    <span
                      onClick={() => navigate(`/editor/${p._id}`)}
                      className="line-clamp-2 flex-1 overflow-hidden text-ellipsis hover:cursor-pointer hover:bg-gray-800 rounded-lg py-1 px-2"
                    >
                      {p.title}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 flex-shrink-0 ml-2 hover:cursor-pointer hover:bg-gray-800 rounded-full"
                      id={String(p._id)}
                      onClick={handleDelete}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center mt-4">
                  No projects found
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
