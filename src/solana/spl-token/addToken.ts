import { SplToken } from '@solana-suite/core';

export const addToken = async (tokenAddress, owner, secretKey, totalAmount, mintDecimal) => {
  const result = await SplToken.add(tokenAddress, owner, secretKey, totalAmount, mintDecimal);

  return result;
};
