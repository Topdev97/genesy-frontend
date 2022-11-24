import { Navigate, Route, Routes } from "react-router-dom";
import Created from "./Created";
import Onsale from "./Onsale";
import Owned from "./Owned";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="created" replace />} />
      <Route path="created" element={<Created />} />
      <Route path="owned" element={<Owned />} />
      <Route path="onsale" element={<Onsale />} />
    </Routes>
  );
};

export default ProfileTabs;
