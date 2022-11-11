import { DirectionFilter, SplToken } from '@solana-suite/core';

export const getTransactionHistory = async (mint, owner, receipt) => {
  const hist1 = await SplToken.getHistory(
    mint.toPublicKey(), // used mint
    owner.toPublicKey() // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());

  const hist2 = await SplToken.getHistory(mint.toPublicKey(), receipt.toPublicKey(), {
    directionFilter: DirectionFilter.Dest, // Dest or Source
  });
  console.log('# token history result by destination filter : ', hist2.unwrap());
};
