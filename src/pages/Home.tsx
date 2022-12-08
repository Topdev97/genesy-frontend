import React, { useEffect, useState, useMemo } from "react";
import { TbMinusVertical, TbMinus } from "react-icons/tb";
import PrimaryFeed from "../components/Market/PrimaryFeed";
import SeconddaryFeed from "../components/Market/SeconddaryFeed";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import LandTabs from "../components/Market/LandTabs";
import axios from "axios";

const Home = () => {
  const TAB_LIST = [
    {
      path: `/home/primary`,
      text: (
        <button className="w-6 h-6 flex justify-center items-center">
          <TbMinusVertical className="text-3xl" />
        </button>
      ),
    },
    {
      path: `/home/secondary`,
      text: (
        <button className="w-6 h-6  flex justify-center items-center">
          <TbMinus className="text-3xl " />
        </button>
      ),
    },
  ];
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="w-3/5 flex flex-col gap-5">
        <div className="uppercase font-bold text-2xl">sommething rare</div>
        <div>Collect and Create Unique Digital Art on Tezos</div>
      </div>
      <div className=" pb-2 mt-24">
        <div className="flex border-b-2 border-black">
          {TAB_LIST.map((link, index) => (
            <LinkWithSearchParams
              key={index}
              className={({ isActive }: { isActive: boolean }) =>
                `flex flex-col font-medium ${
                  isActive ? "active-dot market-tap-active" : "market-tap"
                }`
              }
              to={{
                pathname: link.path,
              }}
            >
              <div className="text-center m-2">{link.text}</div>
            </LinkWithSearchParams>
          ))}
        </div>
        <LandTabs />
      </div>
    </div>
  );
};

export default Home;
