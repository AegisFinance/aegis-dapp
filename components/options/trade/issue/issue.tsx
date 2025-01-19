'use client';

import IssueContractForm from '@/components/options/trade/issue/issue-contract-form';
import { Box } from '@chakra-ui/react';
import React from 'react';

function IssueInsuranceContract() {
  return (
    <>
      <Box className="mx-auto flex flex-col items-center mt-4 lg:mt-10   ">
        <IssueContractForm />
      </Box>
    </>
  );
}

export default IssueInsuranceContract;
