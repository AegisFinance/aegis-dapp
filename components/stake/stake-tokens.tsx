import {
  IcrcAsset,
  StakeIcrcArgs,
  UnStakeIcrcArgs,
} from '@/declarations/main/main.did';
import { humanToE8s } from '@/lib/apis/utils';
import { MAIN_PRINCIPAL } from '@/lib/constants/canisters';
import { useStakeIcrcTokens } from '@/lib/hooks/canisters/main/stake/stake-icrc-tokens';
import { useUnStakeIcrcTokens } from '@/lib/hooks/canisters/main/stake/unstake-icrc-tokens';
import { useUnStakeIcrcTokensManual } from '@/lib/hooks/canisters/main/stake/unstake-icrc-tokens-manual';
import { useIcrcApprove } from '@/lib/hooks/ledgers/icrc/approve';
import { CANISTERS_NAME } from '@/lib/utils';
import {
  Box,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ButtonShared } from '../shared/button';
import { IoReload } from 'react-icons/io5';

export default function StakeTokens() {
  const [stakeAmount, setStakeAmount] = useState<number | undefined>(undefined);

  const [stakeIcrcTokensApi, loadingStakeIcrcApi] = useStakeIcrcTokens();
  const [unStakeIcrcTokensApi, loadingUnStakeIcrcApi] = useUnStakeIcrcTokens();
  const [unStakeIcrcTokensManualApi, loadingUnStakeIcrcManualApi] =
    useUnStakeIcrcTokensManual();

  const [approve, loadingGetApproveApi] = useIcrcApprove();

  const handleInputChange = (event: any) => {
    try {
      let amount = event.target.value;
      console.log(': -------------------------------------');
      console.log(': handleInputChange -> amount', amount);
      console.log(': -------------------------------------');
      setStakeAmount(parseFloat(amount));
    } catch (error) {
      console.log(': -----------------------------------');
      console.log(': handleInputChange -> error', error);
      console.log(': -----------------------------------');
    }
  };

  const stakeIcrcAsset = async () => {
    let asset: IcrcAsset = { AEGIS: null };

    let args: StakeIcrcArgs = {
      amount: humanToE8s(stakeAmount!)!,
      use_account: false,
    };

    if (
      await approve(CANISTERS_NAME.AEGIS_LEDGER, {
        amount: humanToE8s(stakeAmount!)! * 2n,
        spender: {
          owner: MAIN_PRINCIPAL,
          subaccount: [],
        },
      })
    ) {
      await stakeIcrcTokensApi(asset, args);
    }
  };

  const unStakeIcrcAsset = async () => {
    let asset: IcrcAsset = { AEGIS: null };

    let args: UnStakeIcrcArgs = {
      amount: humanToE8s(1)!,
      to_account: false,
    };
    await unStakeIcrcTokensApi(asset, args);
  };

  const unStakeIcrcAssetManual = async () => {
    let asset: IcrcAsset = { AEGIS: null };

    await unStakeIcrcTokensManualApi(asset);
  };
  return (
    <>
      <Box className="grid gap-4 grid-col-1 grid-row-2 items-center  ">
        <NumberInput>
          <NumberInputField onChange={handleInputChange} value={stakeAmount} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Box className="grid grid-rows-1 grid-cols-3 items-center text-center gap-4">
          <Button
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
             transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
               shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            isLoading={loadingStakeIcrcApi || loadingGetApproveApi}
            onClick={stakeIcrcAsset}
          >
            Stake
          </Button>
          <Button
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
             transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
               shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            isLoading={loadingUnStakeIcrcManualApi}
            onClick={unStakeIcrcAssetManual}
          >
            Status &nbsp;
            <IoReload />
          </Button>
          <Button
            className=" font-serif border-black dark:border-lavender-blue-400 border-[3px] 
             transition-all rounded-sm py-1 px-4 my-2 font-semibold text-black bg-lavender-blue-400 
               shadow-[5px_5px_0px_rgba(0,0,0,1)]   ${
                dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 
                active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            isLoading={loadingUnStakeIcrcApi}
            onClick={unStakeIcrcAsset}
          >
            Unstake
          </Button>
        </Box>
      </Box>
    </>
  );
}
