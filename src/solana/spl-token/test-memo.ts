import { Memo, SplToken } from '@solana-suite/core';
import { Node } from '@solana-suite/shared';

const createMemo = async (splToken, comment, walletAddress, secretKey) => {
  const memo = Memo.create(comment, walletAddress, secretKey);

  (await [splToken, memo].submit()).match(
    async value => {
      console.log('# memo sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    error => console.error('error', error)
  );

  return memo;
};

const comment = 'test';
const walletAddress = '4KSN3YFXHeZh5uJUmPaw7KVVszjLMLtvzzyysXSvAygW';
const secretKey = '51VyCAtBw8mPRVYCbAZRHrgoDw6i9NtMYjFkaktsW6pYond3jeoujSCMFRVvMn7QENCKzVkocqv5noCd5XPpkLmY';
const splToken = {
  value: {
    submit: {},
    instructions: [
      {
        keys: [
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  45827336, 34096457, 43028340, 37965478, 35135749, 11528336, 15352582, 30651987, 17951347, 1072657, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: true,
            isWritable: true,
          },
        ],
        programId: {
          _bn: {
            negative: 0,
            words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            length: 1,
            red: null,
          },
        },
        data: {
          type: 'Buffer',
          data: [
            0, 0, 0, 0, 96, 77, 22, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 6, 221, 246, 225, 215, 101, 161, 147, 217,
            203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
          ],
        },
      },
      {
        keys: [
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  45827336, 34096457, 43028340, 37965478, 35135749, 11528336, 15352582, 30651987, 17951347, 1072657, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [0, 49701504, 64245309, 2256519, 56154862, 55753823, 13407427, 24200326, 18290988, 109045, 0],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: {
          _bn: {
            negative: 0,
            words: [50266281, 54354271, 58266536, 62225772, 1881221, 62578283, 12457068, 42356583, 48355173, 112509, 0],
            length: 10,
            red: null,
          },
        },
        data: {
          type: 'Buffer',
          data: [
            0, 1, 49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84, 247, 66, 116, 100, 70, 132, 161, 152, 106,
            149, 32, 79, 241, 85, 157, 116, 217, 209, 171, 1, 49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84,
            247, 66, 116, 100, 70, 132, 161, 152, 106, 149, 32, 79, 241, 85, 157, 116, 217, 209, 171,
          ],
        },
      },
      {
        keys: [
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  39291450, 44644037, 51947622, 23760763, 62565301, 66029195, 33833596, 10116734, 65692762, 2490865, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  45827336, 34096457, 43028340, 37965478, 35135749, 11528336, 15352582, 30651987, 17951347, 1072657, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                length: 1,
                red: null,
              },
            },
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  50266281, 54354271, 58266536, 62225772, 1881221, 62578283, 12457068, 42356583, 48355173, 112509, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: {
          _bn: {
            negative: 0,
            words: [
              65665113, 60749366, 17317960, 40332284, 51075603, 19104608, 64029329, 36161260, 26168868, 2303433, 0,
            ],
            length: 10,
            red: null,
          },
        },
        data: {
          type: 'Buffer',
          data: [],
        },
      },
      {
        keys: [
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  45827336, 34096457, 43028340, 37965478, 35135749, 11528336, 15352582, 30651987, 17951347, 1072657, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  39291450, 44644037, 51947622, 23760763, 62565301, 66029195, 33833596, 10116734, 65692762, 2490865, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isSigner: true,
            isWritable: false,
          },
        ],
        programId: {
          _bn: {
            negative: 0,
            words: [50266281, 54354271, 58266536, 62225772, 1881221, 62578283, 12457068, 42356583, 48355173, 112509, 0],
            length: 10,
            red: null,
          },
        },
        data: {
          type: 'Buffer',
          data: [14, 232, 3, 0, 0, 0, 0, 0, 0, 1],
        },
      },
      {
        keys: [
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  38997312, 53092152, 29142938, 17650080, 39178777, 50514991, 24686417, 27976758, 47108261, 3118058, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isWritable: true,
            isSigner: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  45827336, 34096457, 43028340, 37965478, 35135749, 11528336, 15352582, 30651987, 17951347, 1072657, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isWritable: false,
            isSigner: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isWritable: false,
            isSigner: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isWritable: true,
            isSigner: true,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [
                  14274987, 5597021, 22152447, 42361258, 6571652, 20828317, 63887813, 66049302, 24389182, 807692, 0,
                ],
                length: 10,
                red: null,
              },
            },
            isWritable: false,
            isSigner: false,
          },
          {
            pubkey: {
              _bn: {
                negative: 0,
                words: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                length: 1,
                red: null,
              },
            },
            isWritable: false,
            isSigner: false,
          },
        ],
        programId: {
          _bn: {
            negative: 0,
            words: [
              66595142, 28602112, 64705691, 30173827, 22591596, 46215411, 30746614, 32576738, 28435409, 187417, 0,
            ],
            length: 10,
            red: null,
          },
        },
        data: {
          type: 'Buffer',
          data: [
            33, 18, 0, 0, 0, 115, 111, 108, 97, 110, 97, 45, 115, 117, 105, 116, 101, 45, 116, 111, 107, 101, 110, 3, 0,
            0, 0, 83, 83, 84, 80, 0, 0, 0, 104, 116, 116, 112, 115, 58, 47, 47, 105, 112, 102, 115, 46, 105, 111, 47,
            105, 112, 102, 115, 47, 98, 97, 102, 107, 114, 101, 105, 97, 109, 104, 98, 111, 118, 121, 108, 98, 106, 106,
            104, 118, 113, 102, 103, 98, 100, 117, 106, 107, 101, 107, 118, 51, 112, 104, 122, 50, 116, 118, 100, 107,
            121, 113, 109, 54, 120, 106, 98, 119, 100, 52, 103, 116, 116, 55, 117, 100, 99, 101, 117, 0, 0, 0, 0, 0, 1,
            0,
          ],
        },
      },
    ],
    signers: [
      {
        _keypair: {
          publicKey: {
            type: 'Buffer',
            data: [
              49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84, 247, 66, 116, 100, 70, 132, 161, 152, 106, 149,
              32, 79, 241, 85, 157, 116, 217, 209, 171,
            ],
          },
          secretKey: {
            type: 'Buffer',
            data: [
              200, 127, 171, 137, 246, 130, 134, 5, 25, 129, 87, 218, 202, 40, 33, 176, 212, 165, 168, 152, 91, 0, 40,
              152, 53, 65, 133, 158, 40, 5, 15, 82, 49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84, 247, 66,
              116, 100, 70, 132, 161, 152, 106, 149, 32, 79, 241, 85, 157, 116, 217, 209, 171,
            ],
          },
        },
      },
      {
        _keypair: {
          publicKey: {
            type: 'Buffer',
            data: [
              65, 120, 69, 17, 234, 115, 116, 237, 148, 206, 164, 48, 98, 191, 162, 66, 24, 33, 5, 144, 211, 169, 169,
              8, 247, 72, 33, 21, 38, 187, 69, 8,
            ],
          },
          secretKey: {
            type: 'Buffer',
            data: [
              251, 10, 63, 208, 68, 76, 181, 74, 155, 197, 165, 125, 35, 16, 237, 126, 134, 200, 236, 66, 143, 149, 44,
              149, 174, 31, 225, 101, 59, 235, 158, 106, 65, 120, 69, 17, 234, 115, 116, 237, 148, 206, 164, 48, 98,
              191, 162, 66, 24, 33, 5, 144, 211, 169, 169, 8, 247, 72, 33, 21, 38, 187, 69, 8,
            ],
          },
        },
      },
    ],
    feePayer: {
      _keypair: {
        publicKey: {
          type: 'Buffer',
          data: [
            49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84, 247, 66, 116, 100, 70, 132, 161, 152, 106, 149,
            32, 79, 241, 85, 157, 116, 217, 209, 171,
          ],
        },
        secretKey: {
          type: 'Buffer',
          data: [
            200, 127, 171, 137, 246, 130, 134, 5, 25, 129, 87, 218, 202, 40, 33, 176, 212, 165, 168, 152, 91, 0, 40,
            152, 53, 65, 133, 158, 40, 5, 15, 82, 49, 76, 49, 116, 38, 62, 251, 245, 69, 188, 237, 156, 84, 247, 66,
            116, 100, 70, 132, 161, 152, 106, 149, 32, 79, 241, 85, 157, 116, 217, 209, 171,
          ],
        },
      },
    },
    data: '5QZsKY9dHxUXzYJUrgPJgueKkS6GpEy9LbcgH4SV1GSb',
  },
  isOk: true,
  isErr: false,
};

createMemo(splToken, comment, walletAddress, secretKey);
