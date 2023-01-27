import NodeRSA from 'node-rsa';

const key = new NodeRSA({ b: 512 });
export const generatePublicKey = () => key.exportKey('pkcs1-public-pem');
export const generatePrivateKey = () => key.exportKey('pkcs1-private-pem');
