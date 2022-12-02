import React, { useEffect, useMemo } from "react";
import CollectCard from "../components/Market/CollectCard";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import { BsTwitter, BsBookmark } from "react-icons/bs";

import { useParams } from "react-router-dom";
const Profile = () => {
  const { address } = useParams();
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
  return (
    <div className="max-w-[1024px] mx-auto py-24">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-bold">Artist Name</div>
          <div>Independent Artist of Generative Art</div>
        </div>
        <BsBookmark className="font-bold" />
      </div>
      <div className="flex flex-col">
        <div className="flex border-b-2 border-black">
          {TAB_LIST.map((link, index) => (
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
