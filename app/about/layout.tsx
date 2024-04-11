"use client";
// import  from "@components/Portfolio/Portfolio/PortfolioNav";
import dynamic from "next/dynamic";
import React from "react";

// const ProfileNav = dynamic(() => import("@/components/myProfile/ProfileNav"), {
//   Do not import in server side
//   ssr: false,
// });
function AboutRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <ProfileNav> */}
      {children}
      {/* </ProfileNav> */}
    </>
  );
}

export default AboutRootLayout;
