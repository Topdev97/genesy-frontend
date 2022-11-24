import React, { useEffect, useMemo } from "react";
import CollectCard from "../components/CollectCard";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileTabs from "../components/ProfileTabs/ProfileTabs";
import LinkWithSearchParams from "../components/LinkWithSearchParams";
import { BsTwitter } from "react-icons/bs";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { address } = useParams();
  const TAB_LIST = useMemo(
    () => [
      {
        path: `/profile/${address}/created`,
        text: "created",
      },
      {
        path: `/profile/${address}/owned`,
        text: "owned",
      },
      {
        path: `/profile/${address}/onsale`,
        text: "onsale",
      },
    ],
    [address]
  );
  return (
    <div className="flex flex-col px-24 pt-12">
      <div className="flex">
        <div className="w-48 h-12"></div>
        <div className="flex flex-col gap-2">
          <div className="font-bold">Iskra Velitchkova</div>
          <div>Indepenedent Artist of Generative Art</div>
          <BsTwitter />
        </div>
      </div>
      <div className="flex">
        <div>
          {TAB_LIST.map((link, index) => (
            <LinkWithSearchParams
              key={index}
              className={({ isActive }: { isActive: boolean }) =>
                `whitespace-nowrap flex-1 font-semibold cursor-pointer hover:text-tezLightGr ${
                  isActive
                    ? "border-b-2 border-b-tezGrSt text-tezGr outline-0"
                    : ""
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
