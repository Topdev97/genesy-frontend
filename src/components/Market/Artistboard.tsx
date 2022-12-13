import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import ArtistCard from "./ArtistCard";
import { useTezosCollectStore } from "../../store";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Artistboard = ({ items }: any) => {
  const { findProfileById } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const [orderBy] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {items?.slice(0, 8)?.map((item: any, index: number) => (
          <div key={index}>
            <ArtistCard profile={item} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artistboard;
