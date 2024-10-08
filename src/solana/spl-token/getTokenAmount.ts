import { SplToken } from '@solana-suite/spl-token';

// 指定したSPLトークンの合計を取得
export const getTokenAmount = async (walletAddress: string) => {
  console.log('wallet', walletAddress);

  const amount = await SplToken.findByOwner(walletAddress);
  console.log('# token history: ', amount);

  return amount;
};
