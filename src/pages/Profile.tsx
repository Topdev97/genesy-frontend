import React, { useEffect, useMemo, useState } from "react";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import { BsTwitter, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { I_PROFILE } from "../utils/interface";
import { useTezosCollectStore } from "../store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [profile, setProfile] = useState<I_PROFILE | null>(null);
  const [wallet, setWallet] = useState<I_PROFILE | null>(null);
  const [tabLength, setTabLength] = useState<number>(0);
  const { address } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [guest, setGuest] = useState<boolean>(true);
  const { fetchProfile, activeAddress, toggleBookmark } =
    useTezosCollectStore();
  const _activeAddress = JSON.parse(
    localStorage.getItem("activeAddress") || '{"address": ""}'
  );
  const TAB_LIST = useMemo(
    () => [
      {
        path: `/profile/${address}/dashboard`,
        text: "DASHBOARD",
      },
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
      setGuest(false);
    } else {
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

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      let user = await fetchProfile(address!);
      console.log("user", user);
      let walletData = await fetchProfile(_activeAddress?.address!);
      setProfile(user);
      setWallet(walletData);
      if (user?.artist) {
        setTabLength(1);
        if (_activeAddress?.address == "tz1VL5AfvZ3Cz6Bd2c2agcUQe7HKxje7ojNu") {
          setTabLength(0);
        }
      } else {
        setTabLength(2);
      }
      if (walletData?.friends?.includes(address!)) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
      setLoading(false);
    };
    fetchUser();
  }, [address]);

  return loading ? (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <Skeleton count={3} width={300} />
      <div className="flex gap-4 mb-4">
        <Skeleton width={70} height={40} />
        <Skeleton width={70} height={40} />
      </div>
      <Skeleton height={35} />
      <div className="flex justify-end">
        <Skeleton width={200} />
      </div>
      <div className="flex justify-between mt-4">
        {[1, 2, 3].map((item) => (
          <div className="w-[300px]" key={item}>
            <div className="flex items-center gap-4">
              <Skeleton width={40} height={40} />
              <Skeleton width={80} height={28} />
            </div>
            <div className="flex justify-between">
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            <Skeleton width={300} height={300} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex justify-between">
        <div className="mb-6">
          <div className="text-2xl font-bold">{profile?.username}</div>
          <div className="pt-2">{profile?.description}</div>
          <a
            href={profile?.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline"
          >
            {profile?.twitter}
          </a>
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
