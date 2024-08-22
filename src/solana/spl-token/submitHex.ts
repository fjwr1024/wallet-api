import assert from 'assert';

import { Result } from '@solana-suite/utils';

export const submitHex = async (hex: any, ownerSecretKey: string) => {
  console.log(ownerSecretKey);
  console.log(hex);

  const obj = Result.ok(hex.unwrap().hexInstruction);
  const res = await obj.submit({ feePayer: ownerSecretKey });
  res.match(
    ok => console.log('# tx signature: ', ok),
    err => assert.fail(err.message)
  );
  return res;
};
