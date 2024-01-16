import assert from 'assert';
import { Node, Explorer, CompressedNft } from '@solana-suite/compressed-nft';

export const compressMint = async (
  walletAddress: string,
  ownerSecretKey: string,
  file: any,
  treeOwner: string,
  mintCollection: string
) => {
  console.log('#tree owner: ', treeOwner);

  const mintInst = await CompressedNft.mint(
    ownerSecretKey,
    {
      filePath: file,
      name: 'sample',
      symbol: 'SAMPLE',
      royalty: 20,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://external_url',
    },
    treeOwner,
    mintCollection,
    {
      feePayer: ownerSecretKey,
      delegate: walletAddress,
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
