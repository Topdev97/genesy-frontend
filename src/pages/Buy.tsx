import { useEffect, useState } from "react";
// import CollectCard from "../components/Market/CollectCard";
// import test from "../assets/1.png";
import { useTezosCollectStore } from "../store";
import { IoLink } from "react-icons/io5";
import user from "../assets/user.svg";
import { useParams } from "react-router-dom";
import { I_NFT } from "../utils/interface";
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { getTezosPrice } from "../utils/price";
const Asset = () => {
  const { tokenId } = useParams();
  const [price, setPrice] = useState<any>(null);
  const { buyForSale } = useTezosCollectStore();
  const [nftItem, setNftItem] = useState<I_NFT>({
    artist: "",
    description: "",
    imageLink: "",
    name: "",
    owner: "",
  });
  const onBuyForSale = async () => {
    // await buyForSale(domain?.tokenId || -1, domain?.price || 0);
    await buyForSale(2, 12);
  };

  useEffect(() => {
    const loadNftItem = async () => {
      const { data: _nftItems }: { data: I_NFT } = await axios.get(
        `${API_ENDPOINT}/nfts/${tokenId}`
      );
      let _price = await getTezosPrice();
      console.log("_price", _price);
      setPrice((_nftItems.price || 0) * _price);
      setNftItem(_nftItems);
    };
    loadNftItem();
  }, [tokenId]);
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex gap-24">
        <img src={nftItem.imageLink} alt="test" className="w-1/2" />
        <div className="w-1/2 flex flex-col gap-4 justify-between">
          <div className="text-3xl font-bold">{nftItem.name}</div>
          <div>
            <div>__ CREATED BY</div>
            <div className="flex gap-2 items-center my-4">
              <img
                src={nftItem.artistObj?.avatarLink}
                alt="user"
                className="w-6 h-6"
              />
              <div className="text-2xl font-bold">
                {nftItem.artistObj?.username}
              </div>
            </div>
          </div>
          <div>
            <div>Collector's Circle</div>
            <div className="flex gap-4  my-4">
              <img src={user} alt="user" className="w-6 h-6" />
              <img src={user} alt="user" className="w-6 h-6" />
              <img src={user} alt="user" className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div>__ COLLECTED BY</div>
            <div className="flex gap-2 items-center  my-4">
              <img
                src={nftItem.ownerObj?.avatarLink}
                alt="user"
                className="w-6 h-6"
              />
              <div className="text-2xl font-bold">
                {nftItem.ownerObj?.username}
              </div>
            </div>
          </div>
          {nftItem.price && (
            <div>
              <div>
                <div>__ PRICE</div>
                <div className="flex gap-2 items-center  my-4">
                  <div className="">
                    <span className="text-2xl font-bold">
                      {nftItem.price} XTZ
                    </span>
                    USD {String(price).slice(0, 5)}
                  </div>
                </div>
              </div>
              <button
                className="w-32 bg-black text-white py-2 hover:bg-gray-500"
                onClick={() => onBuyForSale()}
              >
                BUY NOW
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold py-8">__ Description</div>
        <div className="py-4">{nftItem.description}</div>
        <div className="flex gap-4 py-2">
          <div>ROYALTIES</div>
          <div>8%</div>
        </div>
        <div className="flex gap-4 py-2">
          <div>ADDRESS</div>
          <div>0x1234tyr1HJQYG12378712319282732312312</div>
        </div>
        <div className="flex gap-4 font-bold py-4">
          <div className="flex items-center gap-4">
            <IoLink />
            <div>Etherscan</div>
          </div>
          <div className="flex items-center gap-4">
            <IoLink />
            <div>IPFS</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold py-8">__ History</div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>OCTOBER 21, 2022 7:47 PM</div>
            <div>
              <span className="font-bold">HACK </span>
              bought from
              <span className="font-bold"> ISKRA </span>
              for
              <span className="font-bold"> 700 XYZ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
