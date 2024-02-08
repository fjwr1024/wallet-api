import assert from 'assert';
import { CompressedNft } from '@solana-suite/compressed-nft';
import { Node, Pubkey } from '@solana-suite/utils';

export const createCollection = async (ownerSecretKey: string, file: any): Promise<Pubkey> => {
  const collectionInst = await CompressedNft.mintCollection(
    ownerSecretKey,
    {
      filePath: file,
      name: 'BCL',
      symbol: 'BCL',
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
