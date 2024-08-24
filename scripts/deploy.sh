#!/usr/bin/env bash

#
#  Mainnet Ids
#
# Ledgers
ICP_LEDGER_ID_MAINNET="ryjl3-tyaaa-aaaaa-aaaba-cai"
CKBTC_LEDGER_ID_MAINNET="mxzaz-hqaaa-aaaar-qaada-cai"
CKETH_LEDGER_ID_MAINNET="ss2fx-dyaaa-aaaar-qacoq-cai"
AEGIS_LEDGER_ID_MAINNET="rovwv-uqaaa-aaaam-ac73a-cai"

TEST_ICP_LEDER_ID_TESTNET="ryjl3-tyaaa-aaaaa-aaaba-cai" # Add the mainnet id for time being
CKTEST_BTC_LEDGER_TESTNET="mc6ru-gyaaa-aaaar-qaaaq-cai"
CKSEPOLIA_ETH_LEDGER_ID_TESTNET="apia6-jaaaa-aaaar-qabma-cai"

# Index Ledgers
AEGIS_LEDGER_INDEX_ID_MAINNET="rjuqb-ziaaa-aaaam-ac73q-cai"

# Minters
CKBTC_MINTER_ID_MAINNET="mqygn-kiaaa-aaaar-qaadq-cai"
CKETH_MINTER_ID_MAINNET="sv3dd-oaaaa-aaaar-qacoa-cai"

CKTEST_BTC_MINTER_ID_TESTNET="ml52i-qqaaa-aaaar-qaaba-cai"
CKSEPOPLIA_ETH_MINTER_ID_TESTNET="jzenf-aiaaa-aaaar-qaa7q-cai"

# Aegis Finance Canisters
MAIN_CANISTER_ID_MAINNET="rax35-paaaa-aaaam-ac72a-cai"
INSURANCE_CANISTER_ID_MAINNET="rvqkq-oiaaa-aaaam-ac7zq-cai"
ACCOUNTS_CANISTER_ID_MAINNET="rsrme-dqaaa-aaaam-ac7za-cai"

#
#local Ids
#
ICP_LEDGER_ID_LOCAL="ryjl3-tyaaa-aaaaa-aaaba-cai"
CKBTC_LEDGER_ID_LOCAL="mxzaz-hqaaa-aaaar-qaada-cai"
CKETH_LEDGER_ID_LOCAL="apia6-jaaaa-aaaar-qabma-cai"
AEGIS_LEDGER_ID_LOCAL="2jymc-fyaaa-aaaar-qad2q-cai"

AEGIS_LEDGER_INDEX_ID_LOCAL="2dm64-liaaa-aaaar-qaega-cai"

CKBTC_MINTER_ID_LOCAL="mqygn-kiaaa-aaaar-qaadq-cai"
CKETH_MINTER_ID_LOCAL="sv3dd-oaaaa-aaaar-qacoa-cai"

MAIN_CANISTER_ID_LOCAL="23633-jiaaa-aaaar-qadzq-cai"
INSURANCE_CANISTER_ID_LOCAL="suaf3-hqaaa-aaaaf-bfyoa-cai"
ACCOUNTS_CANISTER_ID_LOCAL="222qi-2qaaa-aaaao-anesa-cai"

CKBTC_KYT_ID_MAINNET="pjihx-aaaaa-aaaar-qaaka-cai"
CKTEST_BTC_KYT_ID_TESTNET="pvm5g-xaaaa-aaaar-qaaia-cai"




function setUpLocalEnvs() {

    {
        echo "NEXT_PUBLIC_DFX_NETWORK=local"
        echo "NEXT_PUBLIC_DFX_NETWORK=http://localhost:8080"
        echo "NEXT_PUBLIC_IDENTITY_PROVIDER=http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8080/"

        #
        #
        #
        echo "NEXT_PUBLIC_ICP_LEDGER_ID=$ICP_LEDGER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKBTC_LEDGER_ID=$CKBTC_LEDGER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKETH_LEDGER_ID=$CKETH_LEDGER_ID_LOCAL"
        echo "NEXT_PUBLIC_AEGIS_LEDGER_ID=$AEGIS_LEDGER_ID_LOCAL"

        echo "NEXT_PUBLIC_TEST_ICP_LEDGER_ID=$ICP_LEDGER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKTEST_BTC_LEDGER_ID=$CKBTC_LEDGER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKSEPOLIA_ETH_LEDGER_ID=$CKETH_LEDGER_ID_LOCAL"
        #
        #
        #
        echo "NEXT_PUBLIC_AEGIS_LEDGER_INDEX_ID=$AEGIS_LEDGER_INDEX_ID_LOCAL"
        #
        #
        #
        echo "NEXT_PUBLIC_CKBTC_MINTER_ID=$CKBTC_MINTER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKETH_MINTER_ID=$CKETH_MINTER_ID_LOCAL"

        echo "NEXT_PUBLIC_CKTEST_BTC_MINTER_ID=$CKBTC_MINTER_ID_LOCAL"
        echo "NEXT_PUBLIC_CKSEPOPLIA_ETH_MINTER_ID=$CKETH_MINTER_ID_LOCAL"
        #
        #
        #
        echo "NEXT_PUBLIC_MAIN_CANISTER_ID=$MAIN_CANISTER_ID_LOCAL"
        echo "NEXT_PUBLIC_INSURANCE_CANISTER_ID=$INSURANCE_CANISTER_ID_LOCAL"
        echo "NEXT_PUBLIC_ACCOUNTS_CANISTER_ID=$ACCOUNTS_CANISTER_ID_LOCAL"
        # 
        # 
        # 
        echo "NEXT_PUBLIC_CKBTC_KYT_CANISTER_ID=$CKBTC_KYT_ID_MAINNET"
        echo "NEXT_PUBLIC_CKTEST_BTC_KYT_CANISTER_ID=$CKTEST_BTC_KYT_ID_TESTNET"
    }| tee .env .env.local
}

function setUpICEnvs() {

    {
        echo "NEXT_PUBLIC_DFX_NETWORK=ic"
        echo "NEXT_PUBLIC_DFX_NETWORK=https://ic0.app"
        echo "NEXT_PUBLIC_IDENTITY_PROVIDER=https://identity.ic0.app"
        #
        #
        #
        echo "NEXT_PUBLIC_ICP_LEDGER_ID=$ICP_LEDGER_ID_MAINNET"
        echo "NEXT_PUBLIC_CKBTC_LEDGER_ID=$CKTEST_BTC_LEDGER_TESTNET"
        echo "NEXT_PUBLIC_CKETH_LEDGER_ID=$CKSEPOLIA_ETH_LEDGER_ID_TESTNET"
        echo "NEXT_PUBLIC_AEGIS_LEDGER_ID=$AEGIS_LEDGER_ID_MAINNET"
        #
        #
        #
        echo "NEXT_PUBLIC_TEST_ICP_LEDGER_ID=$TEST_ICP_LEDER_ID_TESTNET"
        echo "NEXT_PUBLIC_CKTEST_BTC_LEDGER_ID=$CKTEST_BTC_LEDGER_TESTNET"
        echo "NEXT_PUBLIC_CKSEPOLIA_ETH_LEDGER_ID=$CKSEPOLIA_ETH_LEDGER_ID_TESTNET"
        #
        #
        #
        echo "NEXT_PUBLIC_AEGIS_LEDGER_INDEX_ID=$AEGIS_LEDGER_INDEX_ID_MAINNET"
        #
        #
        #
        echo "NEXT_PUBLIC_CKBTC_MINTER_ID=$CKTEST_BTC_MINTER_ID_TESTNET"
        echo "NEXT_PUBLIC_CKETH_MINTER_ID=$CKSEPOPLIA_ETH_MINTER_ID_TESTNET"

        echo "NEXT_PUBLIC_CKTEST_BTC_MINTER_ID=$CKTEST_BTC_MINTER_ID_TESTNET"
        echo "NEXT_PUBLIC_CKSEPOPLIA_ETH_MINTER_ID=$CKSEPOPLIA_ETH_MINTER_ID_TESTNET"
        #
        #
        #
        echo "NEXT_PUBLIC_MAIN_CANISTER_ID=$MAIN_CANISTER_ID_MAINNET"
        echo "NEXT_PUBLIC_INSURANCE_CANISTER_ID=$INSURANCE_CANISTER_ID_MAINNET"
        echo "NEXT_PUBLIC_ACCOUNTS_CANISTER_ID=$ACCOUNTS_CANISTER_ID_MAINNET"
        # 
        # 
        # 
        echo "NEXT_PUBLIC_CKBTC_KYT_CANISTER_ID=$CKTEST_BTC_KYT_ID_TESTNET"
        echo "NEXT_PUBLIC_CKTEST_BTC_KYT_CANISTER_ID=$CKTEST_BTC_KYT_ID_TESTNET"

    }| tee .env .env.production
}

function main() {

    # II_DUMMY_CAPTCHA=1 II_DUMMY_AUTH=1 dfx deploy internet_identity --specified-id rdmx6-jaaaa-aaaaa-aaadq-cai

    echo "" >.env

    if [[ $# -lt 1 ]]; then
        echo "Argument 'dev' or 'local' or 'ic' expected, but found None. Continue with dev ..."

        NETWORK="dev"

    else

        NETWORK="$1"

    fi

    echo "Network:""$1"

    if [[ $NETWORK == "local" ]]; then

        setUpLocalEnvs

    elif [[ $NETWORK == "ic" ]]; then

        dfx identity use deployer

        setUpICEnvs

    else

        setUpLocalEnvs

        # pnpm run dev
    fi

    # dfx deploy  --network="$NETWORK"  aegis_dapp

    dfx identity use default
}

main "$1"
