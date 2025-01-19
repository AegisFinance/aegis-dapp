import { CkEthLogo } from "@/lib/utils/icons/cketh";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { SiEthereum } from "react-icons/si";

export default function ConnectMetamask() {
  return (
    <div className="bg-lavender-blue-500 ">
      <div className="max-w-screen-xl mx-auto px-4 py-3 items-center justify-between text-white sm:flex md:px-8">
        <div className="flex gap-x-4">
          <div className="w-15 h-15 flex-none rounded-lg  flex items-center justify-center">
            <CkEthLogo className="w-10 h-10" />
          </div>
          <p className="py-2 font-medium"></p>
        </div>
        <div className="inline-block w-full mt-3 py-2 px-3 text-center text-indigo-400 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
