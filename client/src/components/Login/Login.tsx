import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/Firebase_Config";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Firebase Authentication
      const loginResponse = await signInWithPopup(auth, provider);
      const user = loginResponse.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.photoURL,
      };

      // Backend API Call
      const response = await fetch("http://localhost:8000/auth/login", {
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

      // Optionally, set the token as a cookie (for client-side use, if not using HttpOnly)
      document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure`;

      // Navigate to the protected route
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Microsoft Login Integration</h1>
      <button onClick={handleLogin}>Login With Microsoft</button>
    </div>
  );
};

export default Login;
