import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { Box, Center } from "@chakra-ui/react";
import { BtcConvert, CkBtcConvert } from "./account_convert";
import { CkBtcAccountDeposit } from "./account_deposit";
import { CkBtcAccountWithdraw } from "./account_withdraw";

enum SwitchBTCMethod {
  CONVERT_CKBTC,
  WITHDRAW,
  DEPOSIT,
  CONVERT_BTC,
}

function AccountBtc() {
  const [getPrincipal, setPrincipal] = useState<Principal | undefined>(
    undefined
  );
  const [getswitchBTCMethod, setSwitchBTCMethod] = useState<
    SwitchBTCMethod | undefined
  >(undefined);

  return (
    <>
      <ShowBTCMenu switchMethod={setSwitchBTCMethod} />

      {SwitchBTCMethod.CONVERT_BTC === getswitchBTCMethod ? (
        <>
          <BtcConvert />
        </> // <BTCConvert />
      ) : (
        <></>
      )}
      {SwitchBTCMethod.DEPOSIT === getswitchBTCMethod ? (
        <>
          <CkBtcAccountDeposit />
        </> // <AccountDeposit />
      ) : (
        <></>
      )}
      {SwitchBTCMethod.WITHDRAW === getswitchBTCMethod ? (
        <>
          <CkBtcAccountWithdraw />
        </> //    <AccountWithdraw />
      ) : (
        <></>
      )}
      {SwitchBTCMethod.CONVERT_CKBTC === getswitchBTCMethod ? (
        <>
          <CkBtcConvert />
        </> //   <CkBTCConvert />
      ) : (
        <></>
      )}
    </>
  );
}

export default AccountBtc;

export function ShowBTCMenu({ switchMethod }: any) {
  return (
    <Center>
      {}
      <Box className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
        <Box className="flex flex-wrap -mb-px">
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchBTCMethod.CONVERT_BTC);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Convert BTC
            </Box>
          </Box>
          <Box className="mr-2">
            <Box
              as="button"
              onClick={() => {
                switchMethod(SwitchBTCMethod.DEPOSIT);
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
                switchMethod(SwitchBTCMethod.WITHDRAW);
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
                switchMethod(SwitchBTCMethod.CONVERT_CKBTC);
              }}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Convert ckBTC
            </Box>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
