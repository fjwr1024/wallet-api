import { SplToken, Pubkey } from '@solana-suite/core';
import { StorageType } from '@solana-suite/shared-metaplex';

export const createSplToken = async (totalAmount, decimals, ownerWalletAddress, ownerSecretKey) => {
  console.log(totalAmount);
  console.log(decimals);

  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: '../../uploads/0aea4dae92de4cc1b3d7ead95e1b1f52',
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };

  const inst1 = await SplToken.mint(
    ownerWalletAddress.toPublicKey(),
    ownerSecretKey.toKeypair(),
    totalAmount,
    decimals,
    tokenMetadata
  );

  const mint = inst1.unwrap().data as Pubkey;

  console.log('# mint: ', mint);

  return mint;
};
