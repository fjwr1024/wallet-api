import { Metaplex } from '@solana-suite/nft';

export const transferNft = async (mint, ownerWalletAddress, receiptWalletAddress, ownerSecret) => {
  const inst = await Metaplex.transfer(mint, ownerWalletAddress, receiptWalletAddress, [ownerSecret], ownerSecret);

  (await inst.submit()).match(
    value => console.log('# sig: ', value),
    error => console.error('Error:', error)
  );
};
