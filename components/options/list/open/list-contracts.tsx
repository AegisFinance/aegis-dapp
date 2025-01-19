import { formatDateInput } from '@/components/insurance/trade/issue/issue-contract-form';
import { useListOptionsOfferList } from '@/lib/hooks/canisters/options/list-options-offers-list';
import { optionsAssets, optionsType } from '@/lib/states/jotai';
import { OptionsAssets, OptionsType } from '@/lib/states/types';
import {
  convertBigIntToOptionsAmount,
  convertXrcToStrikePrice,
} from '@/lib/utils/convert-inputs';
import { Box, Button, Center } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsDatabaseX } from 'react-icons/bs';
import { Spinners } from '../../../spinners';
import ListOptionsContractsNav from './list-options-nav';

function ListOptionsContracts() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [getOptionsAsset, setOptionsAsset] = useAtom(optionsAssets);
  const [getOptionsType, setOptionsType] = useAtom(optionsType);

  const router = useRouter();

  const [listOptions, setListOptions] = useState<any[] | undefined>(undefined);

  //   const [listInsurancesKey, loadingListInsuranceApi, list] =
  //     useListInsurancesKey();
  const [listOfferOptions, isLoadingApi, list] = useListOptionsOfferList();

  useEffect(() => {
    const listOffersOptions = async () => {
      if (list == undefined) {
        await listOfferOptions({ CALL: null });
      } else {
        console.log('List already present');
      }
    };

    listOffersOptions();
  }, []);

  if (isLoadingApi && isLoading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      <section className="  ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
          <div className=" dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <ListOptionsContractsNav />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700   bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Strike Price ($)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Collateral
                      {getOptionsType == OptionsType.Call
                        ? getOptionsAsset == OptionsAssets.CKBTC
                          ? ' (BTC)'
                          : ' (ETH)'
                        : ' (USDT)'}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Offer Ends in
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Contract Expiry
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Option Id
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {list?.map((v, i) => {
                      return (
                        <>
                          <tr className="shadow hover:shadow-none  border-gray-700 border-b-2 hover:border-r-4 hover:border-b-2  hover:border-indigo-600   ">
                            <td
                              scope="row"
                              className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {convertXrcToStrikePrice(v[0].strike_price)}
                            </td>
                            <td
                              scope="row"
                              className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {getOptionsType == OptionsType.Call
                                ? convertBigIntToOptionsAmount(
                                    v[0].asset_amount,
                                    v[0].options_asset
                                  )
                                : convertXrcToStrikePrice(v[0].strike_price) *
                                  convertBigIntToOptionsAmount(
                                    v[0].asset_amount,
                                    v[0].options_asset
                                  )}
                            </td>
                            <td
                              scope="row"
                              className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {formatDateInput(
                                v[0].offer_duration / 1_000_000n
                              )}
                            </td>
                            <td
                              scope="row"
                              className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {formatDateInput(
                                v[0].contract_expiry / 1_000_000n
                              )}
                            </td>
                            <td
                              scope="row"
                              className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {formatDateInput(v[0].timestamp / 1_000_000n)}
                            </td>
                            <td
                              scope="row"
                              className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {String(v[0].id)}
                            </td>
                            <td className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                              <Button
                                onClick={() => {
                                  setLoading(true);
                                  router.push(
                                    `/options/trade?type=buy&id=${v[0].id}`
                                  );
                                }}
                                type="button"
                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                              >
                                Buy
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                </tbody>
              </table>
            </div>
            {list == undefined ||
              !list ||
              (list.length == 0 && (
                <>
                  <Box className="flex flex-row items-center justify-center gap-2 mt-40 lg:mt-60  text-bold font-sans">
                    <BsDatabaseX />
                    <Center>No Options Listed</Center>
                  </Box>
                </>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ListOptionsContracts;
