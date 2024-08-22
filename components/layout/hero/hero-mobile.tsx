import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { HeroComponentProps } from '.';
import { Spinners } from '../../spinners';
import SelectProviderModal from '../select_providers_modal';

/**
 *
 * Disclaimer Component Display to users on every visit
 *
 **/
export default function HeroSectionMobile({
  signIn,
  isSiginLoading,
  className = '',
}: HeroComponentProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <Spinners sizes="xl" />;
  }

  return (
    <>
      {isModalOpen && (
        <SelectProviderModal
          signIn={signIn}
          isModalOpen
          onClose={handleCloseModal}
          isSiginLoading={isSiginLoading}
        />
      )}
      <Box
        className="w-full relative bg-gray-24 h-[812px] overflow-auto text-left 
            text-base text-white font-btn-large-normal  
            flex flex-col items-center min-h-screen mx-auto"
      >
        {/* Background Image */}
        <img
          className="absolute top-[83px] left-[-105px] w-[797.4px] h-[798.4px]"
          alt=""
          src="/line.svg"
        />

        {/* Title */}
        <Box
          className="absolute top-[215px] left-1/2 transform -translate-x-1/2 
      flex flex-col items-center justify-center text-center  font-barlow"
        >
          <Box
            className="relative tracking-[0.04em] leading-[68px] font-semibold
         text-transparent !bg-clip-text [background:linear-gradient(74.31deg,_#85ffc4,_#5cc6ff_45.83%,_#bc85ff_80.73%)]
          [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]
          text-[50px]"
          >
            AegisFinance
          </Box>
          <Box
            className="text-[15px] relative tracking-[0.04em] leading-[30px] 
        font-semibold text-transparent !bg-clip-text [background:linear-gradient(74.31deg,_#85ffc4,_#5cc6ff_45.83%,_#bc85ff_80.73%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          >
            Unlocking financial freedom, block by block.
          </Box>
          <Box
            className="text-[10px] relative tracking-[0.04em] leading-[18px] font-semibold
         text-transparent !bg-clip-text [background:linear-gradient(74.31deg,_#85ffc4,_#5cc6ff_45.83%,_#bc85ff_80.73%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          >
            Trade and grow your crypto with Aegis Finance, the platform
            dedicated to every trader at every level.
          </Box>
        </Box>

        {/* Buttons */}
        <Box className="absolute top-[642px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-6">
          <Button
            onClick={openModal}
            className="w-[279px] rounded-81xl bg-gray-22 flex flex-col items-center justify-center py-3 px-4 box-border"
          >
            <b className="relative leading-[24px] text-transparent !bg-clip-text [background:linear-gradient(74.31deg,_#85ffc4,_#5cc6ff_45.83%,_#bc85ff_80.73%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Login
            </b>
          </Button>
          <Button
            onClick={openModal}
            className="w-[279px] rounded-81xl [background:linear-gradient(74.31deg,_#85ffc4,_#5cc6ff_45.83%,_#bc85ff_80.73%)] flex flex-col items-center justify-center py-3 px-4 box-border"
          >
            <b className="relative leading-[24px]">Create a New Account</b>
          </Button>
        </Box>

        {/* Foreground Image */}
        <img
          className="absolute top-[-70px] left-[-116px] w-[196.3px] h-[177.7px] object-cover"
          alt=""
          src="/illus@2x.png"
        />
      </Box>
    </>
  );
}
