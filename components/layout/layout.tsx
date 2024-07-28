/* eslint-disable react-hooks/exhaustive-deps */
import { isAuthenticatedAtom } from "@/lib/states/jotai";
import HeroSection from "./hero-section";
import { useSignOut } from "@/lib/hooks/auth/signout";
import { Spinners, Home } from "@/components/index";
import { useAtom } from "jotai";
import { useState } from "react";
import { useSignIn } from "@/lib/hooks/auth/signin";
import { Provider } from "@/lib/auth/interface";

const Layout = (children: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);

  const [isSiginLoading, setSiginLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [clearStates] = useSignOut();
  const [signInWith] = useSignIn();

  const signInWallet = async (provider: Provider) => {
    setSiginLoading(true);

    let res = await signInWith(provider);
    console.log("🚀 ~ signInWallet ~ res:", res);

    setAuthenticated(res);

    setSiginLoading(false);
  };

  const singOutWallet = async () => {
    console.log("Signing Out......");

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    clearStates();
    setLoading(false);
  };

  if (loading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      {isAuthenticated ? (
        <Home {...children} signOut={singOutWallet} />
      ) : (
        <HeroSection signIn={signInWallet} isSiginLoading={isSiginLoading} />
      )}
    </>
  );
};

export default Layout;
