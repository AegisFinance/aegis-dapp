import { withdrawFromAccount } from "@/lib/apis/accounts";
import { humanToE8s } from "@/lib/apis/utils";
import { ASSETS } from "@/lib/constants";
import { Box, Button, Center, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { parseEther } from "viem";

export function CkEthAccountWithdraw() {
  const toast = useToast();

  const [amount, setAmount] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isPressed, setPressed] = useState<boolean>(false);

  const handleAmountChange = (event: any) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  const withdraw = async () => {
    if (amount) {
      setPressed(true);
      const res = await withdrawFromAccount(parseEther(amount), {
        CKETH: null,
      });
      setPressed(false);
      setAmount(undefined);
      if ("Ok" in res) {
        toast({
          title: "Amount Withdraw Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error Occured",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          description: `${Object.keys(res.Err)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={"p"} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={"p"} className="max-w-sm mx-auto relative  ">
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
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Withdraw ckETH
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export function CkBtcAccountWithdraw() {
  const toast = useToast();

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
      const res = await withdrawFromAccount(humanToE8s(amount)!, {
        CKBTC: null,
      });
      setPressed(false);
      setAmount(undefined);
      if ("Ok" in res) {
        toast({
          title: "Amount Withdraw Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error Occured",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          description: `${Object.keys(res.Err)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={"p"} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={"p"} className="max-w-sm mx-auto relative  ">
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
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Withdraw ckBTC
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export function IcpAccountWithdraw() {
  const toast = useToast();

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
      const res = await withdrawFromAccount(humanToE8s(amount)!, {
        ICP: null,
      });
      setPressed(false);
      setAmount(undefined);
      if ("Ok" in res) {
        toast({
          title: "Amount Withdraw Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error Occured",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          description: `${Object.keys(res.Err)}`,
        });
      }
    }
  };

  return (
    <Box>
      <Box as={"p"} className="max-w-sm mx-auto  font-extrabold">
        <Center>Enter Amount</Center>
      </Box>
      <Box as={"p"} className="max-w-sm mx-auto relative  ">
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
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Withdraw ICP
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
