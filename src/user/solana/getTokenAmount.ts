import { SplToken } from '@solana-suite/core';

// 指定したSPLトークンの合計を取得
export const getTokenAmount = async (walletAddress: string) => {
  const mint = process.env.TOKEN_KEY as string;
  console.log('wallet', walletAddress);

  const amount = await SplToken.findByOwner(walletAddress.toPublicKey());
  console.log('# token history: ', amount.unwrap());

  return amount.unwrap();
};
