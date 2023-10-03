import { Metaplex } from '@solana-suite/nft';

export const burnNft = async (mintId, walletAddress, secretKey) => {
  const inst = Metaplex.burn(mintId, walletAddress, secretKey, secretKey);
  (await inst.submit()).match(
    (ok: string) => {
      console.log('# sig:', ok);
    },
    (ng: Error) => console.error(ng.message)
  );
};
