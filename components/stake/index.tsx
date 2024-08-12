import { Center, Heading } from '@chakra-ui/react';
import StakeDashboard from './dashboard';
import StakeTokens from './stake-tokens';
import { useState } from 'react';

export default function StakeOverview() {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
      <section className="border-2 border-blue-700  ">
        <Center>
          <Heading
            size="lg"
            className="font-sans underline underline-offset-8 mb-0"
          >
            Staking Stats
          </Heading>
        </Center>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
          <div className=" dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <StakeDashboard refresh={refresh} />
            <div className="md:mx-auto max-w-screen-xl px-4 lg:px-2">
              <Center>
                <StakeTokens />
              </Center>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
