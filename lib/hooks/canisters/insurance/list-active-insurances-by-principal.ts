import { InsuranceBuyersKey } from '@/declarations/insurance/insurance.did';
import {
  getActiveBuyInsuranceListByPrincipal,
  getActiveSellInsuranceListByPrincipal,
} from '@/lib/apis/canisters/insurance/list-active-insurances-by-principal';
import {
  ProviderAtom,
  insuranceActiveBuyListKeyAtom,
  insuranceActiveSellListKeyAtom,
} from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { ToastStatus } from '../../utils/toast/interface';
import { useSimpleToast } from '../../utils/toast/toast';

export function useListActiveBuyInsuranceListByPrincipal(): [
  () => Promise<void>,
  boolean,
  InsuranceBuyersKey[] | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(insuranceActiveBuyListKeyAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const activeBuyListByPrincipal = async (): Promise<void> => {
    setLoading(true);

    try {
      let res = await getActiveBuyInsuranceListByPrincipal(provider!);
      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');
      setList(res);
      setLoading(false);
    } catch (err: unknown) {
      console.log(': ----------');
      console.log(': err', err);
      console.log(': ----------');
      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });
      setLoading(false);
      return;
    }
  };

  return [activeBuyListByPrincipal, isLoading, list] as const;
}

///
///
///
///

export function useListActiveSellInsuranceListByPrincipal(): [
  () => Promise<void>,
  boolean,
  InsuranceBuyersKey[] | undefined,
] {
  const [provider] = useAtom(ProviderAtom);
  const [list, setList] = useAtom(insuranceActiveSellListKeyAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [simpleToast] = useSimpleToast();

  const activeSellListByPrincipal = async (): Promise<void> => {
    setLoading(true);

    try {
      let res = await getActiveSellInsuranceListByPrincipal(provider!);
      console.log(': ----------');
      console.log(': res', res);
      console.log(': ----------');
      setList(res);
      setLoading(false);
    } catch (err: unknown) {
      console.log(': ----------');
      console.log(': err', err);
      console.log(': ----------');
      simpleToast({
        title: 'Error',
        description: JSON.stringify(err),
        status: ToastStatus.error,
      });
      setLoading(false);
      return;
    }
  };

  return [activeSellListByPrincipal, isLoading, list] as const;
}
