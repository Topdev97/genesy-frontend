import React, { useEffect } from "react";

const Menu = () => {
  const menuItem: string[] = ["Create", "Profile", "Sign out"];
  return (
    <div className="absolute top-12 bg-white  w-32 right-0 menu-shadow">
      {menuItem.map((item) => (
        <div key={item} className="px-4 py-2 hover:bg-gray-200">
          {item}
        </div>
      ))}
    </div>
  );
};

export default Menu;
