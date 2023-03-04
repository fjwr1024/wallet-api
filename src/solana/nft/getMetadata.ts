import assert from 'assert';

import { Metaplex } from '@solana-suite/nft';

export const getNftMetadata = async mint => {
  const mintArr = mint.map(obj => obj.mint);

  const response = [];

  for (let i = 0; i < mintArr.length; i++) {
    const metadata = await Metaplex.findByOwner(mintArr[i]);

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

export const displayUserMetadata = async (walletAddress: string) => {
  const metadata = await Metaplex.findByOwner(walletAddress);

  metadata.match(
    value => console.log('# metadata: ', value),
    error => assert(error)
  );

  return metadata.unwrap();
};

export const getTokenInfoOwned = async walletAddress => {
  const response = await (await Metaplex.findByOwner(walletAddress)).unwrap();

  console.log('owned token info', response);

  return response;
};
