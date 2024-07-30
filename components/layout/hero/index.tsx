import { Box } from "@chakra-ui/react";
import HeroSectionDesktop from "./hero-desktop";
import HeroSectionSmall from "./hero-mobile";
import { Provider } from "@/lib/auth/interface";

export interface HeroComponentProps {
  signIn: (provider: Provider) => Promise<void>;
  isSiginLoading: boolean;
  className: string;
}

export default function HeroComponent({
  signIn,
  isSiginLoading,
  className = "",
}: HeroComponentProps) {
  return (
    <>
      <Box className="sm:hidden">
        <HeroSectionSmall
          className=""
          signIn={signIn}
          isSiginLoading={isSiginLoading}
        />
      </Box>{" "}
      <Box className="hidden lg:block ">
        <HeroSectionDesktop
          className=""
          signIn={signIn}
          isSiginLoading={isSiginLoading}
        />
      </Box>
    </>
  );
}
