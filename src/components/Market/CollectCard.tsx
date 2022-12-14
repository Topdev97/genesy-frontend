import { I_NFT, I_PROFILE } from "../../utils/interface";
import { dateDifFromNow } from "../../utils/utils";
type ICollectProps = {
  nft?: I_NFT;
  profile?: I_PROFILE;
};
const CollectCard = ({ nft, profile }: ICollectProps) => {
  return (
    <div className="flex flex-col py-4 cursor-pointer w-full">
      <div className="flex gap-4 items-center pt-2">
        <img src={profile?.avatarLink} alt="avatar" className="w-6 h-6" />
        <div className="dark:text-red-500 font-bold">{profile?.username}</div>
      </div>
      <div className="flex text-sm w-full">
        <div className="w-full">
          <div className="flex justify-between  my-3">
            <div>{nft?.name}</div>
            <div>{dateDifFromNow(nft?.mintedAt || new Date())}</div>
          </div>
          <img src={nft?.imageLink} alt="test" className="primary-nft w-full" />
        </div>
        <div className="nft-price text-end">| {nft?.price} TZ</div>
      </div>
    </div>
  );
};

export default CollectCard;
