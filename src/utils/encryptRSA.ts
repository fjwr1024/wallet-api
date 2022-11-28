import { NodeRSA } from 'node-rsa';

export const encryptText = (text: string, publicKey: string) => {
  const key = new NodeRSA({ b: 512 });

  const serverKey = key.importKey(publicKey, 'pkcs1-public-pem');

  // 公開鍵を用いて暗号化
  const encryptedText = serverKey.encrypt(text, 'base64');
  console.log('暗号化したencryptedTargetKey ', encryptedText);

  return encryptedText;
};
