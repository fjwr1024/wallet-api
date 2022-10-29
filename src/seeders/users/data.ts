import { User } from '../../entities/user.entity';

export const users: User[] = [
  {
    userId: 1,
    email: 'sample@email.com',
    password: 'password',
    walletAddress: 'walletAddress',
    refreshToken: 'fdb8fdbecf1d03ce5e6125c067733c0d51de209c',
    refreshTokenExp: 'a',
    createdAt: new Date('2022-03-08 12:37:51.250062'),
    updatedAt: new Date('2022-03-08 12:37:51.250062'),
  },
];

export interface IUser {
  name: string;
}
