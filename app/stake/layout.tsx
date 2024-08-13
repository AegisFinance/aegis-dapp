'use client';

import StakeNav from '@/components/stake/stake-nav';
import { Box } from '@chakra-ui/react';
import React from 'react';

function StakeRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col ">
        <StakeNav />
        <Box className=" flex-1 overflow-y-auto   ">
          {children}
        </Box>
      </main>
    </>
  );
}

export default StakeRootLayout;
