import { Spinners } from '@/components/spinners';
import {
  Options,
  OptionsContractState,
} from '@/declarations/options/options.did';
import {
  convertBigIntToOptionsAmount,
  convertXrcToStrikePrice,
} from '@/lib/utils/convert-inputs';
import {
  convertOptionsAssetsIntoString,
  convertOptionsAssetsToOptionsAssetsByNames,
  convertOptionsAssetsToOptionsAssetsIcrc,
  convertOptionsContractStateToString,
  convertOptionsTypeIntoString,
} from '@/lib/utils/options-asset-conversions';
import { Box, Button, Heading, Spacer } from '@chakra-ui/react';
import { formatDateTimeInput } from '../trade/issue/issue-contract-form';
import { useRouter } from 'next/navigation';
import { useExerciseOptionManually } from '@/lib/hooks/canisters/options/exercise-contract-manual';
import { useEffect, useState } from 'react';

export function ViewOptionsContractData({
  optionsId,
  option,
  isLoading,
}: {
  optionsId: bigint;
  option: Options | undefined;
  isLoading: boolean;
}) {
  const [exerciseContractApi, loadingExerciseContractApi] =
    useExerciseOptionManually();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const router = useRouter();

  const exerciseContract = async () => {
    await exerciseContractApi(
      convertOptionsAssetsToOptionsAssetsIcrc(option!.asset),
      optionsId
    );
  };

  const checkOptionState = (state: OptionsContractState) => {
    console.log(': ----------------------------------');
    console.log(': checkOptionState -> state', state);
    console.log(': ----------------------------------');
    try {
      if (state && ('CLOSED' in state || 'EXECUTED' in state)) {
        setIsDisabled(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    checkOptionState(option?.contract_state!);
  }, [option]);
  return (
    <>
      <Box className="bg-transparent shadow z-10 w-full max-w-lg  font-serif  font-thin">
        <Heading
          as="h2"
          size="lg"
          className="text-center font-serif underline underline-offset-8 mb-2"
        >
          Option Contract
        </Heading>
        {isLoading ? (
          <Spinners sizes="xl" />
        ) : (
          <>
            {option && (
              <Box className="flex flex-col gap-4 lg:gap-1 p-5">
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    ID
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {String(optionsId) || '-'}
                  </Box>
                </Box>
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className="pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Name
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {option?.name || '-'}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Asset
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {convertOptionsAssetsIntoString(option.asset) || '-'}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Type
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {convertOptionsTypeIntoString(option.options_type) || '-'}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Expiry
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {formatDateTimeInput(option.contract_expiry / 1_000_000n) ||
                      '-'}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Created at
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {formatDateTimeInput(option.timestamp / 1_000_000n) || '-'}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Strike Price ($)
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {convertXrcToStrikePrice(option.strike_price)}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Collateral
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {convertBigIntToOptionsAmount(
                      option.asset_amount,
                      convertOptionsAssetsToOptionsAssetsByNames(option.asset)
                    )}
                  </Box>
                </Box>
                {/*  */}
                <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                  <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                    Status
                  </Box>
                  <Spacer />
                  <Box className="  block   text-gray-700  font-mono ">
                    {convertOptionsContractStateToString(option.contract_state)}
                  </Box>
                </Box>
                {option.contract_state ==
                ({ OPEN: null } as OptionsContractState) ? (
                  <></>
                ) : (
                  <>
                    <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
                      <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold  font-serif  ">
                        <Button
                          onClick={() => {
                            router.back();
                          }}
                        >
                          Back
                        </Button>
                      </Box>
                      <Spacer />
                      {isDisabled ? (
                        <></>
                      ) : (
                        <Box className="  block   text-gray-700  font-mono ">
                          <Button
                            isLoading={loadingExerciseContractApi}
                            onClick={exerciseContract}
                            disabled={isDisabled}
                            type="button"
                            className=" font-serif  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
                      )}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
