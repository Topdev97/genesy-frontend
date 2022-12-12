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
  royalty?: number;
  lastSoldAmount?: number;
  lastSoldAt?: Date;
  mintedAt?: Date;
  curated?: boolean;
}

interface I_PROFILE {
  wallet: string;
  artist: string;
  avatarLink: string;
  description: string;
  feedOrder: number;
  twitter: string;
  username: string;
  verified: boolean;
  volumeWeek: number;
}
interface I_Log {
  timestamp: Date;
  text: string;
}

export type { I_NFT, I_PROFILE, I_Log };
