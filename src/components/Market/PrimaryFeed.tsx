import { useEffect, useState } from "react";
import CollectCard from "./CollectCard";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import axios from "axios";
const PrimaryFeed = () => {
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const [orderBy] = useState(0);
  useEffect(() => {
    const loadItems = async () => {
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/primary/${orderBy}`
      );
      setNftItems(_nftItems);
    };
    loadItems();
  }, [orderBy]);

  return (
    <div className="grid grid-cols-2 gap-20">
      {nftItems.map((item, index) => (
        <div
          className={`flex ${index % 2 ? "justify-start" : "justify-end"}`}
          key={index}
        >
          <LinkWithSearchParams
            to={{
              pathname: `/assets/${item.tokenId}`,
            }}
          >
            <CollectCard nft={item} />
          </LinkWithSearchParams>
        </div>
      ))}
    </div>
  );
};

export default PrimaryFeed;
