import React, { useEffect, useState } from "react";
import CollectCard from "../components/CollectCard";

import { TbMinusVertical, TbMinus } from "react-icons/tb";
const Home = () => {
  const [testCollect, setTestCollect] = useState<any>([3, 2, 21, 23, 412]);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const test = testCollect.reverse();
    setTestCollect(test);
  }, [enabled]);
  return (
    <div className="max-w-[1280px] mx-auto py-24">
      <div className="w-3/5 flex flex-col gap-5">
        <div className="uppercase font-bold text-2xl">sommething rare</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
      <div className="border-b-2 border-black pb-2 mt-24">
        <div className="flex gap-8">
          <button className="w-6 h-6 bg-black flex justify-center items-center">
            <TbMinus className="text-white text-3xl " />
          </button>
          <button className="w-6 h-6 border-2 border-black flex justify-center items-center">
            <TbMinusVertical className="text-3xl" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {testCollect.map((value: any, index: any) => (
          <div className="flex justify-center" key={index}>
            <CollectCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
