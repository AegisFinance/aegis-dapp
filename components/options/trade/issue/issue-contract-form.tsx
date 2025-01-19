import { Box, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import IssueContractConfirm from './issue-contract-form-confirm';

const OptionsAssetsSchema = z.union([
  z.object({ CKBTC: z.null() }),
  z.object({ CKETH: z.null() }),
  // z.object({ BTC: z.null() }),
  // z.object({ ETH: z.null() }),
  // z.object({
  //   ICRC: z.union([
  //     z.object({ CKBTC: z.null() }),
  //     z.object({ CKETH: z.null() }),
  //   ]),
  // }),
]);

const OptionsTypeSchema = z.union([
  z.object({ CALL: z.null() }),
  z.object({ PUT: z.null() }),
]);
const OptionsContractStateSchema = z.union([
  z.object({ OFFER: z.null() }),
  z.object({ OPEN: z.null() }),
  z.object({ EXECUTED: z.null() }),
  z.object({ EXPIRED: z.null() }),
]);

const OptionContractInitArgsSchemeInput = z.object({
  asset: OptionsAssetsSchema,
  strike_price: z.number().gt(0, 'Strike Price should be greater than 0'),
  options_type: OptionsTypeSchema,
  contract_state: OptionsContractStateSchema,
  offer_duration: z.number().gt(0, 'Set Offer Duration'),
  asset_amount: z.number().gt(0, 'Amount should be greater than 0'),
  use_exchange_account: z.boolean(),
  contract_expiry: z.number().gt(0, 'Set Expiry Date'),
});

export type OptionContractInitArgsInput = z.infer<
  typeof OptionContractInitArgsSchemeInput
>;

export const formatDateTimeInput = (timestamp: bigint): string => {
  console.log('TimeStamp from  formatDateTimeInput', timestamp);
  const date = new Date(Number(timestamp));

  // Adjust date to UTC for date input
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  console.log(
    `Formatted DateTime: ${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
  );

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

export const formatDateInput = (timestamp: any) => {
  const date = new Date(Number(timestamp));
  // Adjust date to UTC for date input
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  // console.log(`Formatted Date${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};

export const parseDateInput = (dateString: string) => {
  // Parse the date as UTC
  const date = new Date(`${dateString}`);
  // console.log('Parse Date', date);
  return date.getTime();
};

export default function IssueContractForm() {
  const [openConfirm, setConfirm] = useState<boolean | undefined>(undefined);
  const [formData, setFormData] = useState<
    OptionContractInitArgsInput | undefined
  >(undefined);

  const router = useRouter();

  const handleAmountChange = (value: string) => {
    const numbers = Number(value);
    return numbers;
  };

  // const formatDateTimeInput = (timestamp: number) => {
  //   try {

  //     const date = new Date(Number(timestamp));
  //     return date.toISOString().slice(0, 16);
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  // const parseDateTimeInput = (dateTimeString: string) => {
  //   try {
  //     return Date.parse(dateTimeString);

  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  // const handleDateTimeChange = (value: string) => {

  //   console.log("DateTimeValue", value)
  //   const date = new Date(value);

  //   const milliseconds = date.getTime()// * 1000000;
  //   console.log("DateTimeValue milliseconds", milliseconds)

  //   return milliseconds;
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OptionContractInitArgsInput>({
    resolver: zodResolver(OptionContractInitArgsSchemeInput),
    defaultValues: {
      asset: { CKBTC: null },
      strike_price: 0,
      options_type: { CALL: null },
      contract_state: { OFFER: null },
      offer_duration: 0, // Date.now(),
      asset_amount: 0.0,
      use_exchange_account: false,
      contract_expiry: 0, //Date.now() + 30 * 60 * 1_000_000,
    },
  });

  const onSubmit = (data: OptionContractInitArgsInput) => {
    setConfirm(false);
 
    setFormData(data);

    console.log('data', data);
  };

  if (openConfirm == false && formData) {
    return (
      <>
        <IssueContractConfirm setConfirm={setConfirm} formData={formData} />
      </>
    );
  }

  if (openConfirm == true) {
    router.back();
  }

  return (
    <Box className="bg-transparent shadow z-10 text-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg font-sans font-thin"
      >
        <Box className="flex flex-col gap-4 lg:gap-2 p-5">
          <Box className="flex flex-wrap -mx-3 mb-4">
            <Box className="w-full md:w-1/2 px-3">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Select Option
              </label>
              <Box className="relative">
                <Controller
                  name="options_type"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      {...field}
                      value={Object.keys(field.value)[0] || ''} // Extract key of the object for value
                      onChange={e => {
                        const selectedValue = e.target.value;
                        const newValue = selectedValue
                          ? { [selectedValue]: null }
                          : {};
                        field.onChange(newValue);
                      }}
                    >
                      <option value="" disabled>
                        Select Options Type
                      </option>
                      <option value="CALL">CALL</option>
                      <option value="PUT">PUT</option>
                    </select>
                  )}
                />
                {errors.options_type && (
                  <span>{errors.options_type.message}</span>
                )}

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
                <Controller
                  name="asset"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      {...field}
                      value={Object.keys(field.value)[0] || ''} // Extract key of the object for value
                      onChange={e => {
                        const selectedValue = e.target.value;
                        const newValue = selectedValue
                          ? { [selectedValue]: null }
                          : {};
                        field.onChange(newValue);
                      }}
                    >
                      <option value="" disabled>
                        Select Options Asset
                      </option>
                      <option value="CKBTC">CKBTC</option>
                      <option value="CKETH">CKETH</option>
                      {/* <option value="ICP">TESTICP</option>
                      <option value="CKBTC">CKTEST_BTC</option>
                      <option value="CKETH">CKSEPOLIA_ETH</option> */}
                    </select>
                  )}
                />
                {errors.asset && <span>{errors.asset.message}</span>}

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

              <Controller
                name="asset_amount"
                control={control}
                render={({ field }) => (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    value={field.value} // Ensure it's a number
                    onChange={e =>
                      field.onChange(handleAmountChange(e.target.value))
                    }
                  />
                )}
              />
              {errors.asset_amount && (
                <span>{errors.asset_amount.message}</span>
              )}
            </Box>

            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contract State
              </label>
              <Box className="relative">
                <input
                  disabled
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="OFFER"
                />

                {errors.contract_state && (
                  <span>{errors.contract_state.message}</span>
                )}
              </Box>
            </Box>

            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Strike Price
              </label>

              <Controller
                name="strike_price"
                control={control}
                render={({ field }) => (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    value={field.value} // Ensure it's a number
                    onChange={e =>
                      field.onChange(handleAmountChange(e.target.value))
                    }
                  />
                )}
              />
              {errors.strike_price && (
                <span>{errors.strike_price.message}</span>
              )}
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Offer Duration
              </label>

              <Controller
                name="offer_duration"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    // value={formatDateInput(
                    //   field.value ?? Date.now().toLocaleString()
                    //   // field.value.toString() === '0'
                    //   //   ? Date.now().toString()
                    //   //   : field.value.toString()
                    // )}
                    name={field.name}
                    onChange={e =>
                      field.onChange(parseDateInput(e.target.value))
                    }
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Target Expiry"
                  />
                )}
              />
              {errors.offer_duration && (
                <span>{errors.offer_duration.message}</span>
              )}
            </Box>

            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Contract Expiry
              </label>

              <Controller
                name="contract_expiry"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    // value={formatDateInput(
                    //   field.value ?? Date.now().toLocaleString()
                    //   // field.value.toString() === '0'
                    //   //   ? Date.now().toString()
                    //   //   : field.value.toString()
                    // )}
                    name={field.name}
                    onChange={e =>
                      field.onChange(parseDateInput(e.target.value))
                    }
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Target Expiry"
                  />
                )}
              />
              {errors.contract_expiry && (
                <span>{errors.contract_expiry.message}</span>
              )}
            </Box>
          </Box>

          <Box className="flex justify-center gap-x-4">
            <Box className="">
              <Button
                className="flex items-center gap-2 bg-purple-500 border-transparent   border-[3px] 
                           transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white  
                           dark:shadow-[5px_5px_0px_#7888ff]  hover:bg-purple-400  active:shadow-none
                           active:translate-x-[5px] active:translate-y-[5px]"
                type="submit"
              >
                Sell Contract
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
