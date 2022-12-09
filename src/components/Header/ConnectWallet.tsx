import React, { useEffect, useState } from "react";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useTezosCollectStore } from "../../store";
import user from "../../assets/user.svg";
import artist from "../../assets/artist.svg";
import Menu from "./Menu";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
interface profileType {
  artist: boolean;
  avatarLink: string;
  description: string;
  feedOrder: number;
  twitter: string;
  username: string;
  verified: boolean;
  volumeWeek: number;
  wallet: string;
}
const ConnectWallet = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<profileType | null>(null);
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

    try {
      let res = await axios.get(`${API_ENDPOINT}/profiles/${_activeAddress}`);
      setProfile(res.data);
      if (res.data?.wallet) {
        navigate("/home/primary");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
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
      let res = await axios.get(
        `${API_ENDPOINT}/profiles/${_activeAddress?.address}`
      );
      console.log("res", res);
      setProfile(res.data);
    };
    getActiveAccounts();
  }, []);

  return activeAddress.length === 0 ? (
    <button
      className="bg-black text-white rounded text-xl px-4 hover:bg-gray-600 py-1"
      onClick={onConnectWallet}
    >
      Sync
    </button>
  ) : (
    <div className="relative flex items-center">
      <button onClick={() => setIsMenu(!isMenu)} className="">
        <img
          src={profile?.avatarLink ? profile?.avatarLink : user}
          alt="test"
          className="w-12 h-12"
        />
      </button>
      {isMenu && (
        <Menu onDisconnectWallet={onDisconnectWallet} setIsMenu={setIsMenu} />
      )}
    </div>
  );
};

export default ConnectWallet;
