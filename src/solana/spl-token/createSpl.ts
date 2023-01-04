import { SplToken, Pubkey } from '@solana-suite/core';

export const createSplToken = async (totalAmount, decimals, ownerWalletAddress, ownerSecretKey) => {
  console.log(totalAmount);
  console.log(decimals);

  const inst1 = await SplToken.mint(
    ownerWalletAddress.toPublicKey(),
    [ownerSecretKey.toKeypair()],
    totalAmount,
    decimals
  );

  const mint = inst1.unwrap().data as Pubkey;

  console.log('# mint: ', mint);

  return mint;
};
