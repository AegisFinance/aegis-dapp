'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Feedback() {
  const router = useRouter();
  useEffect(() => {
    router.push(
      'https://docs.google.com/forms/d/e/1FAIpQLSeQw9yXTHPwBZi7nLd_Aar88Ck0VylBROrKhvMlyQUYFcSnHQ/viewform?usp=sf_link'
    );
  });
  return (
    <>
      <Box></Box>
    </>
  );
}
