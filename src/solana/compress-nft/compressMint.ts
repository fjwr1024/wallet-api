import { CompressedNft } from '@solana-suite/compressed-nft';
import { Explorer } from '@solana-suite/utils';

export const compressMint = async (
  ownerSecretKey: string,
  imageData: any,
  treeOwner?: string,
  mintCollection?: string,
  recieveWalletAddress?: string,
  videoData?: any
) => {
  console.log('#ownerSecretKey: ', ownerSecretKey);
  console.log('#tree owner: ', treeOwner);
  console.log('#mint collection: ', mintCollection);

  const mintInst = await CompressedNft.mint(
    ownerSecretKey,
    {
      filePath: imageData,
      name: 'WAPIC',
      symbol: 'WAPI',
      description: '11:42',
      royalty: 0,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://external_url',
    },
    treeOwner,
    mintCollection,
    {
      receiver: recieveWalletAddress,
      feePayer: ownerSecretKey,
    }
  );

  console.log('# mintInst: ', mintInst);

  const res = (await mintInst.submit()).map(
    async value => value,
    (ng: Error) => {
      console.error(ng.message);
      throw ng;
    }
  );

  const sig = await res.unwrap();
  console.log('# sig: ', sig.toExplorerUrl(Explorer.Xray));
  const mint = (await CompressedNft.findMintIdBySignature(sig)).unwrap();
  console.log('# mint: ', mint);

  return mint;
};
