import { RegularNft } from '@solana-suite/regular-nft';

export const transferNft = async (mint, ownerWalletAddress, receiptWalletAddress, ownerSecret) => {
  const inst = await RegularNft.transfer(mint, ownerWalletAddress, receiptWalletAddress, [ownerSecret], ownerSecret);

  (await inst.submit()).match(
    value => console.log('# sig: ', value),
    error => console.error('Error:', error)
  );
};
