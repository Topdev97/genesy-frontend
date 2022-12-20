import CollectCard from "../Market/CollectCard";
import { useState, useEffect } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
import { I_PROFILE } from "../../utils/interface";
import { useTezosCollectStore } from "../../store";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const profile = JSON.parse(localStorage.getItem("profiles") || "[]")?.filter(
    (item: I_PROFILE) => item?.artist
  );
  const updateProfile = async (e: any, index: number) => {
    let res = await axios.put(
      `${API_ENDPOINT}/profiles/${profile[index]?.wallet}`,
      { verified: e.target.checked }
    );
  };

  return (
    <div className="pt-[40px]">
      <div className="flex gap-4 py-2  justify-between  ">
        <div className="w-48 pl-8">Name</div>
        <div className="w-96">Address</div>
        <div className="pr-8 w-20">Curated</div>
      </div>
      <div className="border border-black">
        {profile?.map((user: I_PROFILE, index: number) => (
          <div
            className="flex gap-4 py-2 border-b justify-between  border-black last:border-b-0"
            key={index}
          >
            <div className="w-48 pl-8">{user.username}</div>
            <div className="w-96">{user.wallet}</div>
            <div className="pr-8 w-20">
              <input
                type="checkbox"
                name="curated"
                id="curated"
                onChange={(e) => updateProfile(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
