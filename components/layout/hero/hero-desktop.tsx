/* eslint-disable @next/next/no-img-element */
import { Box, Button, Heading } from "@chakra-ui/react";
import { CSSProperties, FunctionComponent, useMemo, useState } from "react";
import { HeroComponentProps } from ".";
import SelectProviderModal from "../select_providers_modal";
import { ButtonShared } from "@/components/shared/button";
import Link from "next/link";

const HeroSectionDesktop: FunctionComponent<HeroComponentProps> = ({
  signIn,
  isSiginLoading,
  className = " ",
}: HeroComponentProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    console.log("click");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <SelectProviderModal
          signIn={signIn}
          isModalOpen
          onClose={handleCloseModal}
          isSiginLoading={isSiginLoading}
        />
      )}{" "}
      <Box className=" w-[max] relative bg-black-black-5 h-[max] overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-px box-border text-center text-31xl text-black-black-100 font-button-14">
        <Box className="w-[1440px] h-20 flex flex-row items-center justify-start py-5 px-[130px] box-border gap-[280px] text-left text-sm">
          <Box className="w-[110px] relative h-4" />
          <Box className="w-[790px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-end gap-[186px]">
            <Box className="z-10 flex flex-row items-center justify-center gap-[28px]">
              <Link href="/" className="relative leading-[100%] font-semibold">
                Account
              </Link>
              <Link href="/" className="relative leading-[100%] font-semibold">
                Stake
              </Link>
              <Link href="/" className="relative leading-[100%] font-semibold">
                Insurance
              </Link>
              <Link href="/" className="relative leading-[100%] font-semibold">
                Options
              </Link>
              <Link href="/about" className="relative leading-[100%] font-semibold">
                Feedback
              </Link>
            </Box>
            <Box className="w-[204px] h-10 overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[12px] text-center text-base">
              <Box
                zIndex={2}
                onClick={openModal}
                className="w-24 rounded-3xs box-border h-10 overflow-hidden shrink-0 flex flex-col items-center justify-center      "
              >
                <Box className="relative leading-[100%] font-semibold">
                  {/* Sign in */}
                </Box>
              </Box>
              <ButtonShared
                zIndex={2}
                onClick={openModal}
                className="w-24 rounded-3xs [background:linear-gradient(225deg,_#18c8ff,_#933ffe)] box-border h-10 overflow-hidden shrink-0 flex flex-col items-center justify-center border-[1px] border-solid border-gradient-light"
              >
                <Box className="relative leading-[100%] font-semibold">
                  Sign in
                </Box>
              </ButtonShared>
            </Box>
          </Box>
        </Box>
        <Box className="w-[1440px] relative h-[711px] text-66xl">
          <img
            className="absolute top-[-80px] left-[-1px] w-[1441px] h-[791px] object-cover"
            alt=""
            src="/bgimg@2x.png"
          />
          <Box className="absolute top-[-80px] left-[330px] w-[780px] h-[622px] overflow-hidden flex flex-col items-center justify-end">
            <Box className="flex flex-col items-center justify-start gap-[32px]">
              <Box className="flex flex-col items-center justify-start gap-[16px]">
                <Box className="w-[780px] relative leading-[130%] font-black inline-block">
                  AEGIS FINANCE
                </Box>
                <Box className="w-[680px] relative text-12xl leading-[80%] font-black text-black-black-60 inline-block">
                  Unlocking financial freedom, block by block.
                </Box>
                <Box className="w-[580px] relative text-base leading-[150%] text-black-black-60 inline-block">
                  Trade and grow your crypto with Aegis Finance,
                  the platform dedicated to every trader at every level.
                </Box>
              </Box>
              <Button
                zIndex={2}
                onClick={openModal}
                className="w-[156px] rounded-3xs [background:linear-gradient(225deg,_#18c8ff,_#933ffe)] box-border h-14 overflow-hidden shrink-0 flex flex-col items-center justify-center text-base border-[1px] border-solid border-gradient-light"
              >
                <Box className="relative leading-[100%] font-semibold">
                  Sign up
                </Box>
              </Button>
            </Box>
          </Box>
          <img
            className="absolute top-[-80px] left-[1135px] w-[74px] h-[203px] overflow-hidden"
            alt=""
            src="/frame.svg"
          />
        </Box>
        <Box className="w-[1440px] relative h-[546px] text-13xl">
          <img
            className="absolute top-[0px] left-[0px] w-[1440px] h-[426px] overflow-hidden"
            alt=""
            src="/circles.svg"
          />
          <Box className="absolute top-[calc(50%_-_153px)] left-[calc(50%_-_590px)] rounded-6xl bg-black-black-12 w-[380px] flex flex-col items-center justify-start py-8 px-6 box-border gap-[32px]">
            <Box className="self-stretch flex flex-col items-center justify-start gap-[16px]">
              <img
                className="w-20 relative h-20 object-cover"
                alt=""
                src="/img@2x.png"
              />
              <Box className="self-stretch relative leading-[130%] font-extrabold">
                Invest in $AEGIS
              </Box>
              <Box className="self-stretch relative text-base leading-[150%] text-black-black-60">
                <p className="m-0">{`Invest in AEGIS ecosystem, anywhere `}</p>
                <p className="m-0">{`with our safe, secure, and easy to `}</p>
                <p className="m-0">use online platform</p>
              </Box>
            </Box>
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-base text-primary-purple">
              <Box className="relative leading-[100%] font-semibold">
                Coming Soon!
              </Box>
              <Box className="w-6 h-6 relative"></Box>
            </Box>
          </Box>
          <InfoBlock
            img="/img1@2x.png"
            tradeDesk="Stake $AEGIS "
            weHaveThousandsOfATMsLoca="Stake $AEGIS token into our platform"
            acrossTheUSWhereYouCanEas="to maximize your earnings. Multichain staking will be introduced soon."
            text="Learn More"
          />
          <img
            className="absolute h-[9.05%] w-[5.14%] top-[91.39%] right-[89.72%] bottom-[-4.95%] left-[5.14%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/starimg.svg"
          />
          <InfoBlock
            img="/img2@2x.png"
            tradeDesk="$AEGIS Account"
            weHaveThousandsOfATMsLoca="All in one exchange wasllet."
            acrossTheUSWhereYouCanEas="Supported chains are ICP, Bitcoin, and Ethereum."
            text="Learn More"
            propLeft="calc(50% + 210px)"
          />
          <img
            className="absolute h-[9.14%] w-[3.75%] top-[78.22%] right-[92.57%] bottom-[12.64%] left-[3.68%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/starimg1.svg"
          />
        </Box>
        {/* <Box className="w-[1440px] h-[562px] flex flex-row items-center justify-end py-[140px] px-[178px] box-border gap-[91px]">
        <Box className="w-[780px] flex flex-col items-center justify-start gap-[32px]">
          <Box className="flex flex-col items-center justify-start gap-[16px]">
            <Box className="w-[780px] relative leading-[130%] font-black inline-block">{`A crypto investment platform that invests in you `}</Box>
            <Box className="w-[580px] relative text-base leading-[150%] text-black-black-60 inline-block">
              We invest more resources than any other platrom in making sure
              great support from real people is a click away, whenever you need
              it.
            </Box>
          </Box>
          <Box className="w-[156px] rounded-3xs [background:linear-gradient(225deg,_#18c8ff,_#933ffe)] box-border h-14 overflow-hidden shrink-0 flex flex-col items-center justify-center text-base border-[1px] border-solid border-gradient-light">
            <Box className="relative leading-[100%] font-semibold">
              Get Started
            </Box>
          </Box>
        </Box>
        <img
          className="w-[61px] relative h-[60px]"
          alt=""
          src="/starimg2.svg"
        />
      </Box> */}
        {/* <Box className="w-[1440px] relative h-[627px] text-left">
        <img
          className="absolute top-[108px] left-[130px] w-[580px] h-[420px] object-contain"
          alt=""
          src="/img3@2x.png"
        />
        <Box className="absolute top-[-588px] left-[730px] w-[710px] h-[1075px] overflow-hidden">
          <img
            className="absolute top-[0px] left-[110px] w-[600px] h-[1045px]"
            alt=""
            src="/bgimg.svg"
          />
          <Box className="absolute top-[728px] left-[0px] w-[580px] flex flex-col items-start justify-center gap-[32px]">
            <Box className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <Box className="self-stretch relative leading-[130%] font-black">
                24/7 access to full service customer support
              </Box>
              <Box className="self-stretch relative text-base leading-[150%] text-black-black-60">
                We invest more resources than any other platform in making sure
                great support from real people is a click away, whenever you
                need it.
              </Box>
            </Box>
            <Box className="w-[156px] rounded-3xs box-border h-14 overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-base border-[1px] border-solid border-black-black-100">
              <Box className="relative leading-[100%] font-semibold">
                Get Started
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> */}
        {/* <Box className="w-[1440px] relative h-[984px]">
        <img
          className="absolute top-[-524px] left-[850px] w-[590px] h-[1312px] object-contain"
          alt=""
          src="/bggradientimg@2x.png"
        />
        <Box className="absolute top-[calc(50%_-_372px)] left-[330px] w-[780px] overflow-hidden flex flex-col items-center justify-start gap-[32px]">
          <Box className="flex flex-col items-center justify-start gap-[16px]">
            <Box className="w-[780px] relative leading-[130%] font-black flex items-end justify-center opacity-[0.96] mix-blend-normal">
              Buy and sell with the lowest fees in the industry
            </Box>
            <Box className="w-[580px] relative text-base leading-[150%] text-black-black-60 inline-block">
              Buy and sell 150+ cryptocurrencies with 20+ fiat currencies using
              bank transfers or your credit/debit card.
            </Box>
          </Box>
          <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-base text-primary-purple">
            <Box className="relative leading-[100%] font-semibold">
              Learn More
            </Box>
            <img className="w-6 relative h-6" alt="" src="/iconarrow.svg" />
          </Box>
        </Box>
        <Box className="absolute top-[416px] left-[130px] rounded-6xl bg-black-black-12 w-[1180px] flex flex-col items-start justify-start py-5 px-8 box-border gap-[16px] text-left text-xl">
          <Box className="self-stretch flex flex-row items-center justify-start gap-[32px]">
            <b className="w-[207px] relative leading-[150%] flex items-center shrink-0">
              Bitcoin
            </b>
            <b className="w-[91px] relative leading-[150%] flex text-primary-purple items-center shrink-0">
              BTC
            </b>
            <b className="flex-1 relative leading-[150%] text-right">
              $56,290.30
            </b>
            <b className="w-[100px] relative leading-[150%] flex text-system-green text-right items-center shrink-0">
              +1.68%
            </b>
            <img
              className="w-[213px] relative h-14"
              alt=""
              src="/smallgraph.svg"
            />
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-center text-base">
              <Box className="relative leading-[100%] font-semibold">
                Trade Now
              </Box>
              <img className="w-6 relative h-6" alt="" src="/iconarrow1.svg" />
            </Box>
          </Box>
          <Box className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black-black-20" />
          <Box className="self-stretch flex flex-row items-center justify-start gap-[32px]">
            <b className="w-[207px] relative leading-[150%] flex items-center shrink-0">
              Ethereum
            </b>
            <b className="w-[91px] relative leading-[150%] flex text-primary-purple items-center shrink-0">
              ETH
            </b>
            <b className="flex-1 relative leading-[150%] text-right">
              $4,284.81
            </b>
            <b className="w-[100px] relative leading-[150%] flex text-system-green text-right items-center shrink-0">
              +4.36%
            </b>
            <img
              className="w-[213px] relative h-14"
              alt=""
              src="/smallgraph1.svg"
            />
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-center text-base">
              <Box className="relative leading-[100%] font-semibold">
                Trade Now
              </Box>
              <img className="w-6 relative h-6" alt="" src="/iconarrow1.svg" />
            </Box>
          </Box>
          <Box className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black-black-20" />
          <Box className="self-stretch flex flex-row items-center justify-start gap-[32px]">
            <b className="w-[207px] relative leading-[150%] flex items-center shrink-0">
              Cardano
            </b>
            <b className="w-[91px] relative leading-[150%] flex text-primary-purple items-center shrink-0">
              ADA
            </b>
            <b className="flex-1 relative leading-[150%] text-right">$1.88</b>
            <b className="w-[100px] relative leading-[150%] flex text-system-green text-right items-center shrink-0">
              +3.43%
            </b>
            <img
              className="w-[213px] relative h-14"
              alt=""
              src="/smallgraph2.svg"
            />
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-center text-base">
              <Box className="relative leading-[100%] font-semibold">
                Trade Now
              </Box>
              <img className="w-6 relative h-6" alt="" src="/iconarrow1.svg" />
            </Box>
          </Box>
          <Box className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black-black-20" />
          <Box className="self-stretch flex flex-row items-center justify-start gap-[32px]">
            <b className="w-[207px] relative leading-[150%] flex items-center shrink-0">
              Wax
            </b>
            <b className="w-[91px] relative leading-[150%] flex text-primary-purple items-center shrink-0">
              WAXP
            </b>
            <b className="flex-1 relative leading-[150%] text-right">$0.97</b>
            <b className="w-[100px] relative leading-[150%] flex text-system-red text-right items-center shrink-0">
              -2.62%
            </b>
            <img
              className="w-[213px] relative h-14"
              alt=""
              src="/smallgraph3.svg"
            />
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-center text-base">
              <Box className="relative leading-[100%] font-semibold">
                Trade Now
              </Box>
              <img className="w-6 relative h-6" alt="" src="/iconarrow1.svg" />
            </Box>
          </Box>
          <Box className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black-black-20" />
          <Box className="self-stretch flex flex-row items-center justify-start gap-[32px]">
            <b className="w-[207px] relative leading-[150%] flex items-center shrink-0">
              Polkadot
            </b>
            <b className="w-[91px] relative leading-[150%] flex text-primary-purple items-center shrink-0">
              DOT
            </b>
            <b className="flex-1 relative leading-[150%] text-right">$42.22</b>
            <b className="w-[100px] relative leading-[150%] flex text-system-green text-right items-center shrink-0">
              +7.56%
            </b>
            <img
              className="w-[213px] relative h-14"
              alt=""
              src="/smallgraph1.svg"
            />
            <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-center text-base">
              <Box className="relative leading-[100%] font-semibold">
                Trade Now
              </Box>
              <img className="w-6 relative h-6" alt="" src="/iconarrow1.svg" />
            </Box>
          </Box>
        </Box>
      </Box> */}
        {/* <Box className="w-[1440px] relative h-[531px] text-left">
        <img
          className="absolute top-[-247px] left-[568px] w-[892px] h-[945px] overflow-hidden object-cover"
          alt=""
          src="/bggradientimg1@2x.png"
        />
        <img
          className="absolute top-[-471px] left-[0px] w-[600px] h-[1045px] object-contain"
          alt=""
          src="/bgimg1@2x.png"
        />
        <Box className="absolute top-[80px] left-[130px] w-[580px] flex flex-col items-start justify-center gap-[32px]">
          <Box className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <Box className="self-stretch relative leading-[130%] font-black">
              <p className="m-0">{`Take your first step `}</p>
              <p className="m-0">{`into safe, secure `}</p>
              <p className="m-0">crypto investing</p>
            </Box>
            <Box className="self-stretch relative text-base leading-[150%] text-black-black-60">
              Separated they live in Bookmarks right at the coast of the famous
              Semantics, large language ocean Separated they live in Bookmarks
              right at the coast.
            </Box>
          </Box>
          <button className="cursor-pointer p-0 bg-[transparent] w-[156px] rounded-3xs [background:linear-gradient(225deg,_#18c8ff,_#933ffe)] box-border h-14 overflow-hidden shrink-0 flex flex-col items-center justify-center border-[1px] border-solid border-gradient-light">
            <Box className="relative text-base leading-[100%] font-semibold font-button-14 text-black-black-100 text-center">
              Get Started
            </Box>
          </button>
        </Box>
        <img
          className="absolute top-[55px] left-[730px] w-[580px] h-[420px]"
          alt=""
          src="/img.svg"
        />
      </Box>
      <Box className="w-[1440px] relative h-[393px]">
        <img
          className="absolute top-[-36px] left-[0px] w-[1440px] h-[830px] opacity-[0.5]"
          alt=""
          src="/circles1.svg"
        />
        <Box className="absolute top-[calc(50%_-_116.5px)] left-[330px] w-[780px] overflow-hidden flex flex-col items-center justify-start gap-[32px]">
          <Box className="flex flex-col items-center justify-start gap-[16px]">
            <Box className="w-[780px] relative leading-[130%] font-black flex items-end justify-center opacity-[0.96] mix-blend-normal">
              Receive transmissions
            </Box>
            <Box className="w-[580px] relative text-base leading-[150%] inline-block text-black-black-60">
              <span>{`Unsubscribe at any time. `}</span>
              <span className="text-black-black-100">Privacy policy↗</span>
            </Box>
          </Box>
          <Box className="w-[304px] shadow-[0px_0px_30px_rgba(255,_255,_255,_0.05)_inset,_0px_2px_2px_rgba(255,_255,_255,_0.15)_inset] [backdrop-filter:blur(40px)] rounded-3xs box-border h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 px-5 gap-[10px] text-left text-sm text-black-black-40 border-[1px] border-solid border-gradient-main">
            <Box className="flex-1 relative leading-[150%]">Email Address</Box>
            <img className="w-6 relative h-6" alt="" src="/iconarrow2.svg" />
          </Box>
        </Box>
      </Box> */}
        <Box className="w-[1440px] relative  bg-gray h-[507px] text-left text-sm">
          <img
            className="absolute top-[-54px] left-[0px] w-[910px] h-[562px] overflow-hidden object-contain"
            alt=""
            src="/bggradientimg2@2x.png"
          />
          <Box className="absolute top-[100px] left-[130px] flex flex-col items-start justify-start gap-[24px]">
            <Box className="flex flex-col items-start justify-start gap-[32px]">
              <Heading as="h4" fontSize={25} className=" opacity-[0.3]">
                AEGIS FINANCE
              </Heading>
              {/* <img  alt="" src="/logo1.svg" /> */}
              <Box className="w-[380px] relative leading-[150%] inline-block opacity-[0.3]">
                <p className="[margin-block-start:0] [margin-block-end:20px]">{`Aegis, the world’s leading crypto exchange`}</p>
                <p className="m-0">
                  Sign up to get the latest in Aegis news, discounts, and more.
                </p>
              </Box>
              <Box className="w-[304px] shadow-[0px_0px_30px_rgba(255,_255,_255,_0.05)_inset,_0px_2px_2px_rgba(255,_255,_255,_0.15)_inset] [backdrop-filter:blur(40px)] rounded-3xs box-border h-14 overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 px-5 gap-[10px] text-black-black-40 border-[1px] border-solid border-gradient-main">
                <Box className="flex-1 relative leading-[150%]">
                  Email Address
                </Box>
                <img
                  className="w-6 relative h-6"
                  alt=""
                  src="/iconarrow2.svg"
                />
              </Box>
            </Box>
            <Box className="relative text-[12px] leading-[150%] opacity-[0.3]">
              © 2024 Aegis Fiance
            </Box>
          </Box>
          <Box className="absolute top-[calc(50%_-_153.5px)] left-[calc(50%_+_12px)] w-[278px] flex flex-col items-start justify-center gap-[24px]">
            <Box className="relative leading-[100%] font-semibold opacity-[0.3]">
              Company
            </Box>
            <Box className="relative leading-[150%] opacity-[0.3]">About</Box>
            <Box className="relative leading-[150%] opacity-[0.3]">Careers</Box>
            <Box className="relative leading-[150%] opacity-[0.3]">Press</Box>
            <Box className="relative leading-[150%] opacity-[0.3]">News</Box>
            <Box className="relative leading-[150%] opacity-[0.3]">Merch</Box>
          </Box>
          <Box className="absolute top-[calc(50%_-_153.5px)] left-[calc(50%_+_310px)] w-[280px] flex flex-col items-start justify-center gap-[24px]">
            <Box className="relative leading-[100%] font-semibold opacity-[0.3]">
              Privacy Policy and Terms of Service
            </Box>
            <Box className="relative leading-[150%] opacity-[0.3]">
              Aegis Privacy Policy
            </Box>

            <Box className="relative leading-[150%] opacity-[0.3]">
              Aegis Financial Privacy Notice
            </Box>
            <Box className="relative leading-[150%] opacity-[0.3]">
              Aegis Terms of Service
            </Box>
          </Box>
          <Box className="absolute top-[0.5px] left-[-0.5px] box-border w-[1441px] h-px border-t-[1px] border-solid border-black-black-12" />
        </Box>
      </Box>
    </>
  );
};

export default HeroSectionDesktop;

export type InfoBlockType = {
  className?: string;
  img?: string;
  tradeDesk?: string;
  weHaveThousandsOfATMsLoca?: string;
  acrossTheUSWhereYouCanEas?: string;
  text?: string;

  /** Style props */
  propLeft?: CSSProperties["left"];
};

const InfoBlock: FunctionComponent<InfoBlockType> = ({
  className = "",
  img,
  tradeDesk,
  weHaveThousandsOfATMsLoca,
  acrossTheUSWhereYouCanEas,
  text,
  propLeft,
}) => {
  const infoBlockStyle: CSSProperties = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  return (
    <Box
      className={`absolute top-[calc(50%_-_153px)] left-[calc(50%_-_190px)] rounded-6xl bg-black-black-12 w-[380px] flex flex-col items-center justify-start py-8 px-6 box-border gap-[32px] text-center text-13xl text-black-black-100 font-button-14 ${className}`}
      style={infoBlockStyle}
    >
      <Box className="self-stretch flex flex-col items-center justify-start gap-[16px]">
        <img className="w-20 relative h-20 object-cover" alt="" src={img} />
        <Box className="self-stretch relative leading-[130%] font-extrabold">
          {tradeDesk}
        </Box>
        <Box className="self-stretch relative text-base leading-[150%] text-black-black-60">
          <p className="m-0">{weHaveThousandsOfATMsLoca}</p>
          <p className="m-0">{acrossTheUSWhereYouCanEas}</p>
        </Box>
      </Box>
      <Box className="rounded-3xs overflow-hidden flex flex-row items-center justify-center gap-[6px] text-base text-primary-purple">
        <Box className="relative leading-[100%] font-semibold">{text}</Box>
        <img className="w-6 relative h-6" alt="" src="/iconarrow.svg" />
      </Box>
    </Box>
  );
};