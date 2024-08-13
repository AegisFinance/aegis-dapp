import {
  InsuranceContractInitArgs
} from '@/declarations/insurance/insurance.did';
import { issueInsuranceContract } from '@/lib/apis/canisters/insurance/issue-insurance';
import { isAuthenticatedAtom, ProviderAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useIssueInsuranceContract(): [
  (args: InsuranceContractInitArgs) => Promise<void>,
  boolean,
] {
  const [isAuth, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [provider] = useAtom(ProviderAtom);

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [simpleToast] = useSimpleToast();

  const issueContractApi = async (args: InsuranceContractInitArgs) => {
    setLoading(true);

    try {
      let res = await issueInsuranceContract(args, provider!);
      console.log(': ------------------------------');
      console.log(': issueContractApi -> res', res);
      console.log(': ------------------------------');

      if ('Ok' in res) {
        setMessage(`Insurance Created: ${res.Ok}`);
        simpleToast({
          title: 'Insurance Created',
          description: `${res.Ok}`,
          status: ToastStatus.success,
        });
      } else {
        setError(res.Err);
        simpleToast({
          title: 'Error',
          description: res.Err,
          status: ToastStatus.error,
        });
        setLoading(false);
      }
    } catch (err: unknown) {
      console.log(': ------------------------------');
      console.log(': issueContractApi -> err', err);
      console.log(': ------------------------------');
      setError(JSON.stringify(err) || ' error');

      simpleToast({
        title: 'Error',
        description: error,
        status: ToastStatus.error,
      });
      setLoading(false);
    }
  };

  return [issueContractApi, isLoading] as const;
}
