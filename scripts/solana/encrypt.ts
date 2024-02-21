//////////////////////////////////////////////
// $ npx ts-node scripts/solana/encrypt.ts 'encrypt target' 'encrypt key'
//////////////////////////////////////////////
import * as crypto from 'crypto';

const [text, keyInput] = process.argv.slice(2);

const key = keyInput.padEnd(32, '\0');

const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');

const output = Buffer.from(iv.toString('hex') + encrypted, 'hex').toString('base64');

console.log(output);
