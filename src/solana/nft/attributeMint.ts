import { RegularNft } from '@solana-suite/regular-nft';
import { Pubkey, Node } from '@solana-suite/utils';
import { readFile } from 'fs/promises';

type Attribute = {
  trait_type: string;
  value: string;
};

type Attributes = Attribute[];

export const attributeMint = async (
  file: any,
  name: string,
  description: string,
  ownerSecretKey: string,
  attributes: Attributes,
  video?: any
) => {
  console.log('ファイル', file);
  console.log('一時パスの動画', video);

  const inst = await RegularNft.mint(ownerSecretKey, {
    filePath: file,
    storageType: 'nftStorage',
    name,
    symbol: 'test',
    description,
    royalty: 0,
    attributes,
    isMutable: true,
    properties: {
      files: [
        {
          type: 'unknown',
          filePath: video,
        },
      ],
    },
  });

  (await inst.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok, 'finalized');

      const mint = inst.unwrap().data as Pubkey;
      console.log('# mint:', mint);
      console.log('# sig:', ok);
    },
    (ng: Error) => console.error(ng.message)
  );
};
