//////////////////////////////////////////////
// $ npx ts-node scripts/solana/decrypt.ts 'decrypt target' 'decrypt key'
/////////////////////////////////////////////
import * as crypto from 'crypto';

const [, , encryptedData, keyInput] = process.argv;

const key = keyInput.padEnd(32, '\0');

const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
const iv = encryptedDataBuffer.slice(0, 16);
const encryptedText = encryptedDataBuffer.slice(16);

const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
let decrypted = decipher.update(encryptedText);
decrypted = Buffer.concat([decrypted, decipher.final()]);

console.log(decrypted.toString('utf-8'));
