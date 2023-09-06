//////////////////////////////////////////////
// $ npx ts-node scripts/solana/faucet.ts
//////////////////////////////////////////////
import { Airdrop } from '@solana-suite/core';
import { KeypairAccount } from '@solana-suite/shared';

const addSol = async (walletAddress: string): Promise<string> => {
  try {
    await Airdrop.request(walletAddress);
    return `Successfully added SOL to ${walletAddress}.`;
  } catch (error) {
    console.error(`Error while trying to airdrop SOL to ${walletAddress}:`, error);
    return `Failed to add SOL to ${walletAddress}. Check the logs for details.`;
  }
};

(async () => {
  const result = await addSol('mckjwe77c8SX6pEAmCQS7y321PwbmBnZfiNVXaPUTXY');
  console.log(result);
})();
