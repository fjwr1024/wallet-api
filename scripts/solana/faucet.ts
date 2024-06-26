//////////////////////////////////////////////
// $ npx ts-node scripts/solana/faucet.ts {walletAddress}
//////////////////////////////////////////////
import { Airdrop } from '@solana-suite/airdrop';

const [, , walletAddress] = process.argv;

const addSol = async (address: string): Promise<string> => {
  try {
    await Airdrop.request(address);
    return `Successfully added SOL to ${address}.`;
  } catch (error) {
    console.error(`Error while trying to airdrop SOL to ${address}:`, error);
    return `Failed to add SOL to ${address}. Check the logs for details.`;
  }
};

(async () => {
  const result = await addSol(walletAddress);
  console.log(result);
})();
