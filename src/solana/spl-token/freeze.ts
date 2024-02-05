import { SplToken } from '@solana-suite/spl-token';
import { Node } from '@solana-suite/utils';

export const freeze = async (mintId, walletAddress, secretKey) => {
  const inst = await SplToken.freeze(mintId, walletAddress, secretKey);
  (await inst.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      console.log('# freeze sig:', ok);
    },
    (ng: Error) => console.error(ng.message)
  );
};
