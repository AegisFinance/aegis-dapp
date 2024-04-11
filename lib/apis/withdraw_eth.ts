import { CkETHMinterCanister, RetrieveEthRequest } from "@dfinity/cketh";
import {
  CKBTC_LEDGER_PRINCIPAL,
  CKSEPOLIA_LEDGER_PRINCIPAL,
  CKSEPOLIA_MINTER_PRINCIPAL,
} from "../constants/canisters";
import { getAgent, getLocalAgent } from "../auth";
import { parseEther } from "viem";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { CANISTER_IDS_MAP, CANISTERS_NAME } from "../utils";
import { humanToE8s } from "./utils";

export async function withdrawckEth(
  ethAddress: string,
  amount: string
): Promise<bigint> {
  const { withdrawEth } = CkETHMinterCanister.create({
    agent: await getAgent(),
    canisterId: CKSEPOLIA_MINTER_PRINCIPAL,
  });
  const result: RetrieveEthRequest = await withdrawEth({
    address: ethAddress,
    amount: parseEther(amount),
  });
  return result.block_index;
}

export async function approveCkEth(amount: string) {
  console.log("🚀 ~ approveCkEth ~ amount:", parseEther(amount));
  const { approve } = IcrcLedgerCanister.create({
    agent: await getAgent(),
    canisterId: CKSEPOLIA_LEDGER_PRINCIPAL,
  });

  const approveResult = await approve({
    // expected_allowance: parseEther(amount),
    spender: {
      owner: CKSEPOLIA_MINTER_PRINCIPAL,
      subaccount: [],
    },
    amount: parseEther(amount)!,
  });
  console.log(approveResult);
  return;
}

export async function approveCkBtc(amount: number) {
console.log("🚀 ~ approveCkBtc ~ amount:", amount)

  const { approve } = IcrcLedgerCanister.create({
    agent: await getLocalAgent(),
    canisterId: CKBTC_LEDGER_PRINCIPAL,
  });

  const approveResult = await approve({
    // expected_allowance: parseEther(amount),
    spender: {
      owner: CANISTER_IDS_MAP.get(CANISTERS_NAME.CKBTC_MINTER)!,
      subaccount: [],
    },
    amount: humanToE8s(amount)!,
  });
  console.log(approveResult);
  return;
}
