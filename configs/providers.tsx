"use client";
import React from "react";
import { Provider as JotaiProvider } from "jotai";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";


const config = getDefaultConfig({
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
  ],
  // storage: createStorage({ storage: window.localStorage }),
  storage: undefined,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  appName: "Aegis_Finance_App",
  projectId: "Aegis_Finance_App",
  chains: [mainnet, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
  syncConnectedChain: true,
  multiInjectedProviderDiscovery: false,
});

const queryClient = new QueryClient();

function Providers(props: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <CacheProvider>
        <ChakraProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>{props.children} </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ChakraProvider>
      </CacheProvider>
    </JotaiProvider>
  );
}

export default Providers;
