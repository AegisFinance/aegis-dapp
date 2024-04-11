// import { isDisClaimerOpenAtom } from "@/state/jotai";
import { isAuthenticatedAtom, sessionTimeoutAtom } from "@/lib/states/jotai";
import { Box } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

/**
 *
 * Disclaimer Component Display to users on every visit
 *
 **/
export default function HeroSection() {
  const [isAuthenticated, setAuthenticated] = useAtom(isAuthenticatedAtom);
  const [sessionTimeOut, setSessionTimeOut] = useAtom(sessionTimeoutAtom);

  const signIn = () => {
    setAuthenticated(true);
    // setSessionTimeOut(null);
  };

  // Replace / path with your path
  const navigation = [
    { title: "Roadmap", path: "/" },
    { title: "About", path: "/about" },
  ];

  return (
    <div className="container herosection">
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
              <Link
                href="/"
                className="flex items-center text-gray-200"
                onClick={signIn}
              >
                Log In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
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
          <p className="italic text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Unlocking financial freedom, block by block.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Link
              onClick={signIn}
              href="/"
              className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
            >
              Sign Up
            </Link>
            <Link
              href="/"
              className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto"
            >
              Read More
            </Link>
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
    </div>
  );
}
