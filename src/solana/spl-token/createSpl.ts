import { SplToken } from '@solana-suite/spl-token';
import { Pubkey, Node } from '@solana-suite/utils';
import * as util from 'util';

export const createSplToken = async (totalAmount, decimals, ownerSecretKey, file): Promise<any> => {
  const tokenMetadata = {
    name: 'wallet-api-token',
    symbol: 'WAT',
    royalty: 0,
    filePath: file,
    storageType: 'filebase',
    isMutable: false,
  };

  const inst1 = await SplToken.mint(ownerSecretKey, totalAmount, decimals, tokenMetadata);

  console.log('# inst1: ', util.inspect(inst1, { depth: null, showHidden: true }));
  console.log('# inst1: ', inst1);

  const mint = inst1.unwrap().data as Pubkey;

  const token = await (
    await inst1.submit()
  ).match(
    async value => {
      console.log('# Mint sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error(error)
  );

  console.log('# mint: ', mint);
  console.log('# token: ', token);

  return inst1.unwrap();
};
