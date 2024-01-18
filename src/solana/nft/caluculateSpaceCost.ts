import { CompressedNft } from '@solana-suite/compressed-nft';

export const spaceCost = async (mintTotal: number) => {
  const spaceCost = await CompressedNft.calculateSpaceCost(mintTotal);
  console.log('# spaceCost: ', spaceCost);
  return spaceCost;
};
