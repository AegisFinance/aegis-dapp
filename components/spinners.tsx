import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react';

export function Spinners({ size }: any) {
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

export function SpinnerDoubleBorder() {
  return (
    <div>
      <div className="w-16 h-16 border-4 border-red-400 border-double rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
