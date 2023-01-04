import { SolNative } from '@solana-suite/core';

export const getSolNative = async walletAddress => {
  const ex1 = await SolNative.findByOwner(walletAddress.toPublicKey());
  ex1.isOk && console.log('# ex1: ', ex1.value);

  if (ex1.isOk) {
    console.log('# ex1: ', ex1.value);
  } else if (ex1.isErr) {
    console.log('# ex1 error: ', ex1.error);
  }
};
