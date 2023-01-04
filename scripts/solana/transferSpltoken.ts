import { SplToken, Pubkey, KeypairStr } from '@solana-suite/core';
import 'dotenv/config';

const transferSplToken = async () => {
  const owner = new KeypairStr(process.env.SYSTEM_WALLET_ADDRESS || '', process.env.SYSTEM_WALLET_SECRET || '');

  const totalAmount = 100000;
  const decimals = 1;
  const inst1 = await SplToken.mint(owner.toPublicKey(), [owner.toKeypair()], totalAmount, decimals);

  const mint = inst1.unwrap().data as Pubkey;

  // this is SPLtoken ID
  console.log('# mint: ', mint);
};

transferSplToken();
