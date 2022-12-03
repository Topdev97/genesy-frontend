import React, { useEffect, Dispatch, SetStateAction } from "react";
import LinkWithSearchParams from "../LinkWithSearchParams";
type AppProps = {
  onDisconnectWallet: () => Promise<void>;
  setIsMenu: Dispatch<SetStateAction<boolean>>;
};
const Menu = (props: AppProps) => {
  return (
    <div className="absolute top-12 bg-white  w-32 right-0 menu-shadow">
      <LinkWithSearchParams
        to={{
          pathname: "/mint",
        }}
      >
        <div
          className="px-4 py-2 hover:bg-gray-200"
          onClick={() => props.setIsMenu(false)}
        >
          Create
        </div>
      </LinkWithSearchParams>

      <LinkWithSearchParams
        to={{
          pathname: "/profile/:address/*",
        }}
      >
        <div
          className="px-4 py-2 hover:bg-gray-200"
          onClick={() => props.setIsMenu(false)}
        >
          Profile
        </div>
      </LinkWithSearchParams>
      <div
        className="px-4 py-2 hover:bg-gray-200"
        onClick={() => {
          props.onDisconnectWallet();
          props.setIsMenu(false);
        }}
      >
        Sign out
      </div>
    </div>
  );
};

export default Menu;
