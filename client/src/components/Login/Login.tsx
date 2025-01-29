import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/Firebase_Config";
import screenImage from "../Login/screen.png";
import logo from "../Login/logo.png";

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
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    //   <div className="p-8 bg-gray-800 rounded-lg shadow-lg text-center">
    //     <h1 className="text-2xl font-bold mb-6">Microsoft Login Integration</h1>
    //     <button
    //       onClick={handleLogin}
    //       className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition"
    //     >
    //       Login With Microsoft
    //     </button>
    //   </div>
    // </div>
  <div className="bg-[#000000] flex">
    <div className="pl-[70px] py-[100px] size-[50%]">
      <img src={screenImage} className="pr-[20%] pl-[70px] border-r border-[#646464]" />
    </div>
    <div className="py-[100px] pl-[20px] flex text-center">
      <img src={logo} className="max-h-[20px]" />
      <h1 className="text-[#FFFFFF]">Craftly</h1>
    </div>
    <div>
      
    </div>
  </div>
  );
};

export default Login;
