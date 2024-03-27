import { Storage } from '@solana-suite/storage';

export const uploadFileArweave = async (filePath: string, ownerSecretKey: string): Promise<any> => {
  const res = await Storage.uploadFile(filePath, 'arweave', {
    feePayer: ownerSecretKey,
  });
  console.log('upload res', res.unwrap());
  return res;
};
