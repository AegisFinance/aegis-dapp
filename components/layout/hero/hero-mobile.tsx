/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SelectProviderModal from "../select_providers_modal";
import { Spinners } from "../../spinners";
import { HeroComponentProps } from ".";

/**
 *
 * Disclaimer Component Display to users on every visit
 *
 **/
export default function HeroSectionSmall({
  signIn,
  isSiginLoading,
  className = "",
}: HeroComponentProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Replace / path with your path
  const navigation = [
    { title: "Roadmap", path: "/" },
    { title: "About", path: "/about" },
  ];

  if (loading) {
    return <Spinners sizes="xl" />;
  }
  return (
    <div className={`${className} container-hero-mobile  `}>
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
          <Link href="/">
            <Image
              src="./aegis_finance_logo.png"
              width={60}
              height={50}
              alt="Aegis Finance UI logo"
            />
          </Link>
          <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
            {navigation.map((item, idx) => (
              <li className="text-gray-200" key={idx}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/" className="flex items-center text-gray-200">
                FAQs
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            {/* One page Template for */}
            <span className="text-indigo-400"> Aegis Finance</span>
          </h1>
          <p className=" font-thin text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Unlocking financial freedom, block by block.
          </p>
          <div className="pt-10 items-center justify-start space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Button
              onClick={openModal}
              className="flex  font-sans items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            >
              <Link href="/">Sign up</Link>
            </Button>

            <Button
              onClick={openModal}
              className="flex  font-sans items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            >
              <Link href="/">Sign in</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <Image
            alt="Hero"
            // src="./aegis_hero.png"
            width={120}
            height={50}
            src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
          />
        </div>
      </section>

      {isModalOpen && (
        <SelectProviderModal
          signIn={signIn}
          isModalOpen
          onClose={handleCloseModal}
          isSiginLoading={isSiginLoading}
        />
      )}
    </div>
  );
}
