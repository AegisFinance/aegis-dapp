import { IcrcTransferResult } from '@/declarations/accounts/accounts.did';
import { withdrawFromAccount } from '@/lib/apis/accounts';
import { humanToE8s } from '@/lib/apis/utils';
import { ASSETS } from '@/lib/constants';
import { ProviderAtom } from '@/lib/states/jotai';
import { Box, Button, Center, Input, useToast } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { parseEther } from 'viem';

export function CkEthAccountWithdraw() {
  const [amount, setAmount] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPressed, setPressed] = useState<boolean>(false);

  const [provider] = useAtom(ProviderAtom);
  const toast = useToast();

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const withdraw = async () => {
    if (amount) {
      setPressed(true);
      const res = await withdrawFromAccount(
        parseEther(amount),
        {
          CKETH: null,
        },
        provider!
      );
      setPressed(false);
      setAmount(undefined);
      if ('Ok' in res) {
        toast({
          title: 'Amount Withdraw Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(res)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold mb-2">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto relative  ">
        <Input
          onChange={handleAmountChange}
          type="text"
          id="amount-number-input"
          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0.012"
          required
        />
        {/* <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box> */}
        <br />
        <Center>
          <Button
            isDisabled={!amount || isPressed}
            isLoading={isPressed}
            onClick={withdraw}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"                 >
            Withdraw ckETH
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export function CkBtcAccountWithdraw() {
  const toast = useToast();
  const [provider] = useAtom(ProviderAtom);

  const [amount, setAmount] = useState<number | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPressed, setPressed] = useState<boolean>(false);

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const withdraw = async () => {
    if (amount) {
      setPressed(true);
      const res = await withdrawFromAccount(
        humanToE8s(amount)!,
        {
          CKBTC: null,
        },
        provider!
      );
      setPressed(false);
      setAmount(undefined);
      if ('Ok' in res) {
        toast({
          title: 'Amount Withdraw Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(res)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={'p'} className="max-w-sm mx-auto mt-4 font-extrabold">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto relative  ">
        <Input
          onChange={handleAmountChange}
          type="text"
          id="amount-number-input"
          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0.012"
          required
        />
        {/* <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box> */}
        <br />
        <Center>
          <Button
            isDisabled={!amount || isPressed}
            isLoading={isPressed}
            onClick={withdraw}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"          >
            Withdraw ckBTC
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export function IcpAccountWithdraw() {
  const toast = useToast();
  const [provider] = useAtom(ProviderAtom);

  const [amount, setAmount] = useState<number | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPressed, setPressed] = useState<boolean>(false);

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const withdraw = async () => {
    if (amount) {
      setPressed(true);
      const res :IcrcTransferResult= await withdrawFromAccount(
        humanToE8s(amount)!,
        {
          ICP: null,
        },
        provider!
      );
      setPressed(false);
      setAmount(undefined);
      if ('TransferSuccess' in res) {
        toast({
          title: 'Amount Withdraw Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(res)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto relative  ">
        <Input
          onChange={handleAmountChange}
          type="text"
          id="amount-number-input"
          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="2 ICP"
          required
        />
        {/* <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box> */}
        <br />
        <Center>
          <Button
            isDisabled={!amount || isPressed}
            isLoading={isPressed}
            onClick={withdraw}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"            >
            Withdraw ICP
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
