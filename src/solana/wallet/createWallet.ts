import { Account } from '@solana-suite/utils';

// Walletの公開鍵と秘密鍵を生成
export const createWallet = async () => {
  const account = await Account.Keypair.create();

  console.log('# pubkey: ', account.pubkey);
  console.log('# secret: ', account.secret);

  return account;
};
