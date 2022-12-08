import assert from 'assert';

import { HttpStatus } from '@nestjs/common';

import { Pubkey } from '@solana-suite/core';
import { Metaplex, StorageNftStorage } from '@solana-suite/nft';

// カスタムパラメーターを付与したNFTStorageアップロード機能
export const uploadContents = async (name, description, image) => {
  const asset = {
    name,
    description,
    image,
  };

  // metadata and image upload
  const url = await StorageNftStorage.uploadMetadata(asset);

  if (url.isErr) {
    assert(url.error);
  }

  return url.unwrap();
};

// 画像単一でNFT登録する関数
export const uploadTestContents = async (name, description, file) => {
  const filePath = file.path;

  const asset = {
    name,
    description,
    image: filePath,
  };

  // metadata and image upload
  const url = await StorageNftStorage.uploadMetadata(asset);
  const urlStr = url.unwrap();

  if (url.isErr) {
    assert(url.error);
  }

  return urlStr;
};

export const createNft = async (name: string, url: string, quantity: number, ownerWalletAddress, ownerSecretKey) => {
  for (let i = 0; i < quantity; i++) {
    const metadata = new Metaplex.Data({
      name,
      symbol: 'NFT',
      uri: url,
      sellerFeeBasisPoints: 0,
      creators: null,
    });

    console.log('metadata', metadata);

    console.log(ownerWalletAddress.toPublicKey());

    const inst1 = await Metaplex.mint(metadata, ownerWalletAddress.toPublicKey(), [ownerSecretKey.secretKey()]);

    console.log('inst1', inst1);

    (await inst1.submit()).match(
      async value => {
        console.log('submit実行');
        await Transaction.confirmedSig(value, 'finalized');
      },
      error => assert.fail(error)
    );

    const mint = inst1.unwrap().data as Pubkey;
    console.log('mint', mint);
  }
  return HttpStatus.OK;
};
