'use client';

import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';

const OptionsNav = dynamic(() => import('@/components/options/options-nav'), {
  ssr: false,
});

function OptionsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen ">
        <OptionsNav />

        <Box className=" flex-1 overflow-y-auto   ">{children}</Box>
      </main>
    </>
  );
}

export default OptionsRootLayout;
