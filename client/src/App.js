import React, { useState } from "react";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor/Editor.tsx";
import ProtectedRoutes from "./context/ProtectedRoutes.tsx";
import Landing from "./components/Landing/Landing.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
