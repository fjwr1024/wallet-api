import assert from 'assert';

import { Pubkey } from '@solana-suite/shared';
import { Node } from '@solana-suite/shared';
import { Metaplex } from '@solana-suite/nft';
import { NftStorage } from '@solana-suite/storage';

export const uploadContents = async (name, description, image) => {
  const asset = {
    name,
    description,
    image,
  };

  const url = await NftStorage.uploadMetadata(asset);

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

  const url = await NftStorage.uploadMetadata(asset);
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
  description: string,
  ownerWalletAddress: Pubkey,
  ownerSecretKey: string
) => {
  for (let i = 0; i < quantity; i++) {
    console.log('ownerSecret', ownerSecretKey);
    const inst1 = await Metaplex.mint(ownerWalletAddress, ownerSecretKey, {
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

    // mint の pubkey が NFT のaddress
    const mint = inst1.unwrap().data as Pubkey;
    console.log('mint', mint);
  }
  return { message: 'mint completed' };
};
