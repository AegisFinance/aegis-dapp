import { Spinners } from '@/components/spinners';
import { Options } from '@/declarations/options/options.did';
import { calculatePremium } from '@/lib/apis/canisters/options/calculate-premium';
import { OPTIONS_PRINCIPAL } from '@/lib/constants/canisters';
import { useBuyOptionsContract } from '@/lib/hooks/canisters/options/buy-options-contract';
import { useIcrcApprove } from '@/lib/hooks/ledgers/icrc/approve';
import { ProviderAtom } from '@/lib/states/jotai';
import { CANISTERS_NAME } from '@/lib/utils';
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
import { ApproveParams } from '@dfinity/ledger-icrc';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { formatDateTimeInput } from '../issue/issue-contract-form';

export function BuyOptionsContractForm({
  optionsId,
  options,
  currentPremium,
  isLoading,
}: {
  optionsId: bigint;
  options: Options | undefined;
  currentPremium: number;
  isLoading: boolean;
}) {
  const [provider] = useAtom(ProviderAtom);

  let [buyOptionsApi, loadingBuyOptionsApi] = useBuyOptionsContract();
  let [approve, loadingApproveApi] = useIcrcApprove();

  let [premiumAmount, setPremiumAmount] = useState<number | undefined>(
    undefined
  );

  const [refreshPremium, setRefreshPremium] = useState<boolean>(false);

  const buyOptions = async () => {
    try {
      if (premiumAmount) {
        if (
          await approve(CANISTERS_NAME.CKUSDT_LEDGER, {
            amount: BigInt(parseEther(String(premiumAmount))) * 2n,
            spender: {
              owner: OPTIONS_PRINCIPAL,
              subaccount: [],
            },
          } as ApproveParams)
        ) {
          await buyOptionsApi(
            convertOptionsAssetsToOptionsAssetsIcrc(options!.asset),
            optionsId
          );
        }
      } else {
        await queryPremium();
      }
    } catch (error) {
      console.log(': ----------------------------');
      console.log(': buyOptions -> error', error);
      console.log(': ----------------------------');
    }
  };

  const queryPremium = async () => {
    if (options) {
      console.log(': ----------------------------------');
      console.log(': queryPremium -> options', options);
      console.log(': ----------------------------------');
      let premium = await calculatePremium(
        options.strike_price,
        options.options_type,
        options.contract_expiry,
        options.asset,
        provider!
      );
      if ('Ok' in premium) {
        setPremiumAmount(premium.Ok);
        setRefreshPremium(true);
      } else {
        setPremiumAmount(0.0);
      }
    }
  };

  useEffect(() => {
    if (!premiumAmount || !refreshPremium) {
      queryPremium();
    }
  });

  if ((isLoading && loadingBuyOptionsApi) || !options) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      <Box className="bg-transparent shadow z-10 w-full max-w-lg font-sans font-thin">
        <Heading
          as="h2"
          size="lg"
          className="text-center font-sans underline underline-offset-8 mb-2"
        >
          Trade Options
        </Heading>
        {options && (
          <Box className="flex flex-col gap-4 lg:gap-1 p-5">
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className="pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Asset
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertOptionsAssetsIntoString(options.asset) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Type
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertOptionsTypeIntoString(options.options_type) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Offer Ends in
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {formatDateTimeInput(options!.offer_duration / 1_000_000n) ||
                  '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Expiry
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {formatDateTimeInput(options.offer_duration / 1_000_000n) ||
                  '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Created at
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {formatDateTimeInput(options.timestamp / 1_000_000n) || '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Strike Price ($)
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertXrcToStrikePrice(options.strike_price)}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Collateral
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertBigIntToOptionsAmount(
                  options.asset_amount,
                  convertOptionsAssetsToOptionsAssetsByNames(options.asset)
                )}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Premium (USDT)
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {premiumAmount! *
                  convertBigIntToOptionsAmount(
                    options.asset_amount,
                    convertOptionsAssetsToOptionsAssetsByNames(options.asset)
                  ) || '-'}
                {/* <Button
                  className="bg-transparent"
                  onClick={() => {
                    setPremiumAmount(0.0);
                    queryPremium();
                  }}
                >
                  ()
                </Button> */}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                Status
              </Box>
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                {convertOptionsContractStateToString(options.contract_state!) ||
                  '-'}
              </Box>
            </Box>
            {/*  */}
            <Box className="flex flex-wrap   mb-4 flex-col md:flex-row  ">
              {/* <Box className=" pb-3 lg:pb-0 tracking-wide text-gray-700 text-xs font-bold font-sans ">
                <NumberInput>
                  <NumberInputField
                    onChange={handleInputChange}
                    value={premiumAmount}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box> */}
              <Spacer />
              <Box className="  block   text-gray-700  font-mono ">
                <Button
                  isLoading={loadingBuyOptionsApi || loadingApproveApi}
                  disabled={premiumAmount == 0 ? true : false}
                  isDisabled={premiumAmount == undefined}
                  onClick={buyOptions}
                  type="button"
                  className="font-sans text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Trade
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
