import { SolNative } from '@solana-suite/core';

// TODO: return type fix
export const getSolNative: any = async (walletAddress: string) => {
  const sol = await SolNative.findByOwner(walletAddress.toPublicKey());
  sol.isOk && console.log('# ex1: ', sol.value);

  if (sol.isOk) {
    console.log('# ex1: ', sol.value);
  } else if (sol.isErr) {
    console.log('# ex1 error: ', sol.error);
  }

  return sol.unwrap();
};
