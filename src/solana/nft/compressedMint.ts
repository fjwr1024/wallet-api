import { Account, CompressedNft, Explorer, Node, sleep } from '@solana-suite/compressed-nft';

export const compressedMint = async (
  mintTotalAmount: number,
  decimals: number,
  walletAddress: string,
  ownerSecretKey: string,
  file: ArrayBuffer,
  name: string,
  description: string,
  attributes: any
) => {
  const abountMintTotal = 10000; // abount mint total number

  const cost = await CompressedNft.calculateSpaceCost(abountMintTotal); // [optional]calculate space cost

  console.log('# space cost: ', cost);
};
