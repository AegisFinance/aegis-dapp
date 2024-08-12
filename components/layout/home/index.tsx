import React, { ReactNode, useEffect } from 'react';
import { useCheckAuthentication } from '@/lib/hooks/auth/check_athentication';
import HomeNav from './home-nav';

interface HomeProps {
  children: ReactNode;
  signOut(): void;
}

function Home({ children, signOut }: HomeProps) {
  const [checkAuth] = useCheckAuthentication();
  useEffect(() => {
    checkAuth().then(res => {
      console.log('Authentication From Home Valid: ', res);
    });
  }, []);
  return (
    <>
      <main className="w-full flex flex-col min-h-screen bg-lavender-blue-200 ">
        <HomeNav signOut={signOut} />
        <div className=" flex-1 overflow-y-auto border-2 border-blue-700 ">
          {children}
        </div>
      </main>
    </>
  );
}

export default Home;
