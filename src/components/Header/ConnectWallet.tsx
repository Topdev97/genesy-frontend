import React, { useEffect, useState } from "react";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "../../utils/constants";

import { useTezosCollectStore } from "../../store";
import user from "../../assets/user.svg";
import artist from "../../assets/artist.svg";
import Menu from "./Menu";
const ConnectWallet = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
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
      className="bg-black text-white rounded text-xl px-8 py-1 hover:bg-gray-600"
      onClick={onConnectWallet}
    >
      SIGN IN
    </button>
  ) : (
    <div className="relative flex items-center">
      <button onClick={() => setIsMenu(!isMenu)}>
        <img src={user} alt="test" />
      </button>
      {isMenu && <Menu />}
    </div>
    // <button
    //   className="bg-black text-white rounded-lg text-xl px-4 py-1 hover:bg-gray-600"
    //   onClick={onDisconnectWallet}
    // >
    //   <div>{`${activeAddress.slice(0, -30)}...${activeAddress.substring(
    //     32
    //   )}`}</div>
    // </button>
  );
};

export default ConnectWallet;
