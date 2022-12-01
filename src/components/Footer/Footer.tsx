import React, { useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
const Footer = () => {
  return (
    <div className=" bg-black">
      <div className=" text-white flex justify-between py-12 h-60 max-w-[1024px] mx-auto">
        <div className="flex flex-col justify-between">
          <div className="text-xl border-r-8 border-white pr-4 ">GENESY</div>
          <div className="text-sm">
            &#169;{new Date().getFullYear()} Genesys Terms and conditions
          </div>
        </div>
        <div className="flex flex-col justify-between text-right text-sm">
          <div className="flex flex-col gap-4">
            <div>FAQ</div>
            <div>US@GENESY.XYZ</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>FOLLOW US</div>
            <div className="flex justify-end">
              <FiTwitter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
