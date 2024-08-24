import { SplToken } from '@solana-suite/spl-token';

export const clientCreateHex = async (
  mintId: string,
  ownerWalletAddress: string,
  ownerSecretKey: string,
  dest: string
) => {
  const hex = await SplToken.gasLessTransfer(mintId, ownerSecretKey, dest, 100, 1, ownerWalletAddress);
  console.log('hex', hex);
  return hex;
};
