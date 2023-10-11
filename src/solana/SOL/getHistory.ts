import { FilterType, SolNative } from '@solana-suite/core';
import assert from 'assert';

export const getSolNativeHistory = async (walletAddress: string) => {
  const res = await SolNative.getHistory(
    walletAddress,
    FilterType.Transfer,
    _ => assert.fail('Dont go through here'),
    err => assert(err.message)
  );

  return res;
};
