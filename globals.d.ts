export type PropUnionType = number | string;

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ic: any;
    ethereum: any;
    localStorage: any;
    window: any;
  }
}
