/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect } from "react";
import { Header } from "@/components/index";
import { Box } from "@chakra-ui/react";
import { useCheckAuthentication } from "@/lib/hooks/auth/check_athentication";

interface HomeProps {
  children: ReactNode;
  signOut(): void;
}

function Home({ children, signOut }: HomeProps) {
  const [checkAuth] = useCheckAuthentication();
  useEffect(() => {
    checkAuth().then((res) => {
      console.log("Authentication From Home Valid: ", res);
    });
  });
  return (
    <>
      <Box className="cotainer  ">
        <Header signOut={signOut} />
        Welcome Home
        <main className="main">{children} </main>
      </Box>
    </>
  );
}

export default Home;
