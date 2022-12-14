import React, { useEffect, useMemo, useState } from "react";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import { BsTwitter, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { I_PROFILE } from "../utils/interface";
import { useTezosCollectStore } from "../store";

import { useParams } from "react-router-dom";
const Profile = () => {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [profile, setProfile] = useState<I_PROFILE | null>(null);
  const [wallet, setWallet] = useState<I_PROFILE | null>(null);
  const [tabLength, setTabLength] = useState<number>(0);
  const { address } = useParams();
  const [guest, setGuest] = useState<boolean>(true);
  const { fetchProfile, activeAddress, toggleBookmark } =
    useTezosCollectStore();
  const _activeAddress = JSON.parse(
    localStorage.getItem("activeAddress") || '{"address": ""}'
  );
  const TAB_LIST = useMemo(
    () => [
      {
        path: `/profile/${address}/created`,
        text: "CREATED",
      },
      {
        path: `/profile/${address}/owned`,
        text: "OWNED",
      },
    ],
    [address]
  );
  const toggleMark = async (wallet: string, friend: string) => {
    setIsBookmark(!isBookmark);
    // const indexOf = profile.friends.indexOf(friend);
    // if (indexOf >= 0) profile.friends.splice(indexOf, 1);
    // else profile.friends.push(friend);

    await toggleBookmark(wallet, friend);
  };
  useEffect(() => {
    if (_activeAddress?.address! !== address) {
      console.log("_activeAddress?.address", _activeAddress?.address);
      console.log("address", address);
      setGuest(false);
    } else {
      console.log("true");
      setGuest(true);
    }
  }, []);

  useEffect(() => {
    const fetchBookmark = async () => {
      let walletData = await fetchProfile(_activeAddress?.address!);
      setWallet(walletData);
      if (walletData?.friends?.includes(address!)) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    };
    fetchBookmark();
  }, [isBookmark]);
  useState(() => {
    const fetchUser = async () => {
      let user = await fetchProfile(address!);
      let walletData = await fetchProfile(_activeAddress?.address!);
      console.log("walletData", walletData);
      setProfile(user);
      setWallet(walletData);
      if (user?.artist) {
        setTabLength(0);
      } else {
        setTabLength(1);
      }
      if (walletData?.friends?.includes(address!)) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    };
    fetchUser();
  });
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">{profile?.username}</div>
          <div className="py-4">Independent Artist of Generative Art</div>
        </div>
        {_activeAddress?.address !== address && (
          <div
            onClick={() => toggleMark(_activeAddress?.address!, address!)}
            className=" w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center"
          >
            {isBookmark ? (
              <BsBookmarkFill className="font-bold" />
            ) : (
              <BsBookmark className="font-bold" />
            )}
          </div>
        )}
      </div>
      {guest && (
        <div className="flex gap-4 pb-8">
          {profile?.artist ? (
            <button className="bg-black text-white px-4 py-1 border border-black  hover:text-black hover:bg-white">
              <LinkWithSearchParams
                to={{
                  pathname: "/mint",
                }}
              >
                MINT
              </LinkWithSearchParams>
            </button>
          ) : (
            <></>
          )}
          <button className="bg-black text-white px-4 py-1 border border-black  hover:text-black hover:bg-white">
            <LinkWithSearchParams
              to={{
                pathname: "/edit",
              }}
            >
              EDIT
            </LinkWithSearchParams>
          </button>
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex border-b-2 border-black">
          {TAB_LIST?.slice(tabLength)?.map((link, index) => (
            <LinkWithSearchParams
              key={index}
              className={({ isActive }: { isActive: boolean }) =>
                `flex flex-col font-medium ${
                  isActive ? "active-dot" : "text-gray-700"
                }`
              }
              to={{
                pathname: link.path,
              }}
            >
              <div className="p-2 text-center">{link.text}</div>
            </LinkWithSearchParams>
          ))}
        </div>

        <ProfileTabs />
      </div>
    </div>
  );
};

export default Profile;
