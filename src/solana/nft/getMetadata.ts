import { Metadata } from './../../entities/metadata.entity';
import { CompressedNft } from '@solana-suite/compressed-nft';
import { RegularNft } from '@solana-suite/regular-nft';

// WIP: 空の配列が返却されるため、非同期処理の完了を待つようにする必要がある
export const getOwnedTokenInfo = async walletAddress => {
  const result = [];

  const response = await RegularNft.findByOwner(walletAddress);

  console.log('owned token info', response);
  console.log('result', result);

  return result;
};
export const getCompressTokenList = async (walletAddress: string) => {
  const res = await CompressedNft.findByOwner(walletAddress);
  res.match(
    ok => console.log('# owner info: ', ok),
    err => console.error('# error: ', err)
  );
  return res;
};
