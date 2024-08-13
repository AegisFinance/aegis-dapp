'use client';

import { Provider } from '@/lib/auth/interface';
import { Box, Button, Center } from '@chakra-ui/react';
import React from 'react';
import { SpinnerDoubleBorder } from '../spinners';
import PlugConnectIcon from '@/lib/utils/icons/plug';
import { ICLogo } from '@/lib/utils/icons/ic';
import { XTCIcon } from '@/lib/utils/icons/xtc';

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
  const XTCLogo = <XTCIcon w="30px" h="60px" />;
  return (
    <Box
      zIndex={3}
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10"
    >
      <Box className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-indigo-100">
        <Box className="w-full">
          <Box className="m-8 my-20 max-w-[400px] mx-auto">
            {isSiginLoading ? (
              <Center>
                <h1 className="mb-4 text-3xl font-extrabold font-sans">
                  Please Wait ...
                </h1>
              </Center>
            ) : (
              <Box className="mb-8">
                <Center>
                  <h1 className="mb-4 text-12xl font-extrabold font-button-14">
                    Wallet
                  </h1>
                </Center>
                <p className="text-gray-600">
                  Please select anyone provider to authnenticate yourself.
                </p>
              </Box>
            )}
            {isSiginLoading ? (
              <Center>
                {}
                <SpinnerDoubleBorder />
              </Center>
            ) : (
              <Box className="space-y-4">
                <Button
                  rightIcon={PlugLogo}
                  onClick={() => signIn(Provider.Plug)}
                  className="hover:text-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  Plug
                </Button>
                <Button
                  disabled
                  onClick={() => {
                    alert('Support Comming Soon!');
                  }}
                  rightIcon={ICPLogo}
                  // onClick={() => signIn(Provider.II)}
                  className="disabled hover:text-white  hover:bg-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  Internet Identity
                </Button>
                <Button
                  disabled={true}
                  onClick={() => {
                    alert('Support Comming Soon!');
                  }}
                  rightIcon={XTCLogo}
                  className="hover:text-white  hover:bg-slate-500 p-3 bg-slate-500 rounded-full text-white w-full font-semibold font-sans"
                >
                  NFID
                </Button>
                <Button
                  onClick={onClose}
                  className="p-3 bg-white border rounded-full w-full font-semibold"
                >
                  Close
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectProviderModal;
