import {
  IcrcAsset,
  StakeIcrcArgs,
  UnStakeIcrcArgs,
} from '@/declarations/main/main.did';
import { humanToE8s } from '@/lib/apis/utils';
import { useStakeIcrcTokens } from '@/lib/hooks/canisters/main/stake/stake-icrc-tokens';
import { useUnStakeIcrcTokens } from '@/lib/hooks/canisters/main/stake/unstake-icrc-tokens';
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ButtonShared } from '../shared/button';
import { useIcrcApprove } from '@/lib/hooks/ledgers/icrc/approve';
import { CANISTER_IDS_MAP, CANISTERS_NAME } from '@/lib/utils';
import { MAIN_PRINCIPAL } from '@/lib/constants/canisters';
import { useUnStakeIcrcTokensManual } from '@/lib/hooks/canisters/main/stake/unstake-icrc-tokens-manual';

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
      amount: humanToE8s(stakeAmount!)!,
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
      <Box className="grid gap-4 grid-col-1 grid-row-3 items-center  ">
        <Box className="grid grid-rows-2 grid-cols-1 items-center text-center gap-4">
          <NumberInput>
            <NumberInputField
              onChange={handleInputChange}
              value={stakeAmount}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <ButtonShared
            className="font-light dark:bg-white  dark:text-black border-transparent font-sans"
            isLoading={loadingStakeIcrcApi || loadingGetApproveApi}
            onClick={stakeIcrcAsset}
          >
            Stake AEGIS
          </ButtonShared>
          <ButtonShared
            className="font-light dark:bg-white  dark:text-black border-transparent font-sans"
            isLoading={loadingUnStakeIcrcApi}
            onClick={unStakeIcrcAsset}
          >
            UnStake AEGIS
          </ButtonShared>
          <ButtonShared
            className="font-thin dark:bg-white  dark:text-black border-transparent font-sans"
            isLoading={loadingUnStakeIcrcManualApi}
            onClick={unStakeIcrcAssetManual}
          >
            Check Status
          </ButtonShared>
        </Box>
      </Box>
    </>
  );
}
