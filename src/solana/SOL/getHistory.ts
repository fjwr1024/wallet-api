import { FilterType, SolNative } from '@solana-suite/sol-native';
import assert from 'assert';

export const getSolNativeHistory = async (secretKey: string, walletAddress: string, feePayer: string) => {
  const res = await SolNative.gasLessTransfer(secretKey, walletAddress, 0.000000001, walletAddress);

  return res;
};
