import { SplToken } from '@solana-suite/core';

export const getTransactionHistory = async (mint, owner) => {
  const hist1 = await SplToken.getHistory(
    mint.toPublicKey(), // used mint
    owner.toPublicKey() // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());
};
