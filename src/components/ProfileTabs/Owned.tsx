import CollectCard from "../Market/CollectCard";
import { useState, useEffect } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { I_NFT } from "../../utils/interface";
import { useTezosCollectStore } from "../../store";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
const Owned = () => {
  const { activeAddress, findProfileById } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  useEffect(() => {
    const loadItems = async () => {
      if (activeAddress.length === 0) return;
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/user/${activeAddress}`
      );
      setNftItems(_nftItems);
    };
    loadItems();
  }, [activeAddress]);
  return (
    <div className="gap-12 grid grid-cols-2">
      {nftItems.map((item, index: any) => (
        <div className="" key={index}>
          <LinkWithSearchParams
            to={{
              pathname: "/col/1",
            }}
          >
            <CollectCard nft={item} profile={findProfileById(item.artist)} />
          </LinkWithSearchParams>
        </div>
      ))}
    </div>
  );
};

export default Owned;
