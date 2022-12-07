import artist from "../../assets/artist.svg";
import { I_NFT } from "../../utils/interface";
import { dateDifFromNow } from "../../utils/utils";
const CollectCard = ({ nft }: { nft?: I_NFT }) => {
  return (
    <div className="flex flex-col py-4 cursor-pointer">
      <div className="flex gap-4 items-center pt-2">
        <img src={artist} alt="avatar" className="w-6 h-6" />
        <div className="dark:text-red-500 font-bold">{nft?.name}</div>
      </div>
      <div className="flex text-sm">
        <div>
          <div className="flex justify-between  my-3">
            <div>{nft?.description}</div>
            <div>{dateDifFromNow(nft?.mintedAt || new Date())}</div>
          </div>
          <img src={nft?.imageLink} alt="test" />
        </div>
        <div className="nft-price text-end">| {nft?.price} TZ</div>
      </div>
    </div>
  );
};

export default CollectCard;
