import React, { useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Footer = () => {
  return (
    <div className=" bg-black">
      <div className=" text-white flex justify-between py-12 h-60 max-w-[1024px] mx-auto sm:px-8 lg:px-0">
        <div className="flex flex-col justify-between">
          <LinkWithSearchParams
            to={{
              pathname: "/",
            }}
          >
            <div className="text-xl border-r-8 border-white pr-4 w-24">
              GENESY
            </div>
          </LinkWithSearchParams>
          <div className="text-sm">
            &#169;{new Date().getFullYear()} Genesys Terms and conditions
          </div>
        </div>
        <div className="flex flex-col justify-between text-right text-sm">
          <div className="flex flex-col gap-4">
            <LinkWithSearchParams
              to={{
                pathname: "/faq",
              }}
            >
              FAQ
            </LinkWithSearchParams>
            <a href="mailto: US@GENESY.XYZ">US@GENESY.XYZ</a>
          </div>
          <div className="flex flex-col gap-4">
            <div>FOLLOW US</div>
            <a
              href="https://twitter.com/Genesyxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-end"
            >
              <FiTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
