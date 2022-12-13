import CollectCard from "../Market/CollectCard";
import { useState, useEffect } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { I_NFT } from "../../utils/interface";
import { useTezosCollectStore } from "../../store";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
import { useParams } from "react-router-dom";

const Owned = () => {
  const { address } = useParams();
  const { findProfileById } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const checked = JSON.parse(
    localStorage.getItem("ownedSale") || '{"isSaled": false}'
  );
  const [isSaled, setIsSaled] = useState<boolean>(false);

  const toggleSale = () => {
    localStorage.setItem("ownedSale", JSON.stringify({ isSaled: !isSaled }));
    setIsSaled(!isSaled);
  };
  useEffect(() => {
    const loadItems = async () => {
      if (address?.length === 0) return;
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/user/${address}`
      );
      setNftItems(_nftItems);
      if (checked?.isSaled) {
        let nftItems_ = _nftItems?.filter((item) => item?.price! > 0);
        setNftItems(nftItems_);
      }
    };
    loadItems();
  }, [address, checked?.isSaled]);
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

export default Owned;
