import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Asset from "./pages/Asset";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";
import Mint from "./pages/Mint";
import Faq from "./pages/Faq";
import { useTheme } from "./context";
import { useTezosCollectStore } from "./store";

function App() {
  const { theme } = useTheme();
  const {
    activeAddress,
    initializeContracts,
    fetchProfiles,
    fetchProfile,
    contractReady,
  } = useTezosCollectStore();
  useEffect(() => {
    initializeContracts();
    fetchProfiles();
  }, []);
  useEffect(() => {
    if (activeAddress && contractReady) {
      fetchProfile(activeAddress);
    }
  }, [activeAddress, contractReady]);
  return (
    <div className={`${theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home/*" replace />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/assets/:tokenId" element={<Asset />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile/:address/*" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
