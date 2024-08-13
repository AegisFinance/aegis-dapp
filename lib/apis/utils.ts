import { StakeIcrcRes } from '@/declarations/main/main.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { number } from 'zod';
import { createCanisterActor } from '../services/create_actor';
import { CANISTERS_NAME } from '../utils';
import { _MAIN } from '../utils/helper_contract';
import { Provider } from '../auth/interface';

export async function convertPrincipalToEthAddress(
  principal: Principal
): Promise<string> {
  return await '0x1d0186e12248ea2deae7af519e347d5c219aa86f3789fdd55bfd7aa6d4020000';
}
const baseOfEight = 100000000;

const baseOfTwelve = 1000000000000;

// Convert to BigInt e8s format to human readable
export const e8sToHuman = (bigIntValue: any) => {
  try {
    const value = Number(bigIntValue) / baseOfEight;
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert to BigInt e12s format to human readable
export const e12sToHuman = (bigIntValue: any) => {
  try {
    const value = Number(bigIntValue) / baseOfTwelve;
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert human readable number to e8s format in BigInt
export const humanToE8s = (numberValue: number) => {
  try {
    const value = BigInt(numberValue * baseOfEight);
    return value;
  } catch (error) {
    console.log(error);
  }
};

// Convert human readable number to e12s format in BigInt
export const humanToE12s = (numberValue: number) => {
  try {
    const value = BigInt(numberValue * baseOfTwelve);
    return value;
  } catch (error) {
    console.log(error);
  }
};

export function truncatePrincipal(str?: string, maxLength?: number) {
  try {
    if (str!.length <= maxLength!) {
      return str; // No need to truncate if the string is already within or equal to the desired length
    }

    const ellipsis = '...';
    const leftPart = str!.slice(0, maxLength ?? 7);
    const rightPart = str!.slice(maxLength ? maxLength * -1 : -6); // Get the last `midpoint` characters
    return leftPart + ellipsis + rightPart;
  } catch (error) {
    console.log(error);
  }
}

export function convertMilliSecondsToDateTime(timestamp: bigint): string {
	console.log(": ----------------------");
	console.log(": timestamp", timestamp);
	console.log(": ----------------------");
  const currentTimeInMilliseconds = Number(timestamp);

  // Create a new Date object from the milliseconds
  const dateTimeObject = new Date(currentTimeInMilliseconds);

  // Define your desired format options
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  // Create a DateTimeFormatter object with the desired locale (optional)
  const formatter = new Intl.DateTimeFormat('en-US', formatOptions);

  // Format the Date object
  const formattedDateTime = formatter.format(dateTimeObject);

  console.log('Formatted DateTime:', formattedDateTime);

  return formattedDateTime;
}

export async function convertNumberToSubAccount(
  no: number,
  provider: Provider
): Promise<Uint8Array | number[]> {
  let mainActor: ActorSubclass<_MAIN> = (await createCanisterActor(
    CANISTERS_NAME.MAIN,
    provider
  )) as ActorSubclass<_MAIN>;

  return await mainActor.convert_u32_to_subaccount(no);
}
