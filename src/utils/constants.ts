import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = {
  type:
    process.env.NODE_ENV === "development"
    ? NetworkType.GHOSTNET:
    NetworkType.MAINNET,
};

const MAINNET_RPC_URL: string = "https://mainnet.api.tez.ie";
const GHOSTNET_RPC_URL: string = "https://ghostnet.tezos.marigold.dev";

const TEZOS_COLLECT_RPC_URL =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_RPC_URL : MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);
export const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZmZjc1OWVjMDk5YUM1YTVEQTkxOGUzQjVDNzg0N0EwZUEyNjYyQ0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Nzg5OTI5MDM2NiwibmFtZSI6IkRldlBvcnRhbCJ9.-MRWyPn63qxGaYfZtU1P8Rzt74Q8t5VqMy0BiWh1vy4"
// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "Genesy",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.LIGHT,
});

const MARKETPLACE_ADDRESSES = {
  ghostnet: "KT1NYiNGxNLN46HAsfBXebFziDWbKKuy2T5c",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const NFT_ADDRESSES = {
  ghostnet: "KT1VLxr4LNMvwHs5TeEc2LzGapKFz5yuy1PW",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

export const VAULT_ADDRESS = "tz1VL5AfvZ3Cz6Bd2c2agcUQe7HKxje7ojNu";

export const MARKETPLACE_CONTRACT_ADDRESS = MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NFT_CONTRACT_ADDRESS = NFT_ADDRESSES[TEZOS_COLLECT_NETWORK.type];