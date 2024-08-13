"use client";

import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const InsuranceNav= dynamic(() => import("@/components/insurance/insurance-nav"), {
  ssr: false,
});

function InsuranceRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen ">
        <InsuranceNav />
        <Box className=" flex-1 overflow-y-auto    ">
          {children}
        </Box>
      </main>
    </>
  );
}

export default InsuranceRootLayout;
