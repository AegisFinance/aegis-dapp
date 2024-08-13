import { e8sToHuman, truncatePrincipal } from '@/lib/apis/utils';
import { SEPOLIA_HELPER_SMART_CONTRACT_ABI } from '@/lib/constants/contracts/contract_abis';
import { SEPOLIA_HELPER_SMART_CONTRACT_ADDRESS } from '@/lib/constants/contracts/contract_address';
import { Box, Button, Center, Input, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { parseEther } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import {
  convertCkBtc,
  getBitcoinAddress,
  updateBitcoinBalance,
} from '@/lib/apis/accounts';
import {} from '@/lib/apis/canisters/icrc/balance';
import { approveCkEth, withdrawckEth } from '@/lib/apis/withdraw_eth';
import { getPrincipal } from '@/lib/auth';
import { useIcrcBalance } from '@/lib/hooks/ledgers/icrc/balance';
import { ProviderAtom } from '@/lib/states/jotai';
import { CANISTERS_NAME } from '@/lib/utils';
import { useAtom, useAtomValue } from 'jotai';
import { Spinners } from '../spinners';

export function CkBtcConvert() {
  const [getIcrcBalance, loadingGetIcrcBalance] = useIcrcBalance();
  const [provider] = useAtom(ProviderAtom);

  const [amount, setAmount] = useState<number | undefined>();
  const [btcAddress, setBtcAddress] = useState<string | undefined>();
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleAmountChange(event: any) {
    const amount = event.target.value;
    setAmount(amount!);
  }
  function handleAddressChange(event: any) {
    const address = event.target.value;
    setBtcAddress(address);
  }

  const withdraw = async () => {
    if (btcAddress && amount) {
      setLoading(true);
      const index = await convertCkBtc(btcAddress, amount, provider!);
      console.log('🚀 ~ withdraw ~ index:', index);
      setBlockInddex(index.block_index.toString());
      setLoading(false);
    }
  };
  return (
    <Box>
      <Box as={'p'} className="max-w-sm mt-10 mx-auto  font-extrabold">
        <Center>Bitcoin Address </Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto relative  ">
        <Input
          onChange={handleAddressChange}
          type="text"
          id="amount-number-input"
          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box>
      </Box>
      <br />
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount </Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto">
        <Center> {amount}</Center>
      </Box>
      <form className="max-w-sm mx-auto">
        <label htmlFor="amount-number-input" className="sr-only">
          Enter Amount:
        </label>
        <Box className="relative  ">
          <Input
            onChange={handleAmountChange}
            type="text"
            id="amount-number-input"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.1 BTC"
            required
          />
          {/* <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <FaEthereum />
          </Box> */}
        </Box>
        <Box className="grid grid-cols-3 gap-4 my-4"></Box>
        {/* <Center>
          <Button
            isDisabled={(!amount && !btcAddress) || isLoading}
            isLoading={isLoading}
            onClick={approve}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Approve ckBTC
          </Button>
        </Center> */}
        <Center>
          <Button
            isDisabled={(!amount && !btcAddress) || isLoading}
            isLoading={isLoading}
            onClick={withdraw}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Convert ckBTC
          </Button>
        </Center>
        {blockIndex ? <Center>Index {blockIndex} </Center> : <></>}
        <Center></Center>
      </form>
    </Box>
  );
}
export function BtcConvert() {
  const provider = useAtomValue(ProviderAtom);

  const [depositAddress, setDespositAddress] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [manualDeposit, setManualDesposit] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | undefined>(0);
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isPressed, setPressed] = useState<boolean>(false);
  const [getIcrcBalance, loadingGetIcrcBalance] = useIcrcBalance();

  const toast = useToast();

  const updateBalance = async () => {
    setPressed(true);
    const res = await updateBitcoinBalance(
      (await getPrincipal(provider!))!,
      provider!
    );
    if ('Err' in res) {
      toast({
        title: 'Error Occured',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        description: `${Object.keys(res.Err)}`,
      });
    }
    await getBalance();
    setPressed(false);
  };
  const getBalance = async () => {
    const getBalance = await getIcrcBalance(CANISTERS_NAME.CKBTC_LEDGER, {
      owner: (await getPrincipal(provider!))!,
      subaccount: [],
    });
    console.log((await getPrincipal(provider!))!.toString());
    console.log('🚀 ~ getBalance ~ getBalance:', getBalance);
    setBalance(e8sToHuman(getBalance));
  };
  useEffect(() => {
    const getAddress = async () => {
      setLoading(true);
      setDespositAddress(
        await getBitcoinAddress(
          (await getPrincipal(provider!))!,
          false,
          provider!
        )
      );
      await getBalance();
      setLoading(false);
    };
    getAddress();
  }, []);

  if (isLoading) {
    return <Spinners sizes={'xl'} />;
  }

  return (
    <>
      <Box>
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
                  <></>
                ) : (
                  // <QRCode
                  //   size={512}
                  //   style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  //   value={depositAddress!}
                  //   viewBox={`0 0 256 256`}
                  //   level="L"
                  // />
                  <></>
                )}
              </Box>
            </Box>
          </Box>
        </Center>
        <Box className="max-w-sm mx-auto">
          <Center>
            {}
            <Box as={'h3'}>{depositAddress}</Box>
          </Center>
          {}
          <br />
          <Center>
            {}
            <Box as={'h3'}>{balance} ckBTC</Box>
          </Center>
          {}
          {/* <label htmlFor="amount-number-input" className="sr-only">
            Enter Amount:
          </label>
          <Box className="relative  ">
            <input
              // onChange={handleAmountChange}
              type="text"
              id="amount-number-input"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.1 ETH"
              required
            /> */}
          {/* <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <FaEthereum />
            </Box> */}
          {/* </Box> */}
          <Box className="grid grid-cols-3 gap-4 my-4"></Box>
          <Center>
            <Button
              isDisabled={isPressed}
              isLoading={isPressed}
              onClick={updateBalance}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Update Balance
            </Button>
          </Center>
        </Box>
      </Box>
    </>
  );
}

export function EthConvert() {
  const provider = useAtomValue(ProviderAtom);

  const [getPrincipalText, setPrincipal] = useState<string | undefined>(
    undefined
  );
  const [ethAddress, setEthAddress] = useState<string>('-');

  const [amount, setAmount] = useState<string | undefined>();

  const { isConnected } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending: isLoading,
  } = useWriteContract();

  const contractConfig = {
    address: SEPOLIA_HELPER_SMART_CONTRACT_ADDRESS,
    abi: SEPOLIA_HELPER_SMART_CONTRACT_ABI,
  } as const;

  function despositEther() {
    if (isConnected && getPrincipalText && ethAddress) {
      writeContract({
        ...contractConfig,
        functionName: 'deposit',
        args: [ethAddress],
        value: parseEther(amount as string),
      });
    }
  }

  useEffect(() => {
    const config = async () => {
      const getPrincipalText = (await getPrincipal(provider!))!.toText();
      setPrincipal(getPrincipalText.toString());
      // const bytes32Conversion = uint8ArrayToHexString(principal?.toUint8Array()!);
      setEthAddress(
        '0x1d0186e12248ea2deae7af519e347d5c219aa86f3789fdd55bfd7aa6d4020000'
      );
    };
    config();
  }, [getPrincipalText]);

  const { data: txData } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  function handleAmountChange(event: any) {
    const amount = event.target.value;
    setAmount(amount!);
  }
  return (
    <Box>
      <Box as={'p'} className="max-w-sm mx-auto font-extrabold">
        <Center>Principal</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto">
        <Center>{truncatePrincipal(getPrincipalText,6)}</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Ethereum Address </Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto">
        <Center> {truncatePrincipal(ethAddress)}</Center>
      </Box>
      <br />
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount {amount}</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto">
        <Center> {amount}</Center>
      </Box>
      <form className="max-w-sm mx-auto">
        <label htmlFor="amount-number-input" className="sr-only">
          Enter Amount:
        </label>
        <Box className="relative  ">
          <Input
            onChange={handleAmountChange}
            type="text"
            id="amount-number-input"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.1 ETH"
            required
          />
          <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <FaEthereum />
          </Box>
        </Box>
        <Box className="grid grid-cols-3 gap-4 my-4"></Box>
        <Center>
          <Button
            isDisabled={!amount}
            isLoading={isLoading}
            onClick={despositEther}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Convert
          </Button>
        </Center>
      </form>
      {txData ? (
        <Box className="max-w-sm mx-auto">
          Tx :
          <a href={`https://sepolia.etherscan.io/tx/${txData.transactionHash}`}>
            Transaction Link
          </a>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export function CkEthConvert() {
  const provider = useAtomValue(ProviderAtom);

  const [amount, setAmount] = useState<string | undefined>();
  const [ethAddress, setEthAddress] = useState<string | undefined>();
  const [blockIndex, setBlockInddex] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleAmountChange(event: any) {
    const amount = event.target.value;
    setAmount(amount!);
  }
  function handleAddressChange(event: any) {
    const address = event.target.value;
    setEthAddress(address);
  }

  const withdraw = async () => {
    if (ethAddress && amount) {
      setLoading(true);
      const index = await withdrawckEth(ethAddress, amount, provider!);
      setBlockInddex(index.toString());
      setLoading(false);
    }
  };
  const approve = async () => {
    if (ethAddress && amount) {
      setLoading(true);
      await approveCkEth(amount, provider!);
      setLoading(false);
    }
  };
  return (
    <Box>
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Ethereum Address </Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto relative  ">
        <Input
          onChange={handleAddressChange}
          type="text"
          id="amount-number-input"
          className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0x..."
          required
        />
        <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></Box>
      </Box>
      <br />
      <Box as={'p'} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount {amount}</Center>
      </Box>
      <Box as={'p'} className="max-w-sm mx-auto">
        <Center> {amount}</Center>
      </Box>
      <form className="max-w-sm mx-auto">
        <label htmlFor="amount-number-input" className="sr-only">
          Enter Amount:
        </label>
        <Box className="relative  ">
          <input
            onChange={handleAmountChange}
            type="text"
            id="amount-number-input"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.1 ETH"
            required
          />
          <Box className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <FaEthereum />
          </Box>
        </Box>
        <Box className="grid grid-cols-3 gap-4 my-4"></Box>
        <Center>
          <Button
            isDisabled={(!amount && !ethAddress) || isLoading}
            isLoading={isLoading}
            onClick={approve}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Approve ckETH
          </Button>
        </Center>
        <Center>
          <Button
            isDisabled={(!amount && !ethAddress) || isLoading}
            isLoading={isLoading}
            onClick={withdraw}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Convert ckETH
          </Button>
        </Center>
        {blockIndex ? <Center>Index {blockIndex} </Center> : <></>}
        <Center></Center>
      </form>
    </Box>
  );
}
