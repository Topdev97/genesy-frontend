import create from "zustand";
import { RequestSignPayloadInput, SigningType } from "@airgap/beacon-sdk";
import {
  ContractAbstraction,
  ContractProvider,
  OpKind,
  MichelsonMap,
} from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  Tezos,
  TEZOS_COLLECT_WALLET,
} from "../utils/constants";
interface ITezosState {
  activeAddress: string;
  setActiveAddress: { (_activeAddress: string): void };
  initializeContracts: { (): void };
  // interating with Tezos
  contractReady: boolean;
  nftContract: ContractAbstraction<ContractProvider> | null;
  marketPlaceContract: ContractAbstraction<ContractProvider> | null;
  // nft mint function for artis
  nftMint: {
    (
      amount: string, 
      metadata:any,
    ): void;
  };
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
  initializeContracts:async () => {
    const [ _nftContract, _marketPlaceContract ] = await Promise.all([
      Tezos.wallet.at(NFT_CONTRACT_ADDRESS),
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS)
    ])
    set((state:any) => ({
      ...state,
      contractReady: true,
      nftContract: _nftContract,
      marketPlaceContract: _marketPlaceContract,
    }))
  },

  // mint function for artist
  nftMint:async (amount: string, metadata:any) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;
    const _nftContract = get().nftContract;
    const _activeAddress  = get().activeAddress;
    const op = await _nftContract?.methods.mint( [{to_: _activeAddress, metadata:MichelsonMap.fromLiteral({'': char2Bytes(metadata?.url)})}]).send();
  }
}));
