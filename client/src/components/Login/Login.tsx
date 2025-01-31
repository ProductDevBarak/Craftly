import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/Firebase_Config";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginResponse = await signInWithPopup(auth, provider);
      const user = loginResponse.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.photoURL,
      };
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure`;
      navigate("/home");
      message.success("Logged in successfully");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-neutral-800 to-neutral-950 flex h-screen text-white">
      <div className="w-1/2 flex justify-center items-center">
        <img
          src={"/images/screen.png"}
          className="max-w-[700px] border-r border-[#646464] pr-[100px] pl-[130px]"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center pr-10">
        <div className="flex items-center mb-5">
          <img src={"/images/Logo.png"} className="h-9 mr-2 ml-52" />
        </div>
        <h2 className="text-3xl font-bold mb-6 font-dmSans ml-32">
          One Step to Your Creation
        </h2>
        <div className="bg-white text-black py-8 px-5 rounded-lg shadow-lg w-full max-w-[290px] ml-[10.6rem]">
          <h3 className="text-lg font-sans text-center mb-4 text-[#000000]">
            Create your Account
          </h3>
          <button
            onClick={handleLogin}
            className="w-full bg-[#353535] text-white flex items-center justify-center py-2 rounded-xl mb-3"
          >
            <span className="mr-2">
              <img src={"/images/microsoft.png"} className="h-5" />
            </span>
            <h1 className="font-sans pr-2 font-light">
              Sign in with Microsoft
            </h1>
          </button>

          <p className="text-center text-sm text-black font-sans font-extralight">
            Or
          </p>
          <input
            type="text"
            placeholder="Email Address or Mobile number"
            className=" border-b-[1px] py-1 border-[#000000] mt-3 font-dmSans font-normal text-center w-full text-[0.75rem]"
          />
          <button className="w-full bg-black text-white py-2 rounded-lg mt-3 font-dmSans text-sm font-light">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
