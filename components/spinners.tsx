import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Spinners({ size }: any) {
  return (
    <>
      <Box minH="100vh">
        <AbsoluteCenter>
          <Spinner size={size} />
        </AbsoluteCenter>
      </Box>
    </>
  );
}

export default Spinners;
