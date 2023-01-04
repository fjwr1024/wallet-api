import { KeypairStr } from '@solana-suite/core';

// Walletの公開鍵と秘密鍵を生成
export const createWallet = async () => {
  const account = await KeypairStr.create();

  console.log('# pubkey: ', account.pubkey);
  console.log('# secret: ', account.secret);

  return account;
};
