import React, { useEffect, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import CollectCard from "./CollectCard";
import Nftboard from "./Nftboard";
const SeconddaryFeed = () => {
  return (
    <div className="">
      <div className="">
        <div className="text-2xl font-bold py-8">__ Recent sales</div>
        <Nftboard />
      </div>

      <div className="">
        <div className="text-2xl font-bold py-8">__ Top prices (7days)</div>
        <Nftboard />
      </div>

      <div className="">
        <div className="text-2xl font-bold py-8">__ Best artists</div>
        <Nftboard />
      </div>
    </div>
  );
};

export default SeconddaryFeed;
