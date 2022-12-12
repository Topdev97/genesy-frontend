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
  const [tabLength, setTabLength] = useState<number>(0);
  const { address } = useParams();
  const { fetchProfile, activeAddress } = useTezosCollectStore();
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
  useState(() => {
    const fetchUser = async () => {
      let user = await fetchProfile(activeAddress);
      setProfile(user);
      if (user?.artist) {
        setTabLength(0);
      } else {
        setTabLength(1);
      }
    };
    fetchUser();
  });
  return (
    <div className="max-w-[1024px] mx-auto py-24 sm:px-8 lg:px-0">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">Artist Name</div>
          <div className="py-4">Independent Artist of Generative Art</div>
        </div>
        <div
          onClick={() => setIsBookmark(!isBookmark)}
          className=" w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center"
        >
          {isBookmark ? (
            <BsBookmarkFill className="font-bold" />
          ) : (
            <BsBookmark className="font-bold" />
          )}
        </div>
      </div>
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
        <div className="flex justify-end py-2">
          <div className="flex gap-2 items-center">
            <label htmlFor="onlySale">On sale only</label>
            <input type="checkbox" name="onlySale" id="onlySale" />
          </div>
        </div>
        <ProfileTabs />
      </div>
    </div>
  );
};

export default Profile;
