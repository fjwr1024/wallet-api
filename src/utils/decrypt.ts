import crypto from 'crypto-js';
export const decryptSecretKey = (key: string, encryptedText: string) => {
  const decrypted = crypto.AES.decrypt(key, encryptedText);
  console.log('decrypted', decrypted);

  // 復号化直後はバイナリデータなので、UTF-8で元の文字列に戻す
  const txtDecrypted = decrypted.toString(crypto.enc.Utf8);
  return txtDecrypted;
};
