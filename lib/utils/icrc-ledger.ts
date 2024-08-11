import {
  ApproveParams,
  BalanceParams,
  IcrcLedgerCanister,
  TransferParams,
} from '@dfinity/ledger-icrc';
import { CANISTERS_NAME, CANISTER_IDS_MAP } from '.';
import { HttpAgent } from '@dfinity/agent';

interface IcrcLedgerInit {
  agent: HttpAgent;
  ledger: CANISTERS_NAME;
}
export class IcrcLedger {
  private agent: HttpAgent | undefined = undefined;
  private ledger: CANISTERS_NAME | undefined;

  constructor({ agent, ledger }: IcrcLedgerInit) {
		console.log(": -------------------------------------------");
		console.log(": IcrcLedger -> constructor -> agent", agent);
		console.log(": -------------------------------------------");
    this.agent = agent;
    this.ledger = ledger;

  }

  async balance(args: BalanceParams): Promise<bigint> {
    const icrcLedger = IcrcLedgerCanister.create({
      agent: this.agent!,
      canisterId: CANISTER_IDS_MAP.get(this.ledger!)!,
    });

    let balanceRes = await icrcLedger.balance(args);

    return balanceRes;
  }

  async approve(args: ApproveParams): Promise<bigint> {
		console.log(": ------------");
		console.log(": args", args);
		console.log(": ------------");
    const icrcLedger = IcrcLedgerCanister.create({
	 agent: this.agent!,
      canisterId: CANISTER_IDS_MAP.get(this.ledger!)!,
    });
		console.log(": ------------------------");
			console.log(": icrcLedger", icrcLedger);
			console.log(": ------------------------");
     
    let approveRes = await icrcLedger.approve(args);
		console.log(": ------------------------");
		console.log(": approveRes", approveRes);
		console.log(": ------------------------");

    return approveRes;
  }

  async transfer(args: TransferParams): Promise<bigint> {
    const icrcLedger = IcrcLedgerCanister.create({
      agent: this.agent!,
      canisterId: CANISTER_IDS_MAP.get(this.ledger!)!,
    });

    let transferRes = await icrcLedger.transfer(args);

    return transferRes;
  }
}
