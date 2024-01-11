import assert from 'assert';
import { Node, Explorer, CompressedNft } from '@solana-suite/compressed-nft';

export const compressMint = async (ownerSecretKey: string, file: any, treeOwner: any, mintCollection: any) => {
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
    // treeOwner,
    '65nUg2M1hq3tpbhapEoLypzF3gt2Kkm6oMDrHG3QinX5',
    mintCollection,
    {
      feePayer: ownerSecretKey,
      delegate: 'C2hQa7HUJmt819JEhELayi6HqXSQMYGa5qJYej9BUuCu',
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
