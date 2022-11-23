import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assets/:id" element={<Asset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
