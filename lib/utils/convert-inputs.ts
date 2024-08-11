 import { InsuranceAssets } from '@/declarations/insurance/insurance.did';
import { formatEther, parseEther } from 'viem';

const baseOfEight = 100000000;

export function convertInsuranceAmountToBigInt(
  amount: number,
  asset: InsuranceAssets
): bigint {
  console.log(': ----------------');
  console.log(': amount', amount);
  console.log(': ----------------');

  switch (true) {
    case 'CKETH' in asset:
      const parsedAmount = humanToE18s(amount)!;
      console.log(parsedAmount);
      return parsedAmount;
    default:
      let humanToE8sRes = humanToE8s(amount)!;
      console.log(': ----------');
      console.log(': humanToE8sRes', humanToE8sRes);
      console.log(': ----------');
      return humanToE8sRes;
  }
}

export function convertBigIntToInsuranceAmount(
  amount: bigint,
  asset: InsuranceAssets
) {
  console.log(': --------------');
  console.log(': asset', asset);
  console.log(': --------------');

  switch (true) {
    case 'CKETH' in asset:
       return e18sToHuman(amount);

    default:
      return e8sToHuman(amount);
  }
}

/// Convert the Human number into Ether small unit wei(Bigint)
export const humanToE18s = (amount: number) => {
  try {
    let value = parseEther(amount.toString());
    return value;
  } catch (error) {
    // console.log(error);
  }
};

/// Convert the  Ether small unit wei(Bigint) into Human number
export const e18sToHuman = (amount: bigint) => {
  try {
    let value = formatEther(amount);
    return value;
  } catch (error) {
    // console.log(error);
  }
};

/// Convert human readable number to e8s format in BigInt
export const humanToE8s = (numberValue: number): bigint => {
  try {
    const value = numberValue * baseOfEight;
    const strNum = value.toString();
    const intPart = strNum.split('.')[0];
    return BigInt(intPart);
  } catch (error) {
    console.log(error);
    throw new Error('Unable to convert Number to Bigint');
  }
};

/// Convert to BigInt e8s format to human readable
export const e8sToHuman = (bigIntValue: any) => {
  try {
    const value = Number(bigIntValue) / baseOfEight;
    return value;
  } catch (error) {
    // console.log(error);
  }
};
