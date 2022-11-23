import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = {
  type: NetworkType.MAINNET,
};

const MAINNET_RPC_URL: string = "https://mainnet.api.tez.ie";

const TEZOS_COLLECT_RPC_URL = MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);

// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "Genesy",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.LIGHT,
});

