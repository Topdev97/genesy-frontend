import React, { useEffect } from "react";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "../utils/constants";

import { useTezosCollectStore } from "../store";

const ConnectWallet = () => {
  const { activeAddress } = useTezosCollectStore();
  const setActiveAddress = useTezosCollectStore(
    (store: { setActiveAddress: any }) => store.setActiveAddress
  );

  const onConnectWallet = async () => {
    await TEZOS_COLLECT_WALLET.requestPermissions({
      network: TEZOS_COLLECT_NETWORK,
    });
    const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
    setActiveAddress(_activeAddress);
  };

  const onDisconnectWallet = async () => {
    setActiveAddress("");
    await TEZOS_COLLECT_WALLET.clearActiveAccount();
  };

  useEffect(() => {
    const getActiveAccounts = async () => {
      const _activeAddress =
        await TEZOS_COLLECT_WALLET.client.getActiveAccount();
      if (_activeAddress?.address) {
        setActiveAddress(_activeAddress?.address);
      }
      Tezos.setWalletProvider(TEZOS_COLLECT_WALLET);
    };
    getActiveAccounts();
  }, []);

  return activeAddress.length === 0 ? (
    <button
      className="bg-black text-white rounded-lg text-xl px-4 py-1"
      onClick={onConnectWallet}
    >
      CONNECT
    </button>
  ) : (
    <button className="" onClick={onDisconnectWallet}>
      <div>{`${activeAddress.slice(0, -28)}...${activeAddress.substring(
        30
      )}`}</div>
    </button>
  );
};

export default ConnectWallet;
