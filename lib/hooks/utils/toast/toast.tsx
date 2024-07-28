"use client";

import { useToast } from "@chakra-ui/react";
import { SimpleToastProps, ToastStatus } from "./interface";

 

export function useSimpleToast() {
  const toast = useToast();

  const simpleToast = ({
    title,
    description,
    status = ToastStatus.success,
    position = "top-right",
  }: SimpleToastProps) => {
    toast({
      status,
      title,
      description,
      position,
      isClosable: true,
      duration: 5000,
    });
  };
  return [simpleToast] as const;
}
