import { Storage } from '@solana-suite/storage';
import { Account, sleep } from '@solana-suite/utils';

export const upload = async (filePath: string, ownerSecretKey: string): Promise<any> => {
  const res = await Storage.uploadFile(filePath, 'arweave', {
    feePayer: ownerSecretKey,
  });
  console.log('upload res', res);
  return res;
};
