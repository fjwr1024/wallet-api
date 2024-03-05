import assert from 'assert';
import { CompressedNft } from '@solana-suite/compressed-nft';
import { Node, Explorer } from '@solana-suite/utils';

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

  console.log('#recieveWalletAddress: ', recieveWalletAddress);

  console.log('#imageData: ', imageData);
  console.log('#videoData: ', videoData);

  const mintInst = await CompressedNft.mint(
    ownerSecretKey,
    {
      filePath: imageData,
      name: 'WAPIC',
      symbol: 'WAPI',
      description: '18:09',
      royalty: 0,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://external_url',
    },
    treeOwner,
    mintCollection,
    {
      // receiver: recieveWalletAddress,
      feePayer: ownerSecretKey,
    }
  );

  console.log('# mintInst: ', mintInst);

  // this is NFT ID
  (await mintInst.submit()).match(
    async value => {
      await Node.confirmedSig(value, 'finalized');
      console.log('# sig: ', value.toExplorerUrl(Explorer.Xray));
    },
    error => assert.fail(error)
  );

  const mint = await mintInst.unwrap().data.getAssetId();
  console.log('# mint: ', mint);
};
