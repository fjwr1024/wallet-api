//////////////////////////////////////////////
// $ npx ts-node scripts/solana/getHealth.ts {network}
//////////////////////////////////////////////
import fetch from 'node-fetch';

async function checkSolanaHealth(network: 'mainnet-beta' | 'devnet'): Promise<void> {
  const endpoints = {
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
    devnet: 'https://api.devnet.solana.com',
  };
  const url = endpoints[network];

  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getHealth',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (data.result === 'ok') {
      console.log(`${network} network is healthy.`);
    } else {
      console.log(`${network} network is not healthy:`, data.result);
    }
  } catch (error) {
    console.error(`Error checking ${network} health:`, error);
  }
}

const network = process.argv[2] as 'mainnet-beta' | 'devnet';

if (!['mainnet-beta', 'devnet'].includes(network)) {
  console.error('Please specify "mainnet-beta" or "devnet" as the argument.');
} else {
  checkSolanaHealth(network);
}
