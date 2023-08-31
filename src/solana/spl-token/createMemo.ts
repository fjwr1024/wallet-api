import { Memo } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';
import assert from 'assert';

export const createMemo = async (splToken, comment, walletAddress, secretKey) => {
  console.log('comment', comment);
  console.log('secretKey', secretKey);
  const memo = await Memo.create(comment, walletAddress, secretKey);

  console.log('memo', memo);

  // (await [splToken, memo].submit()).match(
  //   async value => {
  //     console.log('# nft sig: ', value.toExplorerUrl());
  //     await Node.confirmedSig(value);
  //   },
  //   error => console.error(error)
  // );

  memo.submit().then(res =>
    res.match(
      ok => console.log(ok.toExplorerUrl()),
      err => console.error(err)
    )
  );
  return memo;
};
