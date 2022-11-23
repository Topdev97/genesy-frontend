import React, { useEffect } from "react";
import CollectCard from "../components/CollectCard";
const Asset = () => {
  return (
    <div className="flex px-24">
      <div className="flex gap-10 items-center">
        <CollectCard />
        <div className="text-4xl font-bold">
          Construction with Squares and souls
        </div>
      </div>
    </div>
  );
};

export default Asset;
