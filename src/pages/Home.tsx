import React, { useEffect, useState } from "react";
import CollectCard from "../components/CollectCard";

const Home = () => {
  const [testCollect, setTestCollect] = useState<any>([3, 2, 21, 23]);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const test = testCollect.reverse();
    setTestCollect(test);
  }, [enabled]);
  return (
    <div className="">
      <div className="px-32">
        <div className="flex">
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={() => {
                setEnabled(!enabled);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-y-10">
        {testCollect.map((value: any, index: any) => (
          <div className="flex justify-center" key={index}>
            {value}
            <CollectCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
