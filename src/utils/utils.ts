import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_KEY } from "./constants";
export const pinToIpfs = async (file: File): Promise<string> => {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return await nftstorage.storeBlob(file);
};