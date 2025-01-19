import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Options } from '@/declarations/options/options.did';
import { useGetCurrentPremiumForOptions } from '@/lib/hooks/canisters/options/get-current-premium';
import { useGetoptions } from '@/lib/hooks/canisters/options/get-options';
import { convertXrcToStrikePrice } from '@/lib/utils/convert-inputs';
import { ViewOptionsContractData } from './view-contract';

interface ViewOptionsContractProps {
  optionsId: bigint;
}

export function ViewOptionsContract({ optionsId }: ViewOptionsContractProps) {
  const [option, setOption] = useState<Options | undefined>(undefined);

  const router = useRouter();
  const [getOptions, loadingGetOptionsApi] = useGetoptions();
  const [getCurrentPremium, currPremium] = useGetCurrentPremiumForOptions();

  const [simpleToast] = useSimpleToast();

  useEffect(() => {
    const get = async () => {
      let res = await getOptions(optionsId);
      res &&
        (await getCurrentPremium(
          BigInt(convertXrcToStrikePrice(res.strike_price)),
          res.options_type,
          res.contract_expiry,
          res.asset
        ));

      if (!res || res == undefined) {
        simpleToast({
          title: 'Error',
          description: JSON.stringify(`No Option with Id ${optionsId} Found`),
          status: ToastStatus.error,
        });

        router.back();
      }

      setOption(res);
    };

    if (option == undefined) {
      get();
    }
  }, []);
  return (
    <>
      <Box className="mx-auto flex flex-col items-center mt-4 lg:mt-10   ">
        <ViewOptionsContractData
          option={option}
          isLoading={loadingGetOptionsApi}
          optionsId={optionsId}
        />
      </Box>
    </>
  );
}
