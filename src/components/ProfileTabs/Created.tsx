import CollectCard from "../Market/CollectCard";
import { useState } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Created = () => {
  const [testCollect, setTestCollect] = useState<any>([3, 2, 21]);
  return (
    <div className="flex gap-12">
      {testCollect.map((value: any, index: any) => (
        <div className="" key={index}>
          <LinkWithSearchParams
            to={{
              pathname: "/col/1",
            }}
          >
            <CollectCard />
          </LinkWithSearchParams>
        </div>
      ))}
    </div>
  );
};

export default Created;
