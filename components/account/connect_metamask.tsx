import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { SiEthereum } from "react-icons/si";

export default function ConnectMetamask() {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-screen-xl mx-auto px-4 py-3 items-center justify-between text-white sm:flex md:px-8">
        <div className="flex gap-x-4">
          <div className="w-10 h-10 flex-none rounded-lg bg-indigo-800 flex items-center justify-center">
            <SiEthereum />
          </div>
          <p className="py-2 font-medium"></p>
        </div>
        <div className="inline-block w-full mt-3 py-2 px-3 text-center text-indigo-600 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
