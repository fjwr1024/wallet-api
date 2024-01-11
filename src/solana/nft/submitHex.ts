// import assert from 'assert';

// import { PartialSignInstruction } from '@solana-suite/shared';

// export const submitHex = async (hex: string, ownerSecretKey: string) => {
//   console.log(ownerSecretKey);
//   console.log(hex);

//   const obj = new PartialSignInstruction(hex);
//   const res = await obj.submit(ownerSecretKey);
//   res.match(
//     ok => console.log('# tx signature: ', ok),
//     err => assert.fail(err.message)
//   );
//   return res;
// };
