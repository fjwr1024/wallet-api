import assert from 'assert';

import { Metaplex } from '@solana-suite/nft';

export const getTokenInfoOwned = async walletAddress => {
  const response = await Metaplex.findByOwner(
    walletAddress,
    value => console.log('# metadata: ', value),
    error => assert.fail(error)
  );

  console.log('owned token info', response);

  return response;
};

// import assert from 'assert';
// import { Metaplex } from '@solana-suite/nft';

// export const getTokenInfoOwned = async walletAddress => {
//   return new Promise((resolve, reject) => {
//     Metaplex.findByOwner(
//       walletAddress,
//       value => {
//         console.log('# metadata: ', value);
//         resolve(value); // valueをPromiseとして返します。
//       },
//       error => {
//         console.error('Error:', error);
//         // assert.fail(error);
//         reject(error); // エラーをPromiseとして返します。
//       }
//     );
//   });
// };
