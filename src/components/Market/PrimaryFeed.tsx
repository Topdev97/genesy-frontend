import { useEffect, useState } from "react";
import CollectCard from "./CollectCard";
import { FaSort } from "react-icons/fa";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import axios from "axios";
import { useTezosCollectStore } from "../../store";
interface propsType {
  setIsControl: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderBy: React.Dispatch<React.SetStateAction<number>>;
}
const SortBoard = (props: propsType) => {
  return (
    <div className="absolute top-8 bg-white  w-32 right-0 menu-shadow">
      <div
        className="px-4 py-2 hover:bg-gray-200"
        onClick={() => {
          props.setOrderBy(0);
          props.setIsControl(false);
        }}
      >
        Chronogical
      </div>
      <div
        className="px-4 py-2 hover:bg-gray-200"
        onClick={() => {
          props.setOrderBy(1);
          props.setIsControl(false);
        }}
      >
        Curated
      </div>
    </div>
  );
};
const PrimaryFeed = () => {
  const { findProfileById } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const [orderBy, setOrderBy] = useState<number>(0);
  const [isControl, setIsControl] = useState<boolean>(false);

  useEffect(() => {
    const loadItems = async () => {
      const { data: _nftItems }: { data: I_NFT[] } = await axios.get(
        `${API_ENDPOINT}/nfts/primary/${orderBy}`
      );
      console.log("findProfileById", findProfileById(_nftItems[0].artist));
      setNftItems(_nftItems);
    };
    loadItems();
  }, [orderBy]);

  return (
    <div>
      <div className="flex justify-end relative mt-2">
        <FaSort
          className="hover:cursor-pointer"
          onClick={() => setIsControl(!isControl)}
        />
        {isControl && (
          <SortBoard setIsControl={setIsControl} setOrderBy={setOrderBy} />
        )}
      </div>
      <div className="flex gap-36">
        <div className="flex flex-col gap-10">
          {nftItems
            ?.slice(0, (nftItems?.length + 1) / 2)
            ?.map((item, index) => (
              <div className="flex" key={index}>
                <LinkWithSearchParams
                  to={{
                    pathname: `/assets/${item.tokenId}`,
                  }}
                >
                  <CollectCard
                    nft={item}
                    profile={findProfileById(item.artist)}
                  />
                </LinkWithSearchParams>
              </div>
            ))}
        </div>
        <div className="flex flex-col items-end justify-center gap-10">
          {nftItems?.slice((nftItems?.length + 1) / 2)?.map((item, index) => (
            <div className="flex" key={index}>
              <LinkWithSearchParams
                to={{
                  pathname: `/assets/${item.tokenId}`,
                }}
              >
                <CollectCard
                  nft={item}
                  profile={findProfileById(item.artist)}
                />
              </LinkWithSearchParams>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryFeed;
