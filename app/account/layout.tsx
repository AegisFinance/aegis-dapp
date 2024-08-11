"use client";

import dynamic from "next/dynamic";
import React from "react";

const AccountNav = dynamic(() => import("@/components/account/account_nav"), {
  ssr: false,
});

function AccountRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen ">
        <AccountNav />
        <div className=" flex-1 overflow-y-auto border-2 border-blue-700 ">
          {children}
        </div>
      </main>
    </>
  );
}

export default AccountRootLayout;
