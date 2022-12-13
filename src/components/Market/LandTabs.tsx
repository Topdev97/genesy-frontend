import { Navigate, Route, Routes } from "react-router-dom";
import PrimaryFeed from "./PrimaryFeed";
import SeconddaryFeed from "./SeconddaryFeed";
const ProfileTabs = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="primary" replace />} />
        <Route path="primary" element={<PrimaryFeed />} />
        <Route path="secondary" element={<SeconddaryFeed />} />
      </Routes>
    </div>
  );
};

export default ProfileTabs;
