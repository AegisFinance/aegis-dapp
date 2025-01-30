import { InsuranceContractInitArgs } from '@/declarations/insurance/insurance.did';
import { Box, Input } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import IssueContractConfirm from './issue-contract-form-confirm';
import { useRouter } from 'next/navigation';

// Define Zod schemas for the types
const insuranceCountrySchema = z.union([
  z.object({ US: z.null() }),
  z.object({ UK: z.null() }),
]);

const InflationBasedInsuranceSchema = z.object({
  country: insuranceCountrySchema, // Adjust according to the Country type
  target_expiry: z.number(),
  inflation_target: z.number().gt(0, 'Should be greater than 0'),
});

const InsuranceCategorySchema = z.object({
  InflationBasedInsurance: InflationBasedInsuranceSchema,
});

const InsuranceAssetsSchema = z.union([
  z.object({ ICP: z.null() }),
  z.object({ CKBTC: z.null() }),
  z.object({ CKETH: z.null() }),
]);

const InsuranceRewardsMultiplierSchema = z.union([
  z.object({ M2X: z.null() }),
  z.object({ M3X: z.null() }),
  z.object({ M4X: z.null() }),
]);

const MinShareAmountSchema = z
  .number()
  .nonnegative()
  .gte(0, 'Share Amount should be greater than 0');

const InsuranceContractInitArgsSchemaInput = z.object({
  multiplier: InsuranceRewardsMultiplierSchema,
  title: z.string().min(5, 'Title should be minimum 5 chars'),
  description: z.string().min(10, 'Title should be minimum 10 chars'),
  min_premium_amount: z
    .number()
    .gt(0, 'Premium Amount should be greater than 0'),
  is_muliple_seller_allowed: z.boolean(),
  expiry_date: z.number(),
  category: InsuranceCategorySchema,
  insurance_asset: InsuranceAssetsSchema,
  amount: z.number().gt(0, 'Amount should be greater than 0'),
  min_share_amount: MinShareAmountSchema,
});

export type InsuranceContractInitArgsInput = z.infer<
  typeof InsuranceContractInitArgsSchemaInput
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
    InsuranceContractInitArgsInput | undefined
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
  } = useForm<InsuranceContractInitArgsInput>({
    resolver: zodResolver(InsuranceContractInitArgsSchemaInput),
    defaultValues: {
      multiplier: { M2X: null },
      title: '',
      min_premium_amount: 0,
      description: '',
      is_muliple_seller_allowed: false,
      expiry_date: Date.now(),
      category: {
        InflationBasedInsurance: {
          country: { US: null },
          target_expiry: 0,
          inflation_target: 0,
        },
      },
      insurance_asset: { CKBTC: null },
      amount: 0,
      min_share_amount: 0,
    },
  });

  const onSubmit = (data: InsuranceContractInitArgsInput) => {
    setConfirm(false);
    // let inputsArgs: InsuranceContractInitArgsInput = {
    //   ...data,
    //   min_share_amount: data.min_share_amount
    //     ? [ (data.min_share_amount)]
    //     : [],
    //   min_premium_amount:  (data.min_premium_amount),
    //   amount: BigInt(data.amount),
    //   expiry_date: BigInt(data.category.InflationBasedInsurance.target_expiry),
    //   category: {
    //     InflationBasedInsurance: {
    //       ...data.category.InflationBasedInsurance,
    //       target_expiry: BigInt(
    //         data.category.InflationBasedInsurance.target_expiry
    //       ),
    //     },
    //   },
    // };

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
    <Box className="bg-transparent shadow z-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg font-sans font-thin"
      >
        <Box className="flex flex-col gap-4 lg:gap-2 p-5">
          <Box className="flex flex-wrap -mx-3 mb-4">
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block    tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    {...field}
                    placeholder="Title"
                  />
                )}
              />
              {errors.title && <span>{errors.title.message}</span>}
            </Box>
            <Box className="w-full md:w-1/2 px-3">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Select Asset
              </label>
              <Box className="relative">
                <Controller
                  name="insurance_asset"
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
                        Select Insurance Asset
                      </option>
                      <option  value="ICP">
                        ICP
                      </option>
                      <option value="CKBTC">CKBTC</option>
                      <option value="CKETH">CKETH</option>
                      {/* <option value="ICP">TESTICP</option>
                      <option value="CKBTC">CKTEST_BTC</option>
                      <option value="CKETH">CKSEPOLIA_ETH</option> */}
                    </select>
                  )}
                />
                {errors.insurance_asset && (
                  <span>{errors.insurance_asset.message}</span>
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
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-6">
            <Box className="w-full px-3">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    {...field}
                    placeholder="Description"
                  />
                )}
              />
              {errors.description && <span>{errors.description.message}</span>}
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Amount
              </label>

              <Controller
                name="amount"
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
              {errors.amount && <span>{errors.amount.message}</span>}
            </Box>
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Premium Amount
              </label>

              <Controller
                name="min_premium_amount"
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
              {errors.min_premium_amount && (
                <span>{errors.min_premium_amount.message}</span>
              )}
            </Box>
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Share Amount
              </label>

              <Controller
                name="min_share_amount"
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
              {errors.min_share_amount && (
                <span>{errors.min_share_amount.message}</span>
              )}
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-3 mb-2 lg:mb-4">
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-4 ">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Multiplier
              </label>
              <Box className="relative">
                <Controller
                  name="multiplier"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      {...field}
                      value={Object.keys(field.value)[0] || ''}
                      onChange={e => field.onChange({ [e.target.value]: null })}
                    >
                      <option value="" disabled>
                        Select Multiplier
                      </option>
                      <option value="M2X">M2X</option>
                      <option value="M3X">M3X</option>
                      <option value="M4X">M4X</option>
                    </select>
                  )}
                />
                {errors.multiplier && <span>{errors.multiplier.message}</span>}

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
            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Category
              </label>
              <Box className="relative">
                <input
                  disabled
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Inflation"
                />

                {errors.category?.InflationBasedInsurance?.country && (
                  <span>
                    {errors.category.InflationBasedInsurance.country.message}
                  </span>
                )}
              </Box>
            </Box>

            <Box className="w-full md:w-1/3 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Country
              </label>
              <Box className="relative">
                <input
                  disabled
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="US"
                />

                {errors.category?.InflationBasedInsurance?.country && (
                  <span>
                    {errors.category.InflationBasedInsurance.country.message}
                  </span>
                )}
              </Box>
            </Box>
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Expiry Date
              </label>

              <Controller
                name="category.InflationBasedInsurance.target_expiry"
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
              {errors.category?.InflationBasedInsurance?.target_expiry && (
                <span>
                  {
                    errors.category.InflationBasedInsurance.target_expiry
                      .message
                  }
                </span>
              )}
            </Box>
            <Box className="w-full md:w-1/2 px-3 mb-6 md:mb-4">
              <label className="block   tracking-wide text-gray-700 text-xs font-bold mb-2">
                Inflation Target
              </label>

              <Controller
                name="category.InflationBasedInsurance.inflation_target"
                control={control}
                render={({ field }) => (
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    step="0.01"
                    value={field.value}
                    onChange={e =>
                      field.onChange(handleAmountChange(e.target.value))
                    }
                  />
                )}
              />
              {errors.category?.InflationBasedInsurance?.inflation_target && (
                <span>
                  {
                    errors.category.InflationBasedInsurance.inflation_target
                      .message
                  }
                </span>
              )}
            </Box>
          </Box>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <Controller
                name="is_muliple_seller_allowed"
                control={control}
                render={({ field }) => (
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                    disabled={field.disabled}
                  />
                )}
              />
              {errors.is_muliple_seller_allowed && (
                <span>{errors.is_muliple_seller_allowed.message}</span>
              )}

              <span className="text-sm"> Allowed Seller Participation</span>
            </label>
          </div>
          <div className="md:flex  md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
     transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
       shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
        dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
        active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
                type="submit"
              >
                Issue Contract
              </button>
            </div>
          </div>
        </Box>
      </form>
    </Box>
  );
}
