import { Memo, SplToken } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';
import assert from 'assert';

export const createMemo = async (splToken, comment, walletAddress, secretKey) => {
  console.log('comment', comment);
  console.log('walletAddress', walletAddress);
  console.log('secretKey', secretKey);

  const memo = Memo.create(comment, walletAddress, secretKey);

  console.log('memo', memo);

  (await [splToken, memo].submit()).match(
    async value => {
      console.log('# memo sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error(error)
  );

  return memo;
};
