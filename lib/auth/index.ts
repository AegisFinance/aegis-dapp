import { HttpAgent, Identity } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
export const getIdentityPrincipal = () =>
  Ed25519KeyIdentity.generate(
    Uint8Array.from(getSubAccountArray(2))
  ).getPrincipal();

import { createAgent } from "@dfinity/utils";

export function getIdentity(): Identity {
  return Ed25519KeyIdentity.generate(Uint8Array.from(getSubAccountArray(2)));
}
export function getSubAccountArray(subaccount: number): number[] {
  return Array(28)
    .fill(0)
    .concat(to32Bits(subaccount ? subaccount : 0));
}

export function to32Bits(number: number): number[] {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, number);
  return Array.from(new Uint8Array(b));
}

export async function getAgent(): Promise<HttpAgent> {
  const agent = await createAgent({
    identity: getIdentity(),
    host: "https://icp-api.io",
  });
  return agent;
}

export async function getLocalAgent(): Promise<HttpAgent> {
  const agent = await createAgent({
    identity: getIdentity(),
    host: "http://localhost:8080",
  });
  agent.fetchRootKey()
  return agent;
}
