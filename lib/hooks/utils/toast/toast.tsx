'use client';

import { Box, Flex, Spacer, useToast } from '@chakra-ui/react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { SimpleToastProps, ToastStatus } from './interface';

export function useSimpleToast() {
  const toast = useToast();

  const simpleToast = ({
    title,
    description,
    status = ToastStatus.success,
    position = 'top-right',
  }: SimpleToastProps) => {
    toast({
      status,
      title,
      description,
      position,
      isClosable: true,
      duration: 5000,
      render: () => (
        <Flex
          minWidth="max-content"
          alignItems="center"
          gap="2"
          className={`m-10 bg-white shadow-xl border-transparent border-2
            `}
        >
          <Box p="2">
            <Box className=" font-thin font-serif ">
              {status == 'error'
                ? 'Error Occured'
                : description
                  ? ''
                  : 'Success'}
            </Box>
            <Box className="">
              {description && description?.length > 3 ? description : ''}
            </Box>
          </Box>
          <Spacer />
          {status == 'success' ? (
            <IoIosCheckmarkCircleOutline size={32} color={'green'} />
          ) : (
            <MdOutlineCancel size={32} color={'red'} />
          )}
        </Flex>
      ),
    });
  };
  return [simpleToast] as const;
}
