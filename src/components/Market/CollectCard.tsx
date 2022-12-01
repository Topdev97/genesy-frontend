import React from "react";
import artist from "../../assets/artist.svg";
import test from "../../assets/1.png";
const CollectCard = () => {
  return (
    <div className="flex py-4 flex-col ">
      <div className="flex gap-4 items-center pt-2">
        <img src={artist} alt="avatar" className="w-6 h-6" />
        <div className="dark:text-red-500 font-bold">Zach Lieberman</div>
      </div>
      <div className="flex text-sm">
        <div>
          <div className="flex justify-between  my-3">
            <div>Floating Colors</div>
            <div>1h56 ago</div>
          </div>
          <img src={test} alt="test" />
        </div>
        <div className="nft-price text-end">| 150 TZ</div>
      </div>
    </div>
  );
};

export default CollectCard;
