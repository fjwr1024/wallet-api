import { FilterType, SplToken } from '@solana-suite/core';
import assert from 'assert';

export const getTransactionHistory = async (mint, owner) => {
  const hist1 = await SplToken.getHistory(
    mint,
    FilterType.Transfer,
    histories => {
      histories.forEach(history => console.log(history));
    },
    err => assert.fail(err.message)
  );
  console.log('# token history by publish: ', hist1);
  return hist1;
};
