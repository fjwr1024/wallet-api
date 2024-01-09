import { SplToken } from '@solana-suite/spl-token';
import assert from 'assert';

// 指定したSPLトークンの合計を取得
export const getTokenAmount = async (walletAddress: string) => {
  console.log('wallet', walletAddress);

  const amount = await SplToken.findByOwner(
    walletAddress,
    value => console.log('# metadata: ', value),
    error => assert.fail(error)
  );
  console.log('# token history: ', amount);

  return amount;
};
