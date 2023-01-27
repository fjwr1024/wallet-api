import assert from 'assert';

import { NftStorage } from '@solana-suite/storage';

export const uploadTestContents = async (name, description, file) => {
  const filePath = file.path;

  console.log('filePath', filePath);

  const asset = {
    name,
    description,
    image: filePath,
  };

  // metadata and image upload
  const url = await NftStorage.uploadMetadata(asset);
  const urlStr = url.unwrap();

  if (url.isErr) {
    assert(url.error);
  }

  return urlStr;
};
