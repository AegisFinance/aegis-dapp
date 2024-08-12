import { Box } from '@chakra-ui/react';
import { useGetInsurance } from '@/lib/hooks/canisters/insurance/get-insurance';
import { useEffect, useState } from 'react';
import { Insurance } from '@/declarations/insurance/insurance.did';
import { useSimpleToast } from '@/lib/hooks/utils/toast/toast';
import { ToastStatus } from '@/lib/hooks/utils/toast/interface';
import { useRouter } from 'next/navigation';
import { SellInsuranceContractForm } from './sell-contract-form';

interface SellInsuranceContractProps {
  insuranceId: number;
}

export function SellInsuranceContract({
  insuranceId,
}: SellInsuranceContractProps) {
  const [insurance, setInsurance] = useState<Insurance | undefined>(undefined);

  const router = useRouter();
  const [getInsurance, loadingGetInsuranceApi] = useGetInsurance();
  const [simpleToast] = useSimpleToast();

  useEffect(() => {
    const get = async () => {
      let res = await getInsurance(insuranceId);
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
        <SellInsuranceContractForm
          insurance={insurance}
          isLoading={loadingGetInsuranceApi}
          insuranceId={insuranceId}
        />
      </Box>
    </>
  );
}
