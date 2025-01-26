import React, { useState } from "react";
import Home from "./components/Home/Home.tsx";
import Login from "./components/Login/Login.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor/Editor.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";

function App() {
  const [abc, setAbc] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home setAbc={setAbc} />} />
          <Route path="/editor/:id" element={<Editor abc={abc} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
