import { SolNative } from '@solana-suite/core';

export const getSolNative = async (walletAddress: string) => {
  const solRes = await SolNative.findByOwner(walletAddress);
  solRes.isOk && console.log('# ex1: ', solRes.value);

  if (solRes.isOk) {
    console.log('# ex1: ', solRes.value);
  } else if (solRes.isErr) {
    console.log('# ex1 error: ', solRes.error);
  }

  return solRes.unwrap();
};
