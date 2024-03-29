import { NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';

export const getUserById = async (id: string): Promise<User> => {
  const user = await AppDataSource.manager.findOneBy(User, {
    id,
  });

  if (!user) {
    throw new NotFoundException('User is not found');
  }

  return user || undefined;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await AppDataSource.manager.findOneBy(User, {
    email,
  });

  if (!user) {
    throw new NotFoundException('User is not found');
  }
  return user || undefined;
};
