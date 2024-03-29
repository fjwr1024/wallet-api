import { Memo } from '@solana-suite/memo';
import { Node } from '@solana-suite/utils';

export const createMemo = async (splToken: any, comment: string, walletAddress: string, secretKey: string) => {
  const memo = Memo.create(comment, secretKey);

  console.log('splToken', splToken);
  console.log('# memo: ', memo);
  console.log('memo', walletAddress);
  console.log('memo', secretKey);

  (await [splToken, memo].submit()).match(
    async value => {
      console.log('# memo sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.log('error', error)
  );

  return memo;
};
