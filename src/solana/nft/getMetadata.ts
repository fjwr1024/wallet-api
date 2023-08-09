import assert from 'assert';

import { Metaplex } from '@solana-suite/nft';

// export const getTokenInfoOwned = async walletAddress => {
//   console.log('walletAddress', walletAddress);
//   console.log('walletAddress', typeof walletAddress);

//   const response = await Metaplex.findByOwner(
//     walletAddress,
//     // value => console.log('# metadata: ', value),
//     value => console.log('# metadata: '),
//     // error => assert.fail(error)
//     error => console.error('Error:', error)
//   );

//   console.log('owned token info', response);

//   return response;
// };

// import assert from 'assert';
// import { Metaplex } from '@solana-suite/nft';

export const getTokenInfoOwned = async walletAddress => {
  return new Promise((resolve, reject) => {
    const results = []; // 結果を格納する配列

    Metaplex.findByOwner(
      walletAddress,
      value => {
        console.log('# metadata: ', value);
        results.push(...value); // 取得したデータをresults配列に追加
      },
      error => {
        if (results.length > 0) {
          resolve(results); // 複数の結果を返す
        } else {
          console.error('Error:', error);
          reject(error);
        }
      }
    );
  });
};
