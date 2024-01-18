//////////////////////////////////////////////
// $ npx ts-node scripts/solana/calcSpaceCost.ts
//////////////////////////////////////////////
import { CompressedNft } from '@solana-suite/compressed-nft';
async function calculateCost(spaceSize: number) {
  try {
    const result = await CompressedNft.calculateSpaceCost(spaceSize);
    console.log(`Required SOL for space size ${spaceSize}: ${result.sol}`);
  } catch (error) {
    console.error(`Error calculating space cost: ${error}`);
  }
}

const spaceSize = process.argv[2] ? parseInt(process.argv[2], 10) : null;

if (spaceSize) {
  calculateCost(spaceSize);
} else {
  console.error('Please provide a space size as an argument.');
}
