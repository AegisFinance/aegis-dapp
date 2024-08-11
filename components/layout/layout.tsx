/* eslint-disable react-hooks/exhaustive-deps */
import { Spinners } from '@/components/spinners';
import { Provider } from '@/lib/auth/interface';
import { useSignIn } from '@/lib/hooks/auth/signin';
import { useSignOut } from '@/lib/hooks/auth/signout';
import { isAuthenticatedAtom } from '@/lib/states/jotai';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HeroComponent from './hero';
import Home from './home/';

const Layout = (children: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);

  const [isSiginLoading, setSiginLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [clearStates] = useSignOut();
  const [signInWith] = useSignIn();

  const signInWallet = async (provider: Provider) => {
    setSiginLoading(true);

    let res = await signInWith(provider);

    setAuthenticated(res);

    setSiginLoading(false);

    router.push('/');
  };

  const singOutWallet = async () => {
    console.log('Signing Out......');

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    clearStates();
    setLoading(false);

    router.push('/');
  };

  if (loading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      {isAuthenticated ? (
        <Home {...children} signOut={singOutWallet} />
      ) : (
        <HeroComponent
          signIn={signInWallet}
          isSiginLoading={isSiginLoading}
          className=""
        />
      )}
    </>
  );
};

export default Layout;
