import assert from 'assert';

import { Metaplex } from '@solana-suite/nft';

// mintをkeyにuserの所持しているmetadataを取得
export const getNftMetadata = async mint => {
  const mintArr = mint.map(obj => obj.mint);

  const response = [];

  for (let i = 0; i < mintArr.length; i++) {
    const metadata = await Metaplex.findByOwner(mintArr[i].toPublicKey());

    metadata.match(
      value => console.log('# metadata: ', value),
      error => assert(error)
    );
    const merged: object = Object.assign({}, metadata.unwrap(), mint[i]);

    response.push(merged);
  }
  console.log('arr', response);
  return response;
};

// 指定したウォレットアドレスの持っているNFT情報を取得する
export const displayUserMetadata = async (walletAddress: string) => {
  const metadata = await Metaplex.findByOwner(walletAddress.toPublicKey());

  metadata.match(
    value => console.log('# metadata: ', value),
    error => assert(error)
  );

  return metadata.unwrap();
};

// 自身の所有しているトークン情報を取得
export const getTokenInfoOwned = async walletAddress => {
  const response = await (await Metaplex.findByOwner(walletAddress.toPublicKey())).unwrap();

  console.log('自身の所有しているトークン情報', response);

  return response;
};
