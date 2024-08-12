"use client";

import dynamic from "next/dynamic";

const FAQs = dynamic(() => import("@/components/faq"), {
  ssr: false,
});

export default function About() {
  return <FAQs />;
}
