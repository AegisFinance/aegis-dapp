import { CkETHMinterCanister, RetrieveEthRequest } from '@dfinity/cketh';
import {
  CKBTC_LEDGER_PRINCIPAL,
  CKSEPOLIA_LEDGER_PRINCIPAL,
  CKSEPOLIA_MINTER_PRINCIPAL,
} from '../constants/canisters';
import { parseEther } from 'viem';
import { IcrcLedgerCanister } from '@dfinity/ledger-icrc';
import { CANISTER_IDS_MAP, CANISTERS_NAME } from '../utils';
import { humanToE8s } from './utils';
import { createAgent } from '../auth';
import { Provider } from '../auth/interface';

export async function withdrawckEth(
  ethAddress: string,
  amount: string,
  provider: Provider
): Promise<bigint> {
  const { withdrawEth } = CkETHMinterCanister.create({
    agent: await createAgent(provider!),
    canisterId: CKSEPOLIA_MINTER_PRINCIPAL,
  });
  const result: RetrieveEthRequest = await withdrawEth({
    address: ethAddress,
    amount: parseEther(amount),
  });
  return result.block_index;
}

export async function approveCkEth(amount: string, provider: Provider): Promise<bigint> {
  console.log('🚀 ~ approveCkEth ~ amount:', parseEther(amount));
  const { approve } = IcrcLedgerCanister.create({
    agent: await createAgent(provider!),
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
  return approveResult;
}

export async function approveCkBtc(amount: number, provider: Provider) {
  console.log('🚀 ~ approveCkBtc ~ amount:', amount);

  const { approve } = IcrcLedgerCanister.create({
    agent: await createAgent(provider!),
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
