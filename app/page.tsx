"use client";

import dynamic from "next/dynamic";

 const FAQs = dynamic(() => import("@/components/faq"), {
   ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <FAQs />
      </div>{" "}
    </>
  );
}
