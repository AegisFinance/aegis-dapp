"use client";
import { Box } from "@chakra-ui/react";
import React from "react";

function InsuranceTradeRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen ">
        <Box className=" flex-1 overflow-y-auto    ">
          {children}
        </Box>
      </main>
    </>
  );
}

export default InsuranceTradeRootLayout;
