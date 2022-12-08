import CollectCard from "../Market/CollectCard";
import { useState, useEffect } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { I_NFT } from "../../utils/interface";
import { useTezosCollectStore } from "../../store";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";

const Created = () => {
  const { activeAddress, findProfileById } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  useEffect(() => {
    const loadItems = async () => {
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/artist/${activeAddress}`
      );
      setNftItems(_nftItems);
    };
    loadItems();
  }, [activeAddress]);
  return (
    <div className="gap-24 grid grid-cols-3">
      {nftItems.map((item, index: any) => (
        <div className="" key={index}>
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
  );
};

export default Created;
