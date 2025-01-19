// import React from "react";

import { Box, Center } from '@chakra-ui/react';
import { Principal } from '@dfinity/principal';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { CkEthConvert, EthConvert } from './account_convert';
import { CkEthAccountDeposit } from './account_deposit';
import { CkEthAccountWithdraw } from './account_withdraw';
import ConnectMetamask from './connect_metamask';
// import AccountWithdraw from "./account_withdraw";

enum SwitchEthMethod {
  CONVERT_CKETH,
  WITHDRAW,
  DEPOSIT,
  CONVERT_ETH,
}

function AccountEth() {
  const [getPrincipal, setPrincipal] = useState<Principal | undefined>(
    undefined
  );
  const [getswitchEthMethod, setSwitchEthMethod] =
    useState<SwitchEthMethod | null>(null);
  const [ethAddress, setEthAddress] = useState<string>('-');
  const { isConnected } = useAccount();

  return (
    <>
      <ConnectMetamask />
      {isConnected ? (
        <ShowEthMenu switchMethod={setSwitchEthMethod} />
      ) : (
        <>
          <Center className="mt-10 text-black font-sans font-bold">
            Please Connect Wallet.
          </Center>
        </>
      )}
      {SwitchEthMethod.CONVERT_ETH === getswitchEthMethod ? (
        <EthConvert />
      ) : (
        <></>
      )}
      {SwitchEthMethod.DEPOSIT === getswitchEthMethod ? (
        <CkEthAccountDeposit />
      ) : (
        <></>
      )}
      {SwitchEthMethod.WITHDRAW === getswitchEthMethod ? (
        <CkEthAccountWithdraw />
      ) : (
        <></>
      )}
      {SwitchEthMethod.CONVERT_CKETH === getswitchEthMethod ? (
        <CkEthConvert />
      ) : (
        <></>
      )}
    </>
  );
}

export default AccountEth;

export function ShowEthMenu({ switchMethod }: any) {
  return (
    <Center>
      {}
      <Box className="text-sm font-medium text-center mb-10 text-gray-500 border-b border-gray-200 ">
        <Box className="flex flex-wrap -mb-px">
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchEthMethod.CONVERT_ETH);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Convert ETH
            </Box>
          </Box>
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchEthMethod.DEPOSIT);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
              aria-current="page"
            >
              Deposit
            </Box>
          </Box>
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchEthMethod.WITHDRAW);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Withdraw
            </Box>
          </Box>
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchEthMethod.CONVERT_CKETH);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Convert ckETH
            </Box>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
