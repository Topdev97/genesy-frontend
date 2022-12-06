import React, { useEffect, useState } from "react";
import CollectCard from "../components/Market/CollectCard";
import test from "../assets/1.png";
import { useTezosCollectStore } from "../store";
import { IoLink } from "react-icons/io5";
import user from "../assets/user.svg";

const Asset = () => {
  const { buyForSale } = useTezosCollectStore();
  const [domain, setDomain] = useState<any>(undefined);
  const onBuyForSale = async () => {
    console.log("hello");

    // await buyForSale(domain?.tokenId || -1, domain?.price || 0);
    await buyForSale(2, 12);
  };
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex gap-24">
        <img src={test} alt="test" className="w-1/2" />
        <div className="w-1/2 flex flex-col gap-4">
          <div className="text-3xl font-bold">NFT title 1 line</div>
          <div>
            <div>__ CREATED BY</div>
            <div className="flex gap-2 items-center my-4">
              <img src={user} alt="user" className="w-6 h-6" />
              <div className="text-2xl font-bold">Artist name</div>
            </div>
          </div>
          <div>
            <div>Collector's Circle</div>
            <div className="flex gap-4  my-4">
              <img src={user} alt="user" className="w-6 h-6" />
              <img src={user} alt="user" className="w-6 h-6" />
              <img src={user} alt="user" className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div>__ COLLECTED BY</div>
            <div className="flex gap-2 items-center  my-4">
              <img src={user} alt="user" className="w-6 h-6" />
              <div className="text-2xl font-bold">Owner name</div>
            </div>
          </div>
          <div>
            <div>__ PRICE</div>
            <div className="flex gap-2 items-center  my-4">
              <div className="">
                <span className="text-2xl font-bold">770 XTZ</span> USD 765,38
              </div>
            </div>
          </div>
          <button
            className="w-32 bg-black text-white py-2 hover:bg-gray-500"
            onClick={() => onBuyForSale()}
          >
            BUY NOW
          </button>
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold py-8">__ Description</div>
        <div className="py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </div>
        <div className="flex gap-4 py-2">
          <div>ROYALTIES</div>
          <div>8%</div>
        </div>
        <div className="flex gap-4 py-2">
          <div>ADDRESS</div>
          <div>0x1234tyr1HJQYG12378712319282732312312</div>
        </div>
        <div className="flex gap-4 font-bold py-4">
          <div className="flex items-center gap-4">
            <IoLink />
            <div>Etherscan</div>
          </div>
          <div className="flex items-center gap-4">
            <IoLink />
            <div>IPFS</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold py-8">__ History</div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
