import crypto from 'crypto-js';

// secret key を暗号化して保存したい場合に使用
// 秘密鍵のDB保存は審査が必要なため、基本的には行わない
const encrypt = async () => {
  const key = 'abcdefgh';
  const secret = '';
  const ciphertext = '';

  const getCiphertext = crypto.AES.encrypt(secret, key).toString();
  const byte = crypto.AES.decrypt(ciphertext, key);
  const getSecret = byte.toString(crypto.enc.Utf8);

  return {
    getCiphertext,
    getSecret,
  };
};

encrypt()
  .then(res => {
    console.log({ res });
  })
  .catch(er => {
    console.error(er);
    process.exit(-1);
  })
  .finally(async () => {
    process.exit();
  });
