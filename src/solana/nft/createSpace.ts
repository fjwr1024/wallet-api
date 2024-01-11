import assert from 'assert';
import { Node, CompressedNft } from '@solana-suite/compressed-nft';

export const createSpace = async (secretKey: string, abountMintTotal: any) => {
  const spaceInst = await CompressedNft.createSpace(secretKey, abountMintTotal, {
    feePayer: secretKey,
  });
  const spaceOwner = spaceInst.unwrap().data;
  console.log('# spaceInst: ', spaceInst);
  console.log('# spaceOwner: ', spaceOwner);

  (await spaceInst.submit()).match(
    async value => {
      await Node.confirmedSig(value);
    },
    error => {
      console.error(error);
      assert.fail(error.message);
    }
  );

  const treeOwner = spaceInst.unwrap().data;
  console.log('# treeOwner: ', treeOwner);

  return { spaceOwner: spaceOwner, treeOwner: treeOwner };
};
