import React from "react";
import test from "../assets/1.png";

const CollectCard = () => {
  return (
    <div className="flex py-4 flex-col ">
      <div className="bg-gray-200 p-4">
        <img src={test} alt="test" className="w-80 h-80 rounded-xl" />
      </div>
      <div className="flex gap-4 items-center pt-2">
        <img src={test} alt="avatar" className="w-10 h-10 rounded-full" />
        <div className="dark:text-red-500">Zach Lieberman</div>
      </div>
    </div>
  );
};

export default CollectCard;
