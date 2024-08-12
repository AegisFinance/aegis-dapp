import { Box } from '@chakra-ui/react';
import { BuyInsuranceContractForm } from './buy-contract-form';
import { useGetInsurance } from '@/lib/hooks/canisters/insurance/get-insurance';
import { useEffect, useState } from 'react';
import { Insurance } from '@/declarations/insurance/insurance.did';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useRouter } from 'next/navigation';
import { useGetCurrentPremiumByInsuranceId } from '@/lib/hooks/canisters/insurance/get-current-premium';

interface BuyInsuranceContractProps {
  insuranceId: number;
}

export function BuyInsuranceContract({
  insuranceId,
}: BuyInsuranceContractProps) {
  const [insurance, setInsurance] = useState<Insurance | undefined>(undefined);

  const router = useRouter();
  const [getInsurance, loadingGetInsuranceApi] = useGetInsurance();
  const [getCurrentPremiumByInsuranceId, currPremium] =
    useGetCurrentPremiumByInsuranceId();
  const [simpleToast] = useSimpleToast();

  useEffect(() => {
    const get = async () => {
      let res = await getInsurance(insuranceId);
      await getCurrentPremiumByInsuranceId(insuranceId);

      if (!res[0] || res == undefined) {
        simpleToast({
          title: 'Error',
          description: JSON.stringify(
            `No Insurance with Id ${insuranceId} Found`
          ),
          status: ToastStatus.error,
        });

        router.back();
      }

      setInsurance(res[0]);
    };

    if (insurance == undefined) {
      get();
    }
  }, []);
  return (
    <>
      <Box className="mx-auto flex flex-col items-center mt-4 lg:mt-10   ">
        <BuyInsuranceContractForm
          insuranceId={insuranceId}
          insurance={insurance}
          currentPremium={currPremium}
          isLoading={loadingGetInsuranceApi}
        />
      </Box>
    </>
  );
}
