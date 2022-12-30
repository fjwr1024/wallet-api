import assert from 'assert';

import { Pubkey } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';
import { Metaplex, StorageNftStorage } from '@solana-suite/nft';

export const uploadContents = async (name, description, image) => {
  const asset = {
    name,
    description,
    image,
  };

  const url = await StorageNftStorage.uploadMetadata(asset);

  if (url.isErr) {
    assert(url.error);
  }

  return url.unwrap();
};

export const uploadTestContents = async (name, description, file) => {
  const filePath = file.path;

  const asset = {
    name,
    description,
    image: filePath,
  };

  const url = await StorageNftStorage.uploadMetadata(asset);
  const urlStr = url.unwrap();

  if (url.isErr) {
    assert(url.error);
  }

  return urlStr;
};

export const mintNft = async (
  name: string,
  url: string,
  quantity: number,
  ownerWalletAddress: string,
  ownerSecretKey: string
) => {
  for (let i = 0; i < quantity; i++) {
    console.log('ownerSecret', ownerSecretKey);
    const inst1 = await Metaplex.mint(
      {
        filePath: url,
        name,
        symbol: 'NFT',
        royalty: 0,
        storageType: 'nftStorage',
        isMutable: true,
        external_url: 'https://github.com/atonoy/solana-suite',
      },
      ownerSecretKey.toKeypair(),
      ownerSecretKey.toKeypair()
    );

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
