import { Memo } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';

export const createMemo = async (splToken, comment, walletAddress, secretKey) => {
  const memo = await Memo.create(comment, walletAddress, secretKey);
  (await [splToken, memo].submit()).match(
    async value => {
      console.log('# nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error(error)
  );
  return memo;
};
