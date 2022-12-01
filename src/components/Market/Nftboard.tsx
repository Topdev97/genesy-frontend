import React, { useState } from "react";
import CollectCard from "./CollectCard";

const Nftboard = () => {
  const [testCollect, setTestCollect] = useState<any>([
    3, 2, 21, 23, 412, 354, 53, 93,
  ]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {testCollect.map((value: any, index: any) => (
          <div key={index}>
            <CollectCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nftboard;
