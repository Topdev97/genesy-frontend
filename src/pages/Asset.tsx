import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTezosCollectStore } from "../store";
import { IoLink } from "react-icons/io5";
import user from "../assets/user.svg";
import { dateFormat } from "../utils/utils";
import { useParams } from "react-router-dom";
import { I_NFT, I_Log, I_PROFILE } from "../utils/interface";
import { API_ENDPOINT, NFT_CONTRACT_ADDRESS } from "../utils/constants";
import axios from "axios";
import { getTezosPrice } from "../utils/price";
import spinner from "../assets/spinner.svg";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
const PeersBoard = ({ peers }: any) => {
  return (
    <div className="absolute top-20 bg-white  w-60 left-0 menu-shadow py-6 px-10 ">
      <div className="overflow-y-auto max-h-52">
        {peers?.map((item: any, index: any) => (
          <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/profile/${item?.wallet}`,
              }}
              className="flex items-center gap-4 my-2"
            >
              <img src={item?.avatarLink} alt="avatar" className="w-8 h-8" />
              <div className="text-ellipsis">{item?.username}</div>
            </LinkWithSearchParams>
          </div>
        ))}
      </div>
    </div>
  );
};

const Asset = () => {
  const { tokenId } = useParams();
  const {
    buyForSale,
    cancelForSale,
    listForSale,
    activeAddress,
    fetchProfile,
  } = useTezosCollectStore();
  const [profile, setProfile] = useState<I_PROFILE | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<I_Log[]>([]);
  const [isPeers, setIsPeers] = useState<boolean>(false);
  const [peers, setPeers] = useState<any>(null);
  const [marketState, setMarketState] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>("");
  const [nftItem, setNftItem] = useState<I_NFT>({
    artist: "",
    description: "",
    imageLink: "",
    name: "",
    owner: "",
  });
  const onBuyForSale = async () => {
    let log: I_Log = {
      timestamp: new Date(),
      text: `${profile?.username} bought ${nftItem.ownerObj?.username} for ${salePrice}XTZ`,
    };
    try {
      setMarketState(true);
      await buyForSale(parseFloat(tokenId!), nftItem?.price!);
      await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
        owner: activeAddress,
        price: 0,
        lastSoldAt: new Date(),
        lastSoldAmount: nftItem?.price!,
      });
      await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
      setMarketState(false);
    } catch (error) {
      console.log(error);
      setMarketState(false);
    }
  };

  const onCancelForSale = async () => {
    let log: I_Log = {
      timestamp: new Date(),
      text: `${nftItem.ownerObj?.username} canceled ${nftItem.name}`,
    };
    try {
      setMarketState(true);
      await cancelForSale(parseFloat(tokenId!));
      await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
        price: 0,
      });
      await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
      setMarketState(false);
    } catch (error) {
      setMarketState(false);
      console.log(error);
    }
  };

  const onListForSale = async () => {
    let log: I_Log = {
      timestamp: new Date(),
      text: `${nftItem.ownerObj?.username} listed ${nftItem.name} for ${salePrice}XTZ`,
    };
    let includingOperator = false;
    if (parseFloat(salePrice) > 0) {
      try {
        setMarketState(true);
        await listForSale(
          parseFloat(tokenId!),
          includingOperator,
          parseFloat(salePrice)
        );
        await axios.put(`${API_ENDPOINT}/nfts/${tokenId}`, {
          price: salePrice,
        });
        await axios.post(`${API_ENDPOINT}/nfts/log/${tokenId}`, log);
        setMarketState(false);
      } catch (error) {
        setMarketState(false);
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };
  useState(() => {
    const fetchUser = async () => {
      let res = await fetchProfile(activeAddress);
      setProfile(res);
    };
    fetchUser();
  });

  useEffect(() => {
    const loadNftItem = async () => {
      setLoading(true);
      const { data: _nftItems }: { data: I_NFT } = await axios.get(
        `${API_ENDPOINT}/nfts/${tokenId}`
      );
      console.log("_nftItems", _nftItems);
      let peer = await axios.get(
        `${API_ENDPOINT}/nfts/peers/${_nftItems?.artist}/${activeAddress}`
      );
      setPeers(peer.data);
      let res = await axios.get(`${API_ENDPOINT}/nfts/log/${tokenId}`);
      setLogs(res.data?.reverse());
      let _price = await getTezosPrice();
      // setPrice((_nftItems.price || 0) * _price);
      setNftItem(_nftItems);
      setLoading(false);
    };
    loadNftItem();
  }, [tokenId, marketState]);
  return loading ? (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex justify-between gap-24">
        <div className="w-1/2">
          <Skeleton height={460} />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <Skeleton height={35} />
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-4">
            <Skeleton height={35} width={150} />
            <Skeleton height={35} />
          </div>
          <div className="my-8">
            <Skeleton height={50} width={200} />
          </div>
        </div>
      </div>
      <div>
        <Skeleton height={40} width={200} />
        <div className="pt-4">
          <Skeleton count={3} height={20} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={350} />
        </div>
        <div className="pt-4">
          <Skeleton height={30} width={250} />
        </div>
      </div>
      <div className="pt-8">
        <Skeleton height={40} width={200} />
        <div className="pt-4">
          <Skeleton count={3} height={20} width={350} />
        </div>
      </div>
    </div>
  ) : (
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
                <LinkWithSearchParams
                  to={{
                    pathname: `/profile/${nftItem?.artistObj?.wallet}`,
                  }}
                >
                  {nftItem.artistObj?.username}
                </LinkWithSearchParams>
              </div>
            </div>
          </div>
          {peers?.length! > 0 && (
            <div className="relative">
              <div>Collector's Circle</div>
              <div className="flex gap-2  my-4 items-center  hover:cursor-pointer">
                {peers?.slice(0, 3)?.map((item: any, index: any) => (
                  <div key={index}>
                    <LinkWithSearchParams
                      to={{
                        pathname: `/profile/${item?.wallet}`,
                      }}
                    >
                      <img
                        src={item?.avatarLink}
                        alt="avartar"
                        className="w-8 h-8"
                      />
                    </LinkWithSearchParams>
                  </div>
                ))}
                {peers?.length! > 3 && (
                  <div
                    className="font-bold text-2xl "
                    onClick={() => setIsPeers(!isPeers)}
                  >
                    + {peers?.length! - 3} others
                  </div>
                )}
              </div>
              {isPeers && <PeersBoard peers={peers} />}
            </div>
          )}
          <div>
            <div>__ COLLECTED BY</div>
            <div className="flex gap-2 items-center  my-4">
              <img
                src={nftItem.ownerObj?.avatarLink}
                alt="user"
                className="w-6 h-6"
              />
              <div className="text-2xl font-bold">
                <LinkWithSearchParams
                  to={{
                    pathname: `/profile/${nftItem?.ownerObj?.wallet}`,
                  }}
                >
                  {nftItem.ownerObj?.username}
                </LinkWithSearchParams>
              </div>
            </div>
          </div>
          {activeAddress == nftItem.owner ? (
            nftItem.price == 0 || nftItem.price == null ? (
              <div>
                <div>
                  <div>
                    <input
                      type="text"
                      name="price"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      className="outline-none border-b border-black text-center my-4"
                      placeholder="Enter Price(XTZ)"
                    />
                    {/* <div>__ PRICE</div>
                    <div className="flex gap-2 items-center  my-4">
                      <div className="">
                        <span className="text-2xl font-bold">
                          {nftItem.price} XTZ
                        </span>
                        USD {String(price).slice(0, 5)}
                      </div>
                    </div> */}
                  </div>
                  <button
                    className="w-48 bg-black text-white py-2 hover:bg-gray-500"
                    onClick={() => onListForSale()}
                    disabled={marketState}
                  >
                    {marketState ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={spinner}
                          alt="spinner"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                        />
                        LIST FOR SALE...
                      </div>
                    ) : (
                      <div>LIST FOR SALE</div>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div>
                    <div>__ PRICE</div>
                    <div className="flex gap-2 items-center  my-4">
                      <div className="">
                        <span className="text-2xl font-bold">
                          {nftItem.price} XTZ
                        </span>
                        {/* USD {String(price).slice(0, 5)} */}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-48 bg-black text-white py-2 hover:bg-gray-500"
                    onClick={() => onCancelForSale()}
                    disabled={marketState}
                  >
                    {marketState ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={spinner}
                          alt="spinner"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                        />
                        CANCEL SALE...
                      </div>
                    ) : (
                      <div>CANCEL SALE</div>
                    )}
                  </button>
                </div>
              </div>
            )
          ) : nftItem.price == 0 ? (
            <></>
          ) : (
            <div>
              <div>
                <div>__ PRICE</div>
                <div className="flex gap-2 items-center  my-4">
                  <div className="">
                    <span className="text-2xl font-bold">
                      {nftItem.price} XTZ
                    </span>
                    {/* USD {String(price).slice(0, 5)} */}
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
          <div>{nftItem?.royalty}%</div>
        </div>
        <div className="flex gap-4 py-2">
          <div>ADDRESS</div>
          <div>{NFT_CONTRACT_ADDRESS}</div>
        </div>
        <div className="flex gap-4 font-bold py-4">
          <div className="flex items-center gap-4">
            <IoLink />
            <a
              href={`https://ghostnet.tzkt.io/${NFT_CONTRACT_ADDRESS}/operations/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              TzKT
            </a>
          </div>
          <div className="flex items-center gap-4">
            <IoLink />
            <a
              href={nftItem.imageLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              IPFS
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold py-8">__ History</div>
        <div className="flex flex-col gap-4">
          {logs?.map((item, index) => (
            <div key={index} className="flex gap-8">
              <div>{dateFormat(item?.timestamp)}</div>
              <div>{item?.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Asset;
