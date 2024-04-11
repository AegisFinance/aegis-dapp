"use client";
import { AccountNav } from "@/components";
// import  from "@components/Portfolio/Portfolio/PortfolioNav";
import dynamic from "next/dynamic";
import React from "react";

// const AccountNav = dynamic(() => import("@/components/myProfile/AccountNav"), {
//   Do not import in server side
//   ssr: false,
// });
function AccountRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AccountNav>
      {children}
      </AccountNav>
    </>
  );
}

export default AccountRootLayout;
