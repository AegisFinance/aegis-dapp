import React, { useEffect, useState } from 'react';
import ListInsuranceContractsNav from './list-insurance-nav';
import { useListInsurancesKey } from '@/lib/hooks/canisters/insurance/list-insurances';
import { Box, Button, Center, Spacer } from '@chakra-ui/react';
import { Spinners } from '../../../spinners';
import { truncatePrincipal } from '@/lib/apis/utils';
import { useRouter } from 'next/navigation';
import { BsDatabaseX } from 'react-icons/bs';

function ListInsuranceContracts() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [listInsurancesKey, loadingListInsuranceApi, list] =
    useListInsurancesKey();

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
      <section className="border-2 border-blue-700  ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
          <div className=" dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <ListInsuranceContractsNav />
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
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 underline underline-offset-2"
                    >
                      Issuer
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
                                {v[0].insurance_id}
                              </td>

                              <td
                                scope="row"
                                className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                              >
                                Inflation
                              </td>
                              <td className="md:hidden  px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {truncatePrincipal(v[0].principal.toText(), 2)}
                              </td>
                              <td className="hidden lg:block  px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                {v[0].principal.toText()}
                              </td>
                              <td className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                <Button
                                  onClick={() => {
                                    setLoading(true);
                                    router.push(
                                      `/insurance/trade?type=buy&id=${v[0].insurance_id}`
                                    );
                                  }}
                                  type="button"
                                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                >
                                  Buy
                                </Button>
                              </td>
                              <td className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                <Button
                                  onClick={() => {
                                    setLoading(true);
                                    router.push(
                                      `/insurance/trade?type=sell&id=${v[0].insurance_id}`
                                    );
                                  }}
                                  type="button"
                                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                  Sell
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
                    <Center>No Inusrance Listed</Center>
                  </Box>
                </>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ListInsuranceContracts;
