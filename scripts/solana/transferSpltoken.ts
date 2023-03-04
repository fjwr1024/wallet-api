import { SplToken, Pubkey, KeypairStr } from '@solana-suite/core';
import { StorageType } from '@solana-suite/shared-metaplex';
import 'dotenv/config';

const transferSplToken = async () => {
  const owner = new KeypairStr(process.env.SYSTEM_WALLET_ADDRESS || '', process.env.SYSTEM_WALLET_SECRET || '');

  const totalAmount = 100000;
  const decimals = 1;
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: '../../uploads/0aea4dae92de4cc1b3d7ead95e1b1f52',
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };
  const inst1 = await SplToken.mint(owner, owner, totalAmount, decimals, tokenMetadata);

  const mint = inst1.unwrap().data as Pubkey;

  // this is SPLtoken ID
  console.log('# mint: ', mint);
};

transferSplToken();
