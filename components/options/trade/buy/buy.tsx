import { Insurance } from '@/declarations/insurance/insurance.did';
import { useGetCurrentPremiumByInsuranceId } from '@/lib/hooks/canisters/insurance/get-current-premium';
import { useGetInsurance } from '@/lib/hooks/canisters/insurance/get-insurance';
import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BuyOptionsContractForm } from './buy-contract-form';
import { Options } from '@/declarations/options/options.did';
import { useGetoptions } from '@/lib/hooks/canisters/options/get-options';
import { getCurrentPremiumForOptions } from '@/lib/apis/canisters/options/get-current-premium';
import { useGetCurrentPremiumForOptions } from '@/lib/hooks/canisters/options/get-current-premium';
import { convertXrcToStrikePrice } from '@/lib/utils/convert-inputs';

interface BuyOptionsContractProps {
  optionsId: bigint;
}

export function BuyOptionsContract({ optionsId }: BuyOptionsContractProps) {
  const [options, setOptions] = useState<Options | undefined>(undefined);

  const router = useRouter();
  const [getOption, loadingGetOptionsApi] = useGetoptions();
  const [getCurrentPremium, currPremium] = useGetCurrentPremiumForOptions();
  const [simpleToast] = useSimpleToast();

  useEffect(() => {
    const get = async () => {
      let option = await getOption(optionsId);

      if (!option || option == undefined) {
        simpleToast({
          title: 'Error',
          description: JSON.stringify(
            `No Insurance with Id ${optionsId} Found`
          ),
          status: ToastStatus.error,
        });

        router.back();
      } else {
        let strike_price = BigInt(convertXrcToStrikePrice(option.strike_price));
        console.log(': -----------------------------------');
        console.log(': get -> strike_price', strike_price);
        console.log(': -----------------------------------');
        await getCurrentPremium(
          strike_price,
          option.options_type,
          option.contract_expiry,
          option.asset
        );
      }

      setOptions(option);
    };

    if (options == undefined) {
      get();
    }
  }, []);
  return (
    <>
      <Box className="mx-auto flex flex-col items-center mt-4 lg:mt-10   ">
        <BuyOptionsContractForm
          optionsId={optionsId}
          options={options}
          currentPremium={currPremium}
          isLoading={loadingGetOptionsApi}
        />
      </Box>
    </>
  );
}
