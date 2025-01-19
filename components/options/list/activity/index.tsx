import { OptionsContractState } from '@/declarations/options/options.did';
import React, { useEffect, useState } from 'react';
import ActivityNav from './activity-nav';
import { useAtom } from 'jotai';
import { optionHistoryStateAtom } from '@/lib/states/jotai';
import { useListOptionsActivity } from '@/lib/hooks/canisters/options/list-activity';
import ListActivity from './activity-info';

function OptionsActivity() {
  const [refresh, setRefresh] = useState<boolean>(false);

  const [activity, setActivity] = useAtom(optionHistoryStateAtom);

  const [listActivity, isLoadingApi, list] = useListOptionsActivity();

  const handleActivityChange = async (args: OptionsContractState) => {
    setActivity(args);
    await listActivity(activity);
  };

  const refreshList = async () => {
    await listActivity(activity);
  };

  useEffect(() => {
    listActivity(activity);
  }, []);
  return (
    <section className="  ">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-2">
        <div className=" dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {' '}
          <ActivityNav
            setActivityState={handleActivityChange}
            setRefresh={refreshList}
          />
          <ListActivity list={list} isLoading={isLoadingApi} />
        </div>
      </div>
    </section>
  );
}

export default OptionsActivity;
