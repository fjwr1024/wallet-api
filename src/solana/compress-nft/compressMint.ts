import assert from 'assert';
import { CompressedNft } from '@solana-suite/compressed-nft';
import { Node, Explorer } from '@solana-suite/utils';

export const compressMint = async (
  ownerSecretKey: string,
  file: any,
  treeOwner: string,
  mintCollection: string,
  recieveWalletAddress?: string
) => {
  console.log('#tree owner: ', treeOwner);

  const mintInst = await CompressedNft.mint(
    ownerSecretKey,
    {
      filePath: file,
      name: 'wapi',
      symbol: 'WAPI',
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
