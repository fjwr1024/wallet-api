import NodeRSA from 'node-rsa';

const key = new NodeRSA({ b: 512 });

// RSA公開鍵のPEMを生成
export const generatePublicKey = () => key.exportKey('pkcs1-public-pem');

// RSA秘密鍵のPEMを生成
export const generatePrivateKey = () => key.exportKey('pkcs1-private-pem');
