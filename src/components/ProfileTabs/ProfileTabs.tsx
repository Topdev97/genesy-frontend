import { Navigate, Route, Routes } from "react-router-dom";
import Created from "./Created";
import Owned from "./Owned";
import Dashboard from "./Dashboard";
import React, { useState } from "react";
const ProfileTabs = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="owned" replace />} />
        <Route path="created" element={<Created />} />
        <Route path="owned" element={<Owned />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default ProfileTabs;
