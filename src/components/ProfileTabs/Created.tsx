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
  const checked = JSON.parse(
    localStorage.getItem("createdSale") || '{"isSaled": false}'
  );
  const [isSaled, setIsSaled] = useState<boolean>(false);

  const toggleSale = () => {
    setIsSaled(!isSaled);
    localStorage.setItem("createdSale", JSON.stringify({ isSaled: isSaled }));
  };
  useEffect(() => {
    const loadItems = async () => {
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/artist/${activeAddress}`
      );
      setNftItems(_nftItems);
      if (checked?.isSaled) {
        let nftItems_ = _nftItems?.filter((item) => item?.price! > 0);
        setNftItems(nftItems_);
      }
    };
    loadItems();
  }, [activeAddress, checked?.isSaled]);
  return (
    <div>
      <div className="flex justify-end py-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="onlySale">On sale only</label>
          <input
            type="checkbox"
            name="onlySale"
            id="onlySale"
            checked={checked?.isSaled}
            onChange={() => toggleSale()}
          />
        </div>
      </div>
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
    </div>
  );
};

export default Created;
