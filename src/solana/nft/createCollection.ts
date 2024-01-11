import assert from 'assert';
import { CompressedNft, Node } from '@solana-suite/compressed-nft';

export const createCollection = async (ownerSecretKey: string, file: any) => {
  const collectionInst = await CompressedNft.mintCollection(
    ownerSecretKey,
    {
      filePath: file,
      name: 'NFTCollection',
      symbol: 'CNFT',
      royalty: 0,
      storageType: 'nftStorage',
      isMutable: true,
    },
    {
      feePayer: ownerSecretKey,
    }
  );

  (await collectionInst.submit()).match(
    async value => {
      await Node.confirmedSig(value);
    },
    error => assert.fail(error.message)
  );

  const mintCollection = collectionInst.unwrap().data;
  console.log('# mintCollection: ', mintCollection);
  return mintCollection;
};
