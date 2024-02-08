import { SplToken } from '@solana-suite/spl-token';
import { Pubkey } from '@solana-suite/utils';
import * as util from 'util';

export const createSplToken = async (totalAmount, decimals, ownerSecretKey, file): Promise<any> => {
  const tokenMetadata = {
    name: 'wallet-api-token',
    symbol: 'WAT',
    royalty: 50,
    filePath: file,
    storageType: 'nftStorage',
    isMutable: false,
  };

  const inst1 = await SplToken.mint(ownerSecretKey, totalAmount, decimals, tokenMetadata);

  console.log('# inst1: ', util.inspect(inst1, { depth: null, showHidden: true }));
  console.log('# inst1: ', inst1);

  const mint = inst1.unwrap().data as Pubkey;

  console.log('# mint: ', mint);

  return inst1.unwrap();
};
