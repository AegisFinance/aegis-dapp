import { InsuranceAssets } from '@/declarations/insurance/insurance.did';
import {
  OptionsAssets,
  OptionsAssetsByNames,
  OptionsAssetsIcrc,
} from '@/declarations/options/options.did';
import { formatEther, parseEther } from 'viem';

const baseOfEight = 100000000;
export const BASE_OF_XRC = 1_000_000_000;

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

export function convertOptionsAmountToBigInt(
  amount: number,
  asset: OptionsAssetsIcrc
): bigint {
  console.log(': ----------------');
  console.log(': amount', amount);
  console.log(': ----------------');

  console.log(': --------------');
  console.log(': asset', asset);
  console.log(': --------------');
  if ('CKBTC' in asset) {
    return humanToE8s(amount);
  } else if ('CKETH' in asset) {
    return humanToE18s(amount)!;
  } else if ('CKUSDT' in asset) {
    return humanToE18s(amount)!;
  } else {
    throw new Error(`Asset ${JSON.stringify(asset)} Not Found`);
  }
}
export function convertBigIntToOptionsAmount(
  amount: bigint,
  asset: OptionsAssetsByNames
): number {
  console.log(': ----------------');
  console.log(': amount', amount);
  console.log(': ----------------');

  if ('CKBTC' in asset || 'ICP' in asset) {
    // Use e8sToHuman for CKBTC and ICP
    const humanReadableAmount = e8sToHuman(amount);
    if (humanReadableAmount === null) {
      throw new Error('Failed to parse amount for e8sToHuman.');
    }
    console.log(': Using e8sToHuman:', humanReadableAmount);
    return humanReadableAmount!;
  } else {
    // Use e18sToHuman for other assets
    const parsedAmount = e18sToHuman(amount);
    if (parsedAmount === null) {
      throw new Error('Failed to parse amount for e18sToHuman.');
    }
    console.log(': Using e18sToHuman:', parsedAmount);
    return parseFloat(parsedAmount!);
  }
}

export function convertStrikePriceToXrc(strikePrice: number): bigint {
  return BigInt(strikePrice * BASE_OF_XRC);
}

export function convertXrcToStrikePrice(xrc: bigint): number {
  return Number(xrc / BigInt(BASE_OF_XRC));
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
