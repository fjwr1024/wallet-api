import { CompressedNft } from '@solana-suite/compressed-nft';
import assert from 'assert';

export const findByOwner = async (cnft: string, owner: string, collectionMint: string) => {
  // Mint info
  const resMint = await CompressedNft.findByMint(cnft);
  resMint.match(
    ok => console.log('# mint info: ', ok),
    err => assert.fail(err)
  );

  // Mint info
  const resOwner = await CompressedNft.findByOwner(owner);
  resOwner.match(
    ok => console.log('# owner info: ', ok),
    err => assert.fail(err)
  );

  // Mint info
  const resCollection = await CompressedNft.findByCollection(collectionMint, {
    limit: 10,
  });
  resCollection.match(
    ok => console.log('# collection info: ', ok),
    err => assert.fail(err)
  );
};
