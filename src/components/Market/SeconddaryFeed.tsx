import { useEffect, useState } from "react";
import Nftboard from "./Nftboard";
import Artistboard from "./Artistboard";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
const SeconddaryFeed = () => {
  const [nftItems, setNftItems] = useState<any>(null);
  useEffect(() => {
    const loadItems = async () => {
      const res = await axios.get(`${API_ENDPOINT}/nfts/market`);
      console.log("res.data", res.data);
      setNftItems(res.data);
    };
    loadItems();
  }, []);
  return (
    <div className="">
      <div className="">
        <div className="text-2xl font-bold py-8">__ Recent sales</div>
        <Nftboard items={nftItems?.recentSales!} />
      </div>

      <div className="">
        <div className="text-2xl font-bold py-8">__ Top prices (7days)</div>
        <Nftboard items={nftItems?.topPrice!} />
      </div>

      <div className="">
        <div className="text-2xl font-bold py-8">__ Best artists</div>
        <Artistboard items={nftItems?.bestArtists!} />
      </div>
    </div>
  );
};

export default SeconddaryFeed;
