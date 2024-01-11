import { SplToken } from '@solana-suite/spl-token';

export const getTransactionHistory = async owner => {
  const hist = await SplToken.findByOwner(owner);
  return hist;
};
