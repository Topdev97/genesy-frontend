import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import CollectCard from "./CollectCard";
import { useTezosCollectStore } from "../../store";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Nftboard = () => {
  const { findProfileById } = useTezosCollectStore();
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
    <div>
      <div className="grid grid-cols-4 gap-8">
        {nftItems.map((item, index) => (
          <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/assets/${item.tokenId}`,
              }}
            >
              <CollectCard nft={item} profile={findProfileById(item.artist)} />
            </LinkWithSearchParams>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nftboard;
