//////////////////////////////////////////////
// $ npx ts-node scripts/solana/faucet.ts
//////////////////////////////////////////////
import { Airdrop } from '@solana-suite/airdrop';

const testAddress = 'mckjwe77c8SX6pEAmCQS7y321PwbmBnZfiNVXaPUTXY';

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
  // wallet addressは各自変更
  const result = await addSol(testAddress);
  console.log(result);
})();
