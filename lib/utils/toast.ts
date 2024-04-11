export const showToast = (
    toast: any,
    title: string,
    description: string,
    status: string,
    position: string
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: position,
    });
  };