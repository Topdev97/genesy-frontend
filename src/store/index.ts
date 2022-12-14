import create from "zustand";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import {
  ContractAbstraction,
  ContractProvider,
  MichelsonMap,
} from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  Tezos,
} from "../utils/constants";
import { I_PROFILE } from "../utils/interface";
interface IProfileStore {
  loading: boolean;
  profile: I_PROFILE[];
}

interface ITezosState {
  activeAddress: string;
  setActiveAddress: { (_activeAddress: string): void };
  initializeContracts: { (): void };
  // interating with Tezos
  contractReady: boolean;
  nftContract: ContractAbstraction<ContractProvider> | null;
  marketPlaceContract: ContractAbstraction<ContractProvider> | null;
  lastTokenId: number;
  updateLastTokenId: { (): void };
  // nft mint function for artis
  nftMint: {
    (royalties: number, metadata: any): void;
  };
  buyForSale: {
    (tokenId: number, price: number): Promise<boolean>;
  };
  cancelForSale: {
    (tokenId: number): Promise<boolean>;
  };
  listForSale: {
    (
      tokenId: number,
      includingOperator: boolean,
      defaultAmount: number
    ): Promise<boolean>;
  };
  profileStore: IProfileStore;
  fetchProfiles: { (): void };
  findProfileById: { (_address: string): I_PROFILE | undefined };
  profile: I_PROFILE;
  fetchProfile: {
    (address: string): Promise<I_PROFILE>;
  };
  bookmarkedNames: string[];
  toggleBookmark: { (_wallet: string, _friend: string): void };
}

export const useTezosCollectStore = create<ITezosState>((set, get) => ({
  //wallet address
  activeAddress: "",
  setActiveAddress: (_activeAddress: string) => {
    set((state: any) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  },

  // Interacting with Tezs
  contractReady: false,
  nftContract: null,
  marketPlaceContract: null,
  lastTokenId: 0,
  initializeContracts: async () => {
    const [_nftContract, _marketPlaceContract] = await Promise.all([
      Tezos.wallet.at(NFT_CONTRACT_ADDRESS),
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS),
    ]);

    const _nftContractStorage: any = await _nftContract.storage();

    set((state: any) => ({
      ...state,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
      contractReady: true,
      nftContract: _nftContract,
      marketPlaceContract: _marketPlaceContract,
    }));
  },

  updateLastTokenId: async () => {
    const _nftContractStorage: any = await get().nftContract?.storage();

    set((state: any) => ({
      ...state,
      lastTokenId: _nftContractStorage.last_token_id.toNumber(),
    }));
  },

  // mint function for artist
  nftMint: async (royalties: number, metadata: any) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;
    const _nftContract = get().nftContract;
    const _activeAddress = get().activeAddress;
    const op = await _nftContract?.methods
      .mint([
        {
          royalty: royalties,
          to_: _activeAddress,
          metadata: MichelsonMap.fromLiteral({ "": char2Bytes(metadata?.url) }),
        },
      ])
      .send();

    await op?.confirmation(2);
  },

  buyForSale: async (tokenId: number, price: number) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .buy(tokenId)
      .send({ amount: price });

    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUBMIT",
    // });
    // await _txOp.confirmation(1);

    // const _domain = get().findDomainByTokenId(tokenId);
    // createDomainActivity({
    //   ...initializeDomainActivity(),
    //   name: _domain?.name || "",
    //   type: "BUY_FROM_SALE",
    //   txHash: _txOp.opHash,
    //   amount: price,
    //   from: _domain?.owner || "",
    //   to: get().activeAddress,
    // });

    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUCCESS",
    // });

    return true;
  },

  cancelForSale: async (
    tokenId: number
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .cancel_for_sale(tokenId)
      .send();
    await _txOp.confirmation(2);

    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUBMIT",
    // });
    // await _txOp.confirmation(1);

    // const _domain = get().findDomainByTokenId(tokenId);
    // createDomainActivity({
    //   ...initializeDomainActivity(),
    //   name: _domain?.name || "",
    //   type: "DELIST_FOR_SALE",
    //   txHash: _txOp.opHash,
    //   amount: _domain?.price || 0,
    //   from: get().activeAddress,
    //   to: _domain?.owner || "",
    // });
    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUCCESS",
    // });

    return true;
  },

  listForSale: async (
    tokenId: number,
    includingOperator: boolean,
    defaultAmount: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nftContract = get().nftContract;
    // let _txOp: any;
    await _marketPlaceContract?.methods
      .list_for_sale(defaultAmount * 10 ** 6, tokenId)
      .send();

    if (!includingOperator) {
      await Tezos.wallet
        .batch()
        .withContractCall(
          // @ts-ignore
          _nftContract.methods.update_operators([
            {
              add_operator: {
                owner: get().activeAddress,
                operator: MARKETPLACE_CONTRACT_ADDRESS,
                token_id: tokenId,
              },
            },
          ])
        )
        .withContractCall(
          // @ts-ignore
          _marketPlaceContract?.methods.list_for_sale(
            defaultAmount * 10 ** 6,
            tokenId
          )
        )
        .send();
    } else
      await _marketPlaceContract?.methods
        .list_for_sale(defaultAmount * 10 ** 6, tokenId)
        .send();

    // get().setListForSaleModalVisible(false);
    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUBMIT",
    // });
    // await _txOp.confirmation(1);

    // const _domain = get().findDomainByTokenId(tokenId);
    // createDomainActivity({
    //   ...initializeDomainActivity(),
    //   name: _domain?.name || "",
    //   type: "LIST_FOR_SALE",
    //   txHash: _txOp.opHash,
    //   amount: defaultAmount,
    //   from: get().activeAddress,
    //   to: get().activeAddress,
    // });

    // get().setCurrentTransaction({
    //   txHash: _txOp.opHash,
    //   txStatus: "TX_SUCCESS",
    // });

    return true;
  },

  profileStore: {
    loading: true,
    profile: JSON.parse(localStorage.getItem("profiles") || "[]") || [],
  },

  fetchProfiles: async () => {
    set((state: any) => ({
      ...state,
      profileStore: {
        loading: true,
        profile: get().profileStore.profile,
      },
    }));
    const profiles = await axios.get(`${API_ENDPOINT}/profiles`);

    localStorage.setItem("profiles", JSON.stringify(profiles.data));
    set((state: any) => ({
      ...state,
      profileStore: { loading: false, profile: profiles.data },
    }));
  },
  findProfileById: (_address: string) => {
    return get().profileStore.profile.find((item) => item.wallet === _address);
  },

  profile: {
    wallet: "",
    artist: "",
    avatarLink: "",
    description: "",
    feedOrder: 0,
    twitter: "",
    username: "",
    verified: false,
    volumeWeek: 0,
  },

  fetchProfile: async (_address: string) => {
    let profile: I_PROFILE;
    let res = await axios.get(`${API_ENDPOINT}/profiles/${_address}`);

    profile = {
      ...res.data,
    };

    if (profile.wallet === get().activeAddress) {
      set((state: any) => ({
        ...state,
        profile,
      }));
    }

    return profile;
  },
  bookmarkedNames: JSON.parse(localStorage.getItem("bookmarkedNames") || "[]"),
  toggleBookmark: async (_wallet: string, _friend: string) => {
    const res = await axios.put(
      `${API_ENDPOINT}/profiles/toggleFriend/${_wallet}/${_friend}`
    );
  },
}));
