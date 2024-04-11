"use client";

import { AccountEth, ICRCs, Overview } from "@/components";
import AccountBtc from "@/components/account/account_btc";
import AccountTransactions from "@/components/account/account_transactions";
import { accountNav } from "@/lib/states/jotai";
import { MyAccountNav } from "@/lib/states/types";
import { useAtom } from "jotai";
import React from "react";

function Account() {
  const [getAccountNav, setAccountNav] = useAtom(accountNav);

  if (getAccountNav == MyAccountNav.Overview) {
    return (
      <>
        <Overview />
      </>
    );
  } else if (getAccountNav == MyAccountNav.ICRC) {
    return (
      <>
        <ICRCs />
      </>
    );
  } else if (getAccountNav == MyAccountNav.Bitcoin) {
    return (
      <>
        <AccountBtc />
      </>
    );
  } else if (getAccountNav == MyAccountNav.Ethereum) {
    return (
      <>
        <AccountEth />
      </>
    );
  } else if (getAccountNav == MyAccountNav.Transactions) {
    return (
      <>
        <AccountTransactions />
      </>
    );
  } else {
    return <>Overview</>;
  }
}

export default Account;
