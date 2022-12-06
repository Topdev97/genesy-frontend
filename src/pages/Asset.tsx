import React, { useEffect, useState } from "react";
import CollectCard from "../components/Market/CollectCard";
import test from "../assets/1.png";
import { useTezosCollectStore } from "../store";

const Asset = () => {
  const { buyForSale } = useTezosCollectStore();
  const [domain, setDomain] = useState<any>(undefined);
  const onBuyForSale = async () => {
    console.log("hello");

    await buyForSale(domain?.tokenId || -1, domain?.price || 0);
  };
  return (
    <div className="flex px-24 max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex flex-col">
        <div className="flex gap-10 items-center">
          <CollectCard />
          <div className="text-4xl font-bold">
            Construction with Squares and souls
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="font-bold">ROYALTIES:8%</div>
            <div>ADDRESS: 0000000000000000000000000000000000</div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold"
            >
              IPFS
            </a>
            <div className="font-bold">HISTORY</div>
            <div>CUIDO Bought from HACK fro 700</div>
            <div>HACK bought from ISKRA from 600</div>
            <div>ZACH minted for 200</div>
          </div>
          <div className="flex flex-col gap-6 text-right">
            <div>PRICE: 350</div>
            <button
              className="bg-black text-white px-8 py-2 hover:bg-gray-700"
              onClick={() => onBuyForSale()}
            >
              BUY
            </button>
            <div>FRIENDS</div>
            <div className="flex justify-end">
              <img src={test} alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
