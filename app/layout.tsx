"use client";

import "./globals.css";
import Providers from "@/configs/providers";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@/components/layout/layout"), {
  // Do not import in server side
  ssr: false,
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        }
      </body>
    </html>
  );
}
