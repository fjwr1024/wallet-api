import { CompressedNft } from '@solana-suite/compressed-nft';
import assert from 'assert';

const [, , cnft] = process.argv;

// 関数を定義します。
const findNFTByMint = async (mint: string) => {
  const resMint = await CompressedNft.findByMint(mint);
  resMint.match(
    ok => console.log('# mint info: ', ok),
    err => assert.fail(err)
  );
};

// 関数を実行します。
findNFTByMint(cnft).catch(console.error);
