"use client";

import { Provider } from "@/lib/auth/interface";
import { Button, Center } from "@chakra-ui/react";
import React from "react";
import { SpinnerDoubleBorder } from "../spinners";
import PlugConnectIcon from "@/lib/utils/icons/plug";
import { ICLogo } from "@/lib/utils/icons/ic";
import { XTCIcon } from "@/lib/utils/icons/xtc";

interface ModalProps {
  isModalOpen?: boolean;
  isSiginLoading: boolean;
  signIn: (provider: Provider) => Promise<void>;
  onClose?: () => void;
}

const SelectProviderModal: React.FC<ModalProps> = ({
  onClose,
  signIn,
  isSiginLoading,
}) => {
  const PlugLogo = <PlugConnectIcon h="80px" />;
  const ICPLogo = <ICLogo w="40px" h="80px" />;
  const XTCLogo=<XTCIcon  w="30px" h="60px"  />
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-indigo-100">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            {isSiginLoading ? (
              <Center>
                <h1 className="mb-4 text-3xl font-extrabold font-sans">
                  Please Wait ...
                </h1>
              </Center>
            ) : (
              <div className="mb-8">
                <Center>
                  <h1 className="mb-4 text-3xl font-extrabold font-sans">
                    Wallet
                  </h1>
                </Center>
                <p className="text-gray-600">
                  Please select anyone provider to authnenticate yourself.
                </p>
              </div>
            )}
            {isSiginLoading ? (
              <Center>
                {}
                <SpinnerDoubleBorder />
              </Center>
            ) : (
              <div className="space-y-4">
                <Button
                  rightIcon={PlugLogo}
                  onClick={() => signIn(Provider.Plug)}
                  className="hover:text-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  Plug
                </Button>
                <Button
                  onClick={() => {
                    alert("Support Comming Soon!");
                  }}
                  rightIcon={ICPLogo}
                  // onClick={() => signIn(Provider.II)}
                  className="disabled hover:text-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  Internet Identity
                </Button>
                <Button
                 onClick={() => {
                  alert("Support Comming Soon!");
                }}
                  rightIcon={XTCLogo}
                  className="hover:text-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  NFID
                </Button>
                <Button
                  onClick={onClose}
                  className="p-3 bg-white border rounded-full w-full font-semibold"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProviderModal;
