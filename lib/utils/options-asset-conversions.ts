import {
  OptionsAssets,
  OptionsAssetsByNames,
  OptionsAssetsIcrc,
  OptionsContractState,
  OptionsType,
} from '@/declarations/options/options.did';

export function convertOptionsAssetsIntoString(asset: OptionsAssets): string {
  if ('BTC' in asset) return 'CKBTC';
  if ('ETH' in asset) return 'CKETH';
  if ('ICRC' in asset) {
    const icrcAsset = asset['ICRC'];
    if ('ICP' in icrcAsset) return 'ICP';
    if ('CKUSDT' in icrcAsset) return 'CKUSDT';
    if ('CKBTC' in icrcAsset) return 'CKBTC';
    if ('CKETH' in icrcAsset) return 'CKETH';
  }
  throw new Error('Unknown asset type');
}

export function convertOptionsTypeIntoString(option: OptionsType): string {
  if ('PUT' in option) return 'PUT';
  if ('CALL' in option) return 'CALL';
  throw new Error('Unknown options type');
}

export function convertOptionsAssetsToOptionsAssetsByNames(
  asset: OptionsAssets
): OptionsAssetsByNames {
  if ('BTC' in asset) return { CKBTC: null };
  if ('ETH' in asset) return { CKETH: null };
  if ('ICRC' in asset) {
    const icrcAsset = asset['ICRC'];
    if ('ICP' in icrcAsset) return { ICP: null };
    if ('CKUSDT' in icrcAsset) return { USDT: null }; // Renaming CKUSDT to USDT
    if ('CKBTC' in icrcAsset) return { CKBTC: null };
    if ('CKETH' in icrcAsset) return { CKETH: null };
  }
  throw new Error('Unknown asset type');
}

export function convertOptionsContractStateToString(
  state: OptionsContractState
): string {
  if ('EXECUTED' in state) return 'EXECUTED';
  if ('OPEN' in state) return 'OPEN';
  if ('EXPIRED' in state) return 'EXPIRED';
  if ('OFFER' in state) return 'OFFER';
  if ('CLOSED' in state) return 'CLOSED';
  throw new Error('Unknown contract state');
}

export function convertOptionsAssetsToOptionsAssetsIcrc(
  asset: OptionsAssets
): OptionsAssetsIcrc {
  if ('ICRC' in asset) {
    return asset.ICRC;
  } else if ('BTC' in asset) {
    return { CKBTC: null };
  } else if ('ETH' in asset) {
    return { CKETH: null };
  } else {
    throw new Error('Invalid conversion: Input does not contain ICRC.');
  }
}
