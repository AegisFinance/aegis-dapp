import { isAuthenticatedAtom, sessionTimeoutAtom } from "@/lib/states/jotai";
import HeroSection from "./hero-section";
import { checkTimeOutExpiry } from "@/lib/utils";
import { useSignOut } from "@/lib/apis/signout";
import { Spinners, Home } from "@/components/index";
import { useAtom } from "jotai";
import { useState } from "react";

const Layout = (children: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [sessionTimeOut, setSessionTimeOut] = useAtom(sessionTimeoutAtom);
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const [clearStates] = useSignOut();

  const singOutWallet = async () => {
    console.log("Signing Out......");

    setSigningOut(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    clearStates();
    setSigningOut(false);
  };

  if (signingOut) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      {isAuthenticated && !checkTimeOutExpiry(sessionTimeOut!) ? (
        <Home {...children} signOut={singOutWallet} />
      ) : (
        <HeroSection />
      )}
    </>
  );
};

export default Layout;
