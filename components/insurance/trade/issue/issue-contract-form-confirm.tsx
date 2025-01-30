import { Spinners } from '@/components/spinners';
import { InsuranceContractInitArgs } from '@/declarations/insurance/insurance.did';
import { INSURANCE_PRINCIPAL } from '@/lib/constants/canisters';
import { useIssueInsuranceContract } from '@/lib/hooks/canisters/insurance/issue-Insurance-contract';
import { useIcrcApprove } from '@/lib/hooks/ledgers/icrc/approve';
import { convertInsuranceAssetToCanisterName } from '@/lib/utils';
import { convertInsuranceAmountToBigInt } from '@/lib/utils/convert-inputs';
import { Box } from '@chakra-ui/react';
import { ApproveParams } from '@dfinity/ledger-icrc';
import {
  formatDateInput,
  InsuranceContractInitArgsInput,
} from './issue-contract-form';

interface IssueContractConfirmProps {
  setConfirm: (args: boolean | undefined) => void;
  formData: InsuranceContractInitArgsInput;
}

const processInsuranceInputs = (
  data: InsuranceContractInitArgsInput
): InsuranceContractInitArgs => {
  let inputsArgs: InsuranceContractInitArgs = {
    ...data,
    min_share_amount: data.is_muliple_seller_allowed
      ? data.min_share_amount
        ? [
            convertInsuranceAmountToBigInt(
              data.min_share_amount,
              data.insurance_asset
            ),
          ]
        : []
      : [],
    min_premium_amount: convertInsuranceAmountToBigInt(
      data.min_premium_amount,
      data.insurance_asset
    ),
    amount: convertInsuranceAmountToBigInt(data.amount, data.insurance_asset),
    expiry_date:
      BigInt(data.category.InflationBasedInsurance.target_expiry) * 1_000_000n,
    category: {
      InflationBasedInsurance: {
        ...data.category.InflationBasedInsurance,
        inflation_target: Number(
          data.category.InflationBasedInsurance.inflation_target.toFixed(2)
        ),
        target_expiry:
          BigInt(data.category.InflationBasedInsurance.target_expiry) *
          1_000_000n,
      },
    },
  };

  return inputsArgs;
};
export default function IssueContractConfirm({
  setConfirm,
  formData,
}: IssueContractConfirmProps) {
  let [issueContractApi, loadingIssueContractApi] = useIssueInsuranceContract();
  let [approve, loadingApproveApi] = useIcrcApprove();
  const handleConfirmation = async () => {
    try {
      let inputs: InsuranceContractInitArgs = processInsuranceInputs(formData);
      console.log(': --------------------------------------');
      console.log(': handleConfirmation -> inputs', inputs);
      console.log(': --------------------------------------');
      if (
        await approve(
          convertInsuranceAssetToCanisterName(inputs.insurance_asset)!,
          {
            amount: inputs.amount + inputs.amount,
            spender: {
              owner: INSURANCE_PRINCIPAL,
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
      <Box className="bg-transparent shadow z-10 w-full max-w-lg font-sans font-thin">
        <Box className="flex flex-col gap-4 lg:gap-2 p-5">
          <Box className="flex flex-wrap -mx-3 mb-4">
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block    tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                {formData.title}
              </Box>
            </Box>
            <Box className="w-full md:w-1/2 px-3">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Select Asset
              </label>
              <Box className="relative">
                <Box className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {Object.keys(formData.insurance_asset)[0]}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-6">
            <Box className="w-full px-3">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {formData.description}
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Amount
              </label>

              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {Number(formData.amount)}
              </Box>
            </Box>
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Premium Amount
              </label>

              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {Number(formData.min_premium_amount)}
              </Box>
            </Box>
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Share Amount
              </label>

              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {Number(formData.min_share_amount)}
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-4 ">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Multiplier
              </label>
              <Box className="relative">
                <Box className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {Object.keys(formData.multiplier)[0] || ''}
                </Box>
              </Box>
            </Box>
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Category
              </label>
              <Box className="relative">
                <Box className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  Inflation
                </Box>
              </Box>
            </Box>

            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <Box className="relative">
                <Box className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  US
                </Box>
              </Box>
            </Box>
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Expiry Date
              </label>

              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {formatDateInput(
                  BigInt(
                    formData.category.InflationBasedInsurance.target_expiry
                  )
                )}
              </Box>
            </Box>
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Inflation Target
              </label>

              <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {formData.category.InflationBasedInsurance.inflation_target}
              </Box>
            </Box>
          </Box>

          <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
            <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
              Seller Participation
            </label>

            <Box className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {formData.is_muliple_seller_allowed == true ? 'true' : 'false'}
            </Box>
          </Box>

          <div className="md:flex  md:items-center md:gap-4  ">
             <div className="md:w-1/3"></div>
            {/* <div className="md:w-2/3">   */}
              <button
                onClick={() => {
                  setConfirm(undefined);
                }}
                className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
                transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
                  shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                   dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                   active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"              >
                &nbsp; Cancel&nbsp;
              </button>
            {/* </div> */}
          {/* </div>
          <div className="md:flex  md:items-center"> */}
            {/* <div className="md:w-1/3"></div>
            <div className="md:w-2/3"> */}
              <button
                onClick={() => {
                  handleConfirmation();
                }}
                className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
                transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
                  shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                   dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                   active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"              >
                Confirm
              </button>
            {/* {/* </div> */}
          </div> 
        </Box>
      </Box>
    </>
  );
}
