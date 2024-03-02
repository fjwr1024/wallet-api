//////////////////////////////////////////////
// $ npx ts-node scripts/solana/findByMintCNft.ts {mintID}
//////////////////////////////////////////////
import { CompressedNft } from '@solana-suite/compressed-nft';

const [, , cnft] = process.argv;

const findNFTByMint = async (mint: string) => {
  const resMint = await CompressedNft.findByMint(mint);

  resMint.match(
    ok => console.log('# mint info: ', ok),
    err => console.error(err)
  );
};

findNFTByMint(cnft).catch(console.error);
