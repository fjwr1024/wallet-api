import { CompressedNft } from '@solana-suite/compressed-nft';

export const createSpace = async (secretKey: string, abountMintTotal: any) => {
  const spaceInst = await CompressedNft.createSpace(secretKey, abountMintTotal, {
    feePayer: secretKey,
  });
  const spaceOwner = spaceInst.unwrap().data;
  console.log('# spaceOwner: ', spaceOwner);

  return spaceOwner;
};
