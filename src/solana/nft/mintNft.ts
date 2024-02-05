import { RegularNft } from '@solana-suite/regular-nft';
import { Node, Pubkey } from '@solana-suite/utils';

export const mintNft = async (
  name: string,
  url: string,
  quantity: number,
  description: string,
  ownerSecretKey: string
) => {
  for (let i = 0; i < quantity; i++) {
    console.log('ownerSecret', ownerSecretKey);
    const inst1 = await RegularNft.mint(ownerSecretKey, {
      filePath: url,
      name,
      symbol: 'NFT',
      description,
      royalty: 0,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://github.com/atonoy/solana-suite',
    });

    console.log('inst1', inst1);

    (await inst1.submit()).match(
      async value => await Node.confirmedSig(value, 'finalized'),
      error => console.log(error)
    );

    const mint = inst1.unwrap().data as Pubkey;
    console.log('mint', mint);
  }
  return { message: 'mint completed' };
};
