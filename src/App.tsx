import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { useTheme } from "./context";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assets/:id" element={<Asset />} />
          <Route path="/profile/:address/*" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
