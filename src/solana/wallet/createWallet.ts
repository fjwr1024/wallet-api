import { KeypairAccount } from '@solana-suite/shared';

// Walletの公開鍵と秘密鍵を生成
export const createWallet = async () => {
  const account = await KeypairAccount.create();

  console.log('# pubkey: ', account.pubkey);
  console.log('# secret: ', account.secret);

  return account;
};
