import CollectCard from "../Market/CollectCard";
import { useState } from "react";
const Onsale = () => {
  const [testCollect, setTestCollect] = useState<any>([3, 2, 21]);
  return (
    <div className="flex gap-12">
      {testCollect.map((value: any, index: any) => (
        <div className="" key={index}>
          <CollectCard />
        </div>
      ))}
    </div>
  );
};

export default Onsale;
