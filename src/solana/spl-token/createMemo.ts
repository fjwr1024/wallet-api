import { Memo, SplToken } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';

export const createMemo = async (splToken: any, comment: string, walletAddress: string, secretKey: string) => {
  const memo = Memo.create(comment, walletAddress, secretKey);

  (await [splToken, memo].submit()).match(
    async value => {
      console.log('# memo sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error('error', error)
  );

  return 'ok';
};
