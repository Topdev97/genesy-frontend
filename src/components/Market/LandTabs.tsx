import { Navigate, Route, Routes } from "react-router-dom";
import PrimaryFeed from "./PrimaryFeed";
import SeconddaryFeed from "./SeconddaryFeed";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="primary" replace />} />
      <Route path="primary" element={<PrimaryFeed />} />
      <Route path="secondary" element={<SeconddaryFeed />} />
    </Routes>
  );
};

export default ProfileTabs;
