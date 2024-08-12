import { Insurance } from '@/declarations/insurance/insurance.did';
import { Box, Button, Heading, Spacer } from '@chakra-ui/react';
import { formatDateInput } from '../issue/issue-contract-form';
import { convertBigIntToInsuranceAmount } from '@/lib/utils/convert-inputs';
import { Spinners } from '@/components/spinners';
import { useExerciseInsuranceContract } from '@/lib/hooks/canisters/insurance/exercise-insurance-contract';
import { convertMilliSecondsToDateTime } from '@/lib/apis/utils';

export function ViewInsuranceContractData({
  insuranceId,
  insurance,
  currentPremium,
  isLoading,
  poolBalance,
  premiumPoolBalance,
}: {
  insuranceId: number;
  insurance: Insurance | undefined;
  currentPremium: bigint;
  isLoading: boolean;
  premiumPoolBalance: bigint;
  poolBalance: bigint;
}) {
  const [exerciseContractApi, loadingExerciseContractApi] =
    useExerciseInsuranceContract();

  const exerciseContract = async () => {
    await exerciseContractApi(insuranceId);
  };

  if (isLoading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      <Box className="bg-transparent shadow z-10 w-full max-w-lg font-sans font-thin">
        <Heading
          as="h2"
          size="lg"
          className="text-center font-sans underline mb-2"
        >
          Contract
        </Heading>
        {insurance && (
          <Box className="flex flex-col gap-4 lg:gap-1 p-5">
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                ID
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {insuranceId || '-'}
              </Box>
            </Box>
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className="pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Title
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {insurance?.title || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Description
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {insurance?.description || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Asset
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {Object.keys(insurance!.insurance_asset)[0] || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Contract Category
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {Object.keys(insurance!.category)[0] || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Contract Expiry
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertMilliSecondsToDateTime(insurance?.expiry_date! / 1_000_000n) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Inflation Target
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {insurance?.category.InflationBasedInsurance.inflation_target?.toFixed(
                  2
                ) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Premium Amount
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToInsuranceAmount(
                  insurance?.min_premium_amount!,
                  insurance?.insurance_asset!
                )! || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Share Amount
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToInsuranceAmount(
                  insurance?.min_share_amount[0] ?? 0n,
                  insurance?.insurance_asset!
                )! || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Seller Participation
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {insurance?.is_muliple_seller_allowed ? 'YES' : 'NO' || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Benefit Multiplier
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {Object.keys(insurance?.multiplier!)[0].slice(1) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Status
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {Object.keys(insurance?.status!)[0] || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Max Premium Amount(current)
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToInsuranceAmount(
                  currentPremium,
                  insurance?.insurance_asset!
                )! || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Premium Pool Balance(current)
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToInsuranceAmount(
                  premiumPoolBalance,
                  insurance?.insurance_asset!
                )! || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Pool Balance(current)
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToInsuranceAmount(
                  poolBalance,
                  insurance?.insurance_asset!
                )! || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans "></Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                <Button
                  isLoading={loadingExerciseContractApi}
                  onClick={exerciseContract}
                  disabled={!insurance.is_muliple_seller_allowed}
                  type="button"
                  className="font-sans text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Exercise Contract
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
