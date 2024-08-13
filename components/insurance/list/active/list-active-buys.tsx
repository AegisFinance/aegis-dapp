import React, { useEffect, useState } from 'react';
import InsuranceListActiveBuyNav from './list-active-buy-nav';
import { useListInsurancesKey } from '@/lib/hooks/canisters/insurance/list-insurances';
import { Box, Button, Center, Spacer } from '@chakra-ui/react';
import { Spinners } from '../../../spinners';
import {
  convertMilliSecondsToDateTime,
  truncatePrincipal,
} from '@/lib/apis/utils';
import { useRouter } from 'next/navigation';
import { BsDatabaseX } from 'react-icons/bs';
import { useListActiveBuyInsuranceListByPrincipal } from '@/lib/hooks/canisters/insurance/list-active-insurances-by-principal';
import {
  formatDateInput,
  formatDateTimeInput,
} from '../../trade/issue/issue-contract-form';

export function ListActiveBuyContracts() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [listInsurancesKey, loadingListInsuranceApi, list] =
    useListActiveBuyInsuranceListByPrincipal();

  useEffect(() => {
    const listInsurance = async () => {
      if (list == undefined) {
        await listInsurancesKey();
      } else {
        console.log('List already present');
      }
    };

    listInsurance();
  }, []);

  if (loadingListInsuranceApi && isLoading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      <section className="   ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
          <div className=" dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ">
            <InsuranceListActiveBuyNav />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700   bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Inusrance ID
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Principal
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    ></th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    ></th>
                  </tr>
                </thead>
                {/* {(list ) ?? ( */}
                <tbody>
                  <>
                    {list?.map((v, i) => {
                      return (
                        <>
                          <tr className="shadow hover:shadow-none  border-gray-700 border-b-2 hover:border-r-4 hover:border-b-2  hover:border-indigo-600   ">
                            <td
                              scope="row"
                              className="underline px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {v.insurance_id || '-'}
                            </td>

                            <td
                              scope="row"
                              className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {v.principal.toText()}
                            </td>

                            <td className="hidden lg:block  px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                              {convertMilliSecondsToDateTime(
                                BigInt(v.time_stamp) / 1_000_000n
                              )}
                            </td>
                            <td className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                              <Button
                                onClick={() => {
                                  setLoading(true);
                                  router.push(
                                    `/insurance/trade?type=view&id=${v.insurance_id}`
                                  );
                                }}
                                type="button"
                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                </tbody>
                {/* )} */}
              </table>
            </div>
            {!list ||
              (list.length == 0 && (
                <>
                  <Box className="flex flex-row items-center justify-center gap-2 mt-40 lg:mt-60  text-bold font-sans">
                    <BsDatabaseX />
                    <Center>No Buy contract Found</Center>
                  </Box>
                </>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
