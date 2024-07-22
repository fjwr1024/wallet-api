import assert from 'assert';
import { CompressedNft } from '@solana-suite/compressed-nft';
import { Node, Pubkey } from '@solana-suite/utils';

export const createCollection = async (ownerSecretKey: string, file: any): Promise<Pubkey> => {
  const collectionInst = await CompressedNft.mintCollection(
    ownerSecretKey,
    {
      filePath: file,
      name: 'WAPI',
      symbol: 'WAPI',
      royalty: 0,
      storageType: 'filebase',
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
    // error => assert.fail(error.message)
    error => console.error(error.message)
  );

  const mintCollection = collectionInst.unwrap().data;
  console.log('# mintCollection: ', mintCollection);
  return mintCollection;
};
