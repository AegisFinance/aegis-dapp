'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';

function OptionsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen ">
        <Box className=" flex-1 overflow-y-auto border-2 border-blue-700   ">
          {children}
        </Box>
      </main>
    </>
  );
}

export default OptionsRootLayout;
