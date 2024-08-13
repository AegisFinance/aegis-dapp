import { ButtonShared } from '@/components/shared/button';
import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeadProps {
  signOut(): void;
}

export default function HomeNav({ signOut }: HeadProps) {
  const [state, setState] = useState(false);

  const navigation = [
    { title: 'Home', path: '/' },
    { title: 'Insurance', path: '/insurance' },
    { title: 'Options', path: '/options' },
    { title: 'Stake', path: '/stake' },
    { title: 'Account', path: '/account' },
    { title: 'Feedback', path: '/feedback' },
  ];

  return (
    <>
      <nav className=" sticky top-0 z-20 w-full bg-lavender-blue-300 shadow ">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h1 className="  font-bold   xl:text-13xl">
                <span className="text-indigo-600  font-sans underline underline-offset-8 ">
                  Aegis Finance
                </span>
              </h1>
            </Link>
            <div className="md:hidden">
              <Button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? 'block' : 'hidden'
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <Box
                    key={idx}
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <Link
                      onClick={() => {
                        setState(false);
                      }}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  </Box>
                );
              })}
              <div className="md:hidden">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-indigo-600 font-semibold"
                  onClick={signOut}
                >
                  Log Out
                </Link>
              </div>
            </ul>
          </div>
          <div className="hidden md:inline-block">
            <ButtonShared
              className="font-light dark:bg-white  dark:text-black border-transparent font-sans"
              onClick={signOut}
            >
              Sign out
            </ButtonShared>
          </div>
        </div>
      </nav>
    </>
  );
}
