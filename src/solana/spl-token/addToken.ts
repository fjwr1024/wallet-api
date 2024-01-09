import { SplToken } from '@solana-suite/spl-token';

export const addToken = async (tokenAddress, owner, secretKey, totalAmount, mintDecimal) => {
  const result = await SplToken.add(tokenAddress, owner, secretKey, totalAmount, mintDecimal);

  return result;
};
