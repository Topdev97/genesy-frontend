import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import CollectCard from "./CollectCard";

const Nftboard = () => {
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
            <CollectCard nft={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nftboard;
