import { SplToken } from '@solana-suite/core';

export const getTransactionHistory = async (mint, owner) => {
  const hist1 = await SplToken.getHistory(
    mint, // used mint
    owner // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());
  return hist1.unwrap();
};
