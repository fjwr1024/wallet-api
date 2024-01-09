import { Node, SplToken } from '@solana-suite/spl-token';

export const transferSplToken = async (
  mintId: string,
  ownerWalletAddress: string,
  recieptWalletAddress: string,
  ownerSecret: string,
  amount: number,
  decimals: number
) => {
  const transfer = await SplToken.transfer(
    mintId,
    ownerWalletAddress,
    recieptWalletAddress,
    [ownerSecret],
    amount,
    decimals
    // 1
  );

  (await transfer.submit()).match(
    async value => {
      console.log('# Transfer sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error(error)
  );
};
