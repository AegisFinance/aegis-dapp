import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Spinners } from '../spinners';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Center, Input, useToast } from '@chakra-ui/react';
import { desposit_to_account } from '@/lib/apis/get_user_account';
import { fallback, parseEther } from 'viem';
import { ASSETS } from '@/lib/constants';
import { humanToE8s } from '@/lib/apis/utils';
import { get_icrc_address } from '@/lib/apis/canisters/accounts/get_accounts_balance';
import { useAtomValue } from 'jotai';
import { ProviderAtom } from '@/lib/states/jotai';

export function CkEthAccountDeposit() {
  const provider = useAtomValue(ProviderAtom);

  const [depositAddress, setDespositAddress] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [manualDeposit, setManualDesposit] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | undefined>();
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isPressed, setPressed] = useState<boolean>(false);

  const toast = useToast();

  const handleManualDeposit = () => {
    setManualDesposit(true);
  };

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const deposit = async () => {
    if (amount) {
      setPressed(true);
      const index = await desposit_to_account(
        parseEther(amount),
        ASSETS.CKETH_SEPOLIA,
        provider!
      );
      if (index) {
        setBlockInddex(index.toString());
        toast({
          title: 'ckETH Deposited',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${index}`,
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(index)}`,
        });
      }
      setPressed(false);
    }
  };
  useEffect(() => {
    const getAddress = async () => {
      setLoading(true);
      setDespositAddress(await get_icrc_address(provider!));
      setLoading(false);
    };
    getAddress();
  }, []);

  if (isLoading) {
    return <Spinners sizes={'xl'} />;
  }

  return (
    <>
      <Center>
        <Box className="max-w-sm mb-2 bg-white border border-gray-200 rounded-lg shadow">
          <Box className="p-5">
            <Box
              style={{
                height: 200,
                margin: '0 auto',
                maxWidth: 200,
                width: '200%',
              }}
            >
              {depositAddress ? (
                <QRCode
                  size={512}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={depositAddress!}
                  viewBox={`0 0 256 256`}
                  level="L"
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Center>

      {!manualDeposit ? (
        <Center>
          {}
          <Button
            onClick={handleManualDeposit}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"          >
               Manual Deposit{}
           </Button>
          {}
        </Center>
      ) : (
        <>
          <Center>
            {}
            <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
              Enter Amount
            </Box>
          </Center>
          <Box as={'p'} className="max-w-sm mx-auto relative mb-2 ">
            <Input
              onChange={handleAmountChange}
              type="text"
              id="amount-number-input"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.12"
              required
            />
            <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box>
          </Box>
          <Center>
            <Button
              isDisabled={!amount || isPressed}
              isLoading={isLoading}
              onClick={deposit}
              className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
              transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
                shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"            >
              Deposit ckETH
            </Button>
          </Center>
        </>
      )}
    </>
  );
}

export function CkBtcAccountDeposit() {
  const provider = useAtomValue(ProviderAtom);

  const [depositAddress, setDespositAddress] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [manualDeposit, setManualDesposit] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isPressed, setPressed] = useState<boolean>(false);

  const toast = useToast();

  const handleManualDeposit = () => {
    setManualDesposit(true);
  };

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const deposit = async () => {
    if (amount) {
      setPressed(true);
      const index = await desposit_to_account(
        humanToE8s(amount)!,
        ASSETS.CKBTC,
        provider!
      );
      if (index) {
        setBlockInddex(index.toString());
        toast({
          title: 'ckBTC Deposited',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${index}`,
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(index)}`,
        });
      }
      setPressed(false);
    }
  };
  useEffect(() => {
    const getAddress = async () => {
      setLoading(true);
      setDespositAddress(await get_icrc_address(provider!));
      setLoading(false);
    };
    getAddress();
  }, []);

  if (isLoading) {
    return <Spinners sizes={'xl'} />;
  }

  return (
    <>
      <Center>
        <Box className="max-w-sm mb-2 mt-10 bg-white border border-gray-200 rounded-lg shadow">
          <Box className="p-5">
            <Box
              style={{
                height: 200,
                margin: '0 auto',
                maxWidth: 200,
                width: '200%',
              }}
            >
              {depositAddress ? (
                <QRCode
                  size={512}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={depositAddress!}
                  viewBox={`0 0 256 256`}
                  level="L"
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Center>

      {!manualDeposit ? (
        <Center>
          {}
          <Button
            onClick={handleManualDeposit}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
          >
            Manual Deposit
          </Button>
          {}
        </Center>
      ) : (
        <>
          <Center>
            {}
            <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
              Enter Amount
            </Box>
          </Center>
          <Box as={'p'} className="max-w-sm mx-auto relative mb-2 ">
            <Input
              onChange={handleAmountChange}
              type="text"
              id="amount-number-input"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.12 ckBTC"
              required
            />
            <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box>
          </Box>
          <Center>
            <Button
              isDisabled={!amount || isPressed}
              isLoading={isLoading}
              onClick={deposit}
              className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
              transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
                shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"            >
              Deposit ckBTC
            </Button>
          </Center>
        </>
      )}
    </>
  );
}

export function IcpAccountDeposit() {
  const provider = useAtomValue(ProviderAtom);

  const [depositAddress, setDespositAddress] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [manualDeposit, setManualDesposit] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>();
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isPressed, setPressed] = useState<boolean>(false);

  const toast = useToast();

  const handleManualDeposit = () => {
    setManualDesposit(true);
  };

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const deposit = async () => {
    if (amount) {
      setPressed(true);
      const index = await desposit_to_account(
        humanToE8s(amount)!,
        ASSETS.ICP,
        provider!
      );
      if (index) {
        setBlockInddex(index.toString());
        toast({
          title: 'ICP Deposited',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${index}`,
        });
      } else {
        toast({
          title: 'Error Occured',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          description: `${Object.keys(index)}`,
        });
      }
      setPressed(false);
    }
  };
  useEffect(() => {
    const getAddress = async () => {
      setLoading(true);
      setDespositAddress(await get_icrc_address(provider!));
      setLoading(false);
    };
    getAddress();
  }, []);

  if (isLoading) {
    return <Spinners sizes={'xl'} />;
  }

  return (
    <>
      <Center>
        <Box className="max-w-sm mb-2 mt-10 bg-white border border-gray-200 rounded-lg shadow">
          <Box className="p-5">
            <Box
              style={{
                height: 200,
                margin: '0 auto',
                maxWidth: 200,
                width: '200%',
              }}
            >
              {depositAddress ? (
                <QRCode
                  size={512}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={depositAddress!}
                  viewBox={`0 0 256 256`}
                  level="L"
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Center>

      {!manualDeposit ? (
        <Center>
          {}
          <Button
            onClick={handleManualDeposit}
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
            transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
              shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
               dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
               active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"          >
               Manual Deposit{}
           </Button>
          {}
        </Center>
      ) : (
        <>
          <Center>
            {}
            <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
              Enter Amount
            </Box>
          </Center>
          <Box as={'p'} className="max-w-sm mx-auto relative mb-2 ">
            <Input
              onChange={handleAmountChange}
              type="text"
              id="amount-number-input"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1 ICP"
              required
            />
            <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box>
          </Box>
          <Center>
            <Button
              isDisabled={!amount || isPressed}
              isLoading={isLoading}
              onClick={deposit}
              className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
              transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
                shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"            >
              Deposit ICP
            </Button>
          </Center>
        </>
      )}
    </>
  );
}
