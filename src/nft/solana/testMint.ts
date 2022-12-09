import assert from 'assert';

import { Pubkey } from '@solana-suite/core';
import { Metaplex, StorageNftStorage } from '@solana-suite/nft';

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
