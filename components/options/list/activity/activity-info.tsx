import { formatDateInput } from '@/components/insurance/trade/issue/issue-contract-form';
import {
  OptionsContractState,
  TradedOptionsContractsKey,
  TradedOptionsContractsValue,
} from '@/declarations/options/options.did';
import { useListOptionsActivity } from '@/lib/hooks/canisters/options/list-activity';
import { Box, Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsDatabaseX } from 'react-icons/bs';
import { Spinners } from '../../../spinners';

export type ListActivityProps = {
  list: [TradedOptionsContractsKey, TradedOptionsContractsValue][];
  isLoading: boolean;
};
function ListActivity({ list, isLoading }: ListActivityProps) {
  const router = useRouter();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700   bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 underline underline-offset-2"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 underline underline-offset-2"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-4 py-3 underline underline-offset-2"
              >
                Type
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
                Traded At
              </th>
              <th
                scope="col"
                className="px-4 py-3 underline underline-offset-2"
              >
                State
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {isLoading ? (
                <Spinners />
              ) : (
                <>
                  {list?.map((v, i) => {
                    return (
                      <>
                        <tr className="shadow hover:shadow-none  border-gray-700 border-b-2 hover:border-r-4 hover:border-b-2  hover:border-indigo-600   ">
                          <td
                            scope="row"
                            className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                          >
                            {v[1].options_name}
                          </td>
                          <td
                            scope="row"
                            className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                          >
                            {String(v[0].id)}
                          </td>
                          <td
                            scope="row"
                            className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                          >
                            {v[1].options_type}
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
                            {formatDateInput(v[1].trade_timestamp / 1_000_000n)}
                          </td>
                          <td
                            scope="row"
                            className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                          >
                            {v[0].contract_state}
                          </td>
                          {/* <td
                            scope="row"
                            className="  px-4 py-3 font-medium text-black whitespace-nowrap "
                          >
                            {v[0].principal.toText()}
                          </td> */}
                          <td className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                            <Button
                              onClick={() => {
                                router.push(
                                  `/options/trade?type=view&id=${v[0].id}`
                                );
                              }}
                              type="button"
                              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </>
              )}
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
    </>
  );
}

export default ListActivity;
