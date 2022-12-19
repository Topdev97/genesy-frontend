import { I_NFT, I_PROFILE } from "../../utils/interface";
import { dateDifFromNow } from "../../utils/utils";
import LinkWithSearchParams from "../LinkWithSearchParams";
type ICollectProps = {
  nft?: I_NFT;
  profile?: I_PROFILE;
};
const CollectCard = ({ nft, profile }: ICollectProps) => {
  console.log("nft", nft);
  return (
    <div className="flex flex-col py-4 cursor-pointer w-full">
      <LinkWithSearchParams
        to={{
          pathname: `/profile/${profile?.wallet}/created`,
        }}
      >
        <div className="flex gap-4 items-center pt-2">
          <img src={profile?.avatarLink} alt="avatar" className="w-6 h-6" />
          <div className="dark:text-red-500 font-bold">{profile?.username}</div>
        </div>
      </LinkWithSearchParams>
      <div className="flex text-sm w-full">
        <div className="w-full">
          <div className="flex justify-between  my-3">
            <div>{nft?.name}</div>
            <div>{dateDifFromNow(nft?.mintedAt || new Date())}</div>
          </div>
          <LinkWithSearchParams
            to={{
              pathname: `/assets/${nft?.tokenId!}`,
            }}
            className="w-full"
          >
            <img
              src={nft?.imageLink}
              alt="test"
              className="primary-nft w-full"
            />
          </LinkWithSearchParams>
        </div>
        <div className="nft-price text-end flex justify-end">
          <div className="border-l h-8 border-black ml-[7px] mb-2" />
          <div>
            {nft?.lastSoldAmount == 0 ? nft?.price : nft?.lastSoldAmount} TZ
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectCard;
