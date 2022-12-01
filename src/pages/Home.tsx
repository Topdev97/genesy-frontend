import React, { useEffect, useState } from "react";
import { TbMinusVertical, TbMinus } from "react-icons/tb";
import { FaSort } from "react-icons/fa";
import PrimaryFeed from "../components/Market/PrimaryFeed";
import SeconddaryFeed from "../components/Market/SeconddaryFeed";
const SortBoard = () => {
  return (
    <div className="absolute top-8 bg-white  w-32 right-0 menu-shadow">
      <div className="px-4 py-2 hover:bg-gray-200">Chronogical</div>
      <div className="px-4 py-2 hover:bg-gray-200">Curated</div>
    </div>
  );
};
const Home = () => {
  const [isControl, setIsControl] = useState<boolean>(false);
  return (
    <div className="max-w-[1024px] mx-auto py-24">
      <div className="w-3/5 flex flex-col gap-5">
        <div className="uppercase font-bold text-2xl">sommething rare</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
      <div className=" pb-2 mt-24">
        <div className="flex gap-8">
          <button className="w-6 h-6 bg-black flex justify-center items-center">
            <TbMinus className="text-white text-3xl " />
          </button>
          <button className="w-6 h-6 border-2 border-black flex justify-center items-center">
            <TbMinusVertical className="text-3xl" />
          </button>
        </div>
        <div className="border-b-2 border-black my-2"></div>
        <div className="flex justify-end relative">
          <FaSort onClick={() => setIsControl(!isControl)} />
          {isControl && <SortBoard />}
        </div>
        <SeconddaryFeed />
        {/* <PrimaryFeed /> */}
      </div>
    </div>
  );
};

export default Home;
