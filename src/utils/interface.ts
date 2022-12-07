interface I_USER {
  username: string;
  description?: string;
  feedOrder?: 0 | 1;
  avatarLink?: string;
  twitter?: string;
}
interface I_NFT {
  tokenId?: number;
  name: string;
  description: string;
  imageLink: string;
  artist: string;
  artistObj?: I_USER;
  owner: string;
  ownerObj?: I_USER;
  price?: number;
  lastSoldAmount?: number;
  lastSoldAt?: Date;
  mintedAt?: Date;
  curated?: boolean;
}
export type { I_NFT };
