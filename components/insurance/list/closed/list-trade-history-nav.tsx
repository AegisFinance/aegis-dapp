import { useListInsurancesKey } from '@/lib/hooks/canisters/insurance/list-insurances';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Spinners } from '../../../spinners';
import { LuRefreshCw } from 'react-icons/lu';

function ListInsuranceContractsNav() {
 
  const [listInsurances, loadingListInsuranceApi, list] =
    useListInsurancesKey();

  const listInsurance = async () => {
    await listInsurances();
    console.log(list);
  };

  if (loadingListInsuranceApi) {
    return <Spinners sizes="xl" />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        {/* <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-/400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
              required
            />
          </div>
        </form> */}
      </div>
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          
          <button
            onClick={() => {
              listInsurance();
            }}
            id="filterDropdownButton"
            data-dropdown-toggle="filterDropdown"
            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:bg-gray-700"
            type="button"
          >
            <LuRefreshCw className="h-4 w-4 mr-2 text-gray-400" />
            Refresh
          </button>
          <div
            id="filterDropdown"
            className="z-10 hidden w-48 p-3  rounded-lg shadow dark:bg-gray-700"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ListInsuranceContractsNav;
