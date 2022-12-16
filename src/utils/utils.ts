import { NFTStorage } from "nft.storage";
import { type } from "os";
import { NFT_STORAGE_KEY } from "./constants";
export const pinToIpfs = async (file: File): Promise<string> => {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return await nftstorage.storeBlob(file);
};

export const replaceIpfsLink = (ipfsLink: string) => {
  return ipfsLink.replace("ipfs://", "https://ipfs.io/ipfs/");
};

export const dateDifFromNow = (_date: Date | string): string => {
  let date: Date = new Date();
  if (typeof _date === "object") date = _date;
  else date = new Date(_date);
  const difSeconds = Math.abs(new Date().getTime() - date.getTime()) / 1000;

  let result = "";
  if (difSeconds < 60) result = "a min";
  else if (difSeconds < 60 * 60)
    result = `${(difSeconds / 60).toFixed(0)} mins`;
  else if (difSeconds < 60 * 60 * 24)
    result = `${(difSeconds / 3600).toFixed(0)} hours`;
  else if (difSeconds < 60 * 60 * 24 * 7)
    result = `${(difSeconds / 87600).toFixed(0)} days`;
  else if (difSeconds < 60 * 60 * 24 * 30)
    result = `${(difSeconds / (60 * 60 * 24 * 7)).toFixed(0)} weeks`;
  else if (difSeconds < 60 * 60 * 24 * 30 * 12)
    result = `${(difSeconds / (60 * 60 * 24 * 30)).toFixed(0)} months`;
  else result = `${(difSeconds / (60 * 60 * 24 * 30 * 12)).toFixed(0)} years`;

  return new Date().getTime() - date.getTime() > 0
    ? `${result} ago`
    : `in ${result}`;
};

export const dateFormat = (_date: Date | string): string => {
  let date: Date = new Date(_date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = date.getHours();
  var minutes = date.getMinutes();
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes} ${AmOrPm}`;
};
