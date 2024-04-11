import React, { ReactNode } from "react";
import { Footer, Header } from "@/components/index";
import { Box } from "@chakra-ui/react";

interface HomeProps {
  children: ReactNode;
  signOut(): void;
}

function Home({ children, signOut }: HomeProps) {
  return (
    <>
      <Box className="cotainer">
        <Header signOut={signOut} />

        <main className="main">{children} </main>
      </Box>
    </>
  );
}

export default Home;
