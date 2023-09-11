import { SplToken } from '@solana-suite/core';
import { Pubkey } from '@solana-suite/shared';
import { StorageType } from '@solana-suite/shared-metaplex';

export const createSplToken = async (totalAmount, decimals, ownerWalletAddress, ownerSecretKey, file) => {
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: file,
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };

  const inst1 = await SplToken.mint(
    'mckjwe77c8SX6pEAmCQS7y321PwbmBnZfiNVXaPUTXY',
    ownerSecretKey,
    totalAmount,
    decimals,
    tokenMetadata
  );

  console.log('# inst1: ', inst1);

  const mint = inst1.unwrap().data as Pubkey;

  console.log('# mint: ', mint);

  return 'ok';
};
