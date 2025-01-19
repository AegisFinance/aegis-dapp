import { Spinners } from '@/components/spinners';
import {
  CreateOptionArgs,
  OptionsAssets,
} from '@/declarations/options/options.did';
import { OPTIONS_PRINCIPAL } from '@/lib/constants/canisters';
import { useIssueOptionsContract } from '@/lib/hooks/canisters/options/issue-options-contracts';
import { useIcrcApprove } from '@/lib/hooks/ledgers/icrc/approve';
import { CANISTERS_NAME, convertOptionsAssetToCanisterName } from '@/lib/utils';
import {
  convertOptionsAmountToBigInt,
  convertStrikePriceToXrc,
  humanToE18s,
} from '@/lib/utils/convert-inputs';
import { Box, Button } from '@chakra-ui/react';
import { ApproveParams } from '@dfinity/ledger-icrc';
import { parseEther } from 'viem';
import { OptionContractInitArgsInput } from './issue-contract-form';

interface IssueContractConfirmProps {
  setConfirm: (args: boolean | undefined) => void;
  formData: OptionContractInitArgsInput;
}

const processInsuranceInputs = (
  data: OptionContractInitArgsInput
): CreateOptionArgs => {
  let asset: OptionsAssets = {
    ICRC: data.asset,
  };
  let inputsArgs: CreateOptionArgs = {
    ...data,
    asset,
    asset_amount: convertOptionsAmountToBigInt(data.asset_amount, data.asset),
    contract_expiry: BigInt(data.contract_expiry) * 1_000_000n,
    offer_duration: BigInt(data.offer_duration) * 1_000_000n,
    strike_price: convertStrikePriceToXrc(data.strike_price),
  };

  return inputsArgs;
};

export default function IssueContractConfirm({
  setConfirm,
  formData,
}: IssueContractConfirmProps) {
  let [issueContractApi, loadingIssueContractApi] = useIssueOptionsContract();
  let [approve, loadingApproveApi] = useIcrcApprove();
  const handleConfirmation = async () => {
    try {
      let inputs: CreateOptionArgs = processInsuranceInputs(formData);
      console.log(': --------------------------------------');
      console.log(': handleConfirmation -> inputs', inputs);
      console.log(': --------------------------------------');
      let type = formData.options_type;
      console.log(
        'Approve Amount: ',
        formData.strike_price * formData.asset_amount * 2
      );
      console.log(
        'Approve AmountString: ',
        String(formData.strike_price * formData.asset_amount * 2)
      );

      let approveAmount: bigint;
      if ('CALL' in formData.options_type) {
        console.log(': ----------------------------------');
        console.log(': handleConfirmation -> CALL');
        console.log(': ----------------------------------');
        approveAmount = inputs.asset_amount + inputs.asset_amount;
      } else {
        console.log(': ----------------------------------');
        console.log(': handleConfirmation -> PUT');
        console.log(': ----------------------------------');
        approveAmount = humanToE18s(
          formData.strike_price * formData.asset_amount * 2
        )!;
        console.log(': ----------------------------------------------------');
        console.log(': handleConfirmation -> approveAmount', approveAmount);
        console.log(': ----------------------------------------------------');
      }
      if (
        await approve(
          'CALL' in formData.options_type
            ? convertOptionsAssetToCanisterName(inputs.asset)!
            : CANISTERS_NAME.CKUSDT_LEDGER,
          {
            amount: approveAmount,
            spender: {
              owner: OPTIONS_PRINCIPAL,
              subaccount: [],
            },
          } as ApproveParams
        )
      ) {
        await issueContractApi(inputs);
      }

      setConfirm(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingIssueContractApi || loadingApproveApi) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      <Box className="bg-transparent shadow z-10 w-full p-5 max-w-lg font-sans font-thin text-center">
        <Box className="flex flex-wrap -mx-3 mb-4">
          <Box className="w-full md:w-1/2 px-3">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Option Type
            </label>
            <Box className="relative">
              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                {'CALL' in formData.options_type ? 'CALL' : 'PUT'}
              </Box>

              <Box className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </Box>
            </Box>
          </Box>
          <Box className="w-full md:w-1/2 px-3">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select Asset
            </label>
            <Box className="relative">
              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                {'CKBTC' in formData.asset ? 'CKBTC' : 'CKETH'}
              </Box>
              <Box className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
          <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Amount
            </label>

            <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              {formData.asset_amount}
            </Box>
          </Box>

          <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contract State
            </label>
            <Box className="relative">
              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                {'OFFER'}
              </Box>
            </Box>
          </Box>

          <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Strike Price
            </label>

            <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              {formData.strike_price}
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
          <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Offer Duration
            </label>

            <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              {formData.offer_duration}
            </Box>
          </Box>

          <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contract Expiry
            </label>

            <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              {formData.contract_expiry}
            </Box>
          </Box>
        </Box>

        <Box className="flex justify-center gap-x-4">
          <Box className=" ">
            <Button
              onClick={() => {
                setConfirm(undefined);
              }}
              className="flex items-center gap-2 bg-purple-500 border-transparent   border-[3px] 
              transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white  
              dark:shadow-[5px_5px_0px_#7888ff]  hover:bg-purple-400  active:shadow-none
              active:translate-x-[5px] active:translate-y-[5px]"
            >
              &nbsp; Cancel&nbsp;
            </Button>
          </Box>
          <Box className=" ">
            <Button
              onClick={() => {
                handleConfirmation();
              }}
              className="flex items-center gap-2 bg-purple-500 border-transparent   border-[3px] 
              transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white  
              dark:shadow-[5px_5px_0px_#7888ff]  hover:bg-purple-400  active:shadow-none
              active:translate-x-[5px] active:translate-y-[5px]"
            >
              &nbsp; Issue&nbsp;
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
