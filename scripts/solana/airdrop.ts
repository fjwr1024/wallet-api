//////////////////////////////////////////////
// $ npx ts-node scripts/airdrop.ts
//////////////////////////////////////////////

import { Airdrop, SplToken } from '@solana-suite/core';
import { KeypairAccount } from '@solana-suite/shared';
import 'dotenv/config';

// 開発用の SOL を1SOL取得
const airdrop = async () => {
  const owner = KeypairAccount.create();

  console.log('#owner', owner);

  await Airdrop.request(owner.pubkey);

  console.log('# owner balance: ', await SplToken.findByOwner(owner));
};

airdrop();
