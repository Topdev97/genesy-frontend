interface I_USER {
  username: string;
  description?: string;
  feedOrder?: 0 | 1;
  avatarLink?: string;
  twitter?: string;
  wallet?: string;
  artist?: boolean;
  friends?: string[];
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
  friends?: string[];
}
interface I_CONTENT {
  text: string;
  link: string;
}
interface I_Log {
  timestamp: Date;
  content: I_CONTENT[];
}

export type { I_NFT, I_PROFILE, I_Log };
