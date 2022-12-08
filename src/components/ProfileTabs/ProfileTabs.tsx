import { Navigate, Route, Routes } from "react-router-dom";
import Created from "./Created";
import Owned from "./Owned";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="created" replace />} />
      <Route path="created" element={<Created />} />
      <Route path="owned" element={<Owned />} />
    </Routes>
  );
};

export default ProfileTabs;
