import { useEffect, useState, useRef } from "react";
import CollectCard from "./CollectCard";
import { FaSort } from "react-icons/fa";
import { API_ENDPOINT } from "../../utils/constants";
import { I_NFT } from "../../utils/interface";
import axios from "axios";
import { useTezosCollectStore } from "../../store";

interface propsType {
  setIsControl: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderBy: React.Dispatch<React.SetStateAction<number>>;
  orderBy: number;
}

const SortBoard = (props: propsType) => {
  return (
    <div className="absolute top-8 bg-white  w-32 right-0 menu-shadow ">
      <div
        className={`${
          props.orderBy == 0 ? "bg-gray-600" : ""
        } px-4 py-2 hover:bg-gray-400`}
        onClick={() => {
          props.setOrderBy(0);
          props.setIsControl(false);
        }}
      >
        Chronogical
      </div>
      <div
        className={`${
          props.orderBy == 1 ? "bg-gray-600" : ""
        } px-4 py-2 hover:bg-gray-400`}
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsControl(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const { findProfileById, profile } = useTezosCollectStore();
  const [nftItems, setNftItems] = useState<I_NFT[]>([]);
  const [orderBy, setOrderBy] = useState<number>(profile?.feedOrder);
  const [isControl, setIsControl] = useState<boolean>(false);

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
      <div className="flex justify-end relative mt-2" ref={ref}>
        <button
          className="hover:cursor-pointer"
          onClick={() => setIsControl(!isControl)}
        >
          <FaSort />
        </button>
        {isControl && (
          <SortBoard
            setIsControl={setIsControl}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
        )}
      </div>
      <div className="flex gap-36">
        <div className="flex flex-col w-1/2 gap-10">
          {nftItems
            ?.filter((word, index) => index % 2 == 0)
            ?.map((item, index) => (
              <div className="flex w-full" key={index}>
                <CollectCard
                  nft={item}
                  profile={findProfileById(item.artist)}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col w-1/2 items-end mt-[25%] gap-10">
          {nftItems
            ?.filter((word, index) => index % 2 == 1)
            ?.map((item, index) => (
              <div className="flex w-full" key={index}>
                <CollectCard
                  nft={item}
                  profile={findProfileById(item.artist)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrimaryFeed;
