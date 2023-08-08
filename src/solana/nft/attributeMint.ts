import { Metaplex } from '@solana-suite/nft';
import { KeypairAccount, Pubkey } from '@solana-suite/shared';
import assert from 'assert';

export const attributeMint = async (
  file: ArrayBuffer,
  name: string,
  description: string,
  walletAddress: string,
  ownerSecretKey: string,
  attributes: any
) => {
  const inst = await Metaplex.mint(walletAddress, ownerSecretKey, {
    filePath: file,
    storageType: 'nftStorage',
    name,
    symbol: 'NFT',
    royalty: 0,
    attributes,
    isMutable: true,
    external_url: 'https://github.com/atonoy/solana-suite',
  });

  (await inst.submit()).match(
    (ok: string) => {
      const mint = inst.unwrap().data as Pubkey;
      console.log('# mint:', mint);
      console.log('# sig:', ok);
    },
    (ng: Error) => assert.fail(ng.message)
  );
};
