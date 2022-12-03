import React, { useEffect, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import CollectCard from "./CollectCard";
import LinkWithSearchParams from "../LinkWithSearchParams";
const PrimaryFeed = () => {
  const [testCollect, setTestCollect] = useState<any>([3, 2, 21, 23, 412]);

  return (
    <div className="grid grid-cols-2 gap-20">
      {testCollect.map((value: any, index: any) => (
        <div
          className={`flex ${index % 2 == 0 ? "justify-start" : "justify-end"}`}
          key={index}
        >
          <LinkWithSearchParams
            to={{
              pathname: "/assets/1",
            }}
          >
            <CollectCard />
          </LinkWithSearchParams>
        </div>
      ))}
    </div>
  );
};

export default PrimaryFeed;
