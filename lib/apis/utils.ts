import { Principal } from "@dfinity/principal";

export async function convertPrincipalToEthAddress(
  principal: Principal
): Promise<string> {
  return await "0x1d0186e12248ea2deae7af519e347d5c219aa86f3789fdd55bfd7aa6d4020000";
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

    const ellipsis = "...";
    const leftPart = str!.slice(0, 7);
    const rightPart = str!.slice(-6); // Get the last `midpoint` characters
    return leftPart + ellipsis + rightPart;
  } catch (error) {
    console.log(error);
  }
}

