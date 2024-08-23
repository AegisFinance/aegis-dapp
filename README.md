# Aegis Finance Dapp

This Repository contains Frontend UI Canister code.

Framework Used: `NextJS`

### NOTE
- This repo contains Frontend Canister Code, for Backend Canisters code visit [Aegis](https://github.com/AegisFinance/aegis)

- In order to use full Dapp features while deploying locally you need to span local Bitcoin Regtest Node. To better know how to span Bitcoin Node locally visit Aegis Finance main repo and follow README.


## Prerequisites

    -  NodeJS_VERSION  = v22.5.1
    -  DFX_VERSION = v0.22.0

## Build Locally

#### Steps

1. Install Dependencies 

```bash
pnpm install  
 ```
2. Start Local Replica 
          
```bash
 dfx start --clean
 ```
3. Deploy 

```bash
./scripts/deploy.sh local
```

### License
This project is licensed under the MIT license, [visit](LICENSE) for details.