import axios from 'axios';

export const getSolPriceInJPY = async (): Promise<number> => {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=jpy';
    const response = await axios.get(url);
    const rate = response.data.solana.jpy;
    return rate;
  } catch (error) {
    console.error('Error occurred while fetching SOL price in JPY:', error);
    throw error;
  }
};

export const convertJPYToSol = async (amountInJPY: number): Promise<number> => {
  const solPriceInJPY = await getSolPriceInJPY();
  const amountInSOL = amountInJPY / solPriceInJPY;
  return amountInSOL;
};

// 実際の使用例
convertJPYToSol(5)
  .then(amountInSOL => console.log(`¥5 is approximately equal to ${amountInSOL} SOL`))
  .catch(error => console.error('Error converting JPY to SOL:', error));
