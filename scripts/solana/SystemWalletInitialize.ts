//////////////////////////////////////////////
// $ npx ts-node scripts/SystemWalletInitialize.ts
//////////////////////////////////////////////
import { Airdrop } from '@solana-suite/core';
import { KeypairAccount } from '@solana-suite/shared';

const createWallet = async () => {
  const account = await KeypairAccount.create();

  await Airdrop.request(account.pubkey);

  console.log('# pubkey: ', account.pubkey);
  console.log('# secret: ', account.secret);

  return account;
};

createWallet()
  .then(res => {
    console.log('以下を環境変数に設定');
    console.log(`SYSTEM_WALLET_ADDRESS: ${res.pubkey}`);
    console.log('以下を環境変数に設定');
    console.log(`SYSTEM_WALLET_SECRET: ${res.secret}`);
  })
  .catch(er => {
    console.error(er);
    process.exit(-1);
  })
  .finally(async () => {
    process.exit();
  });
