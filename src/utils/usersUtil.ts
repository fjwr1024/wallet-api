import { NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';

export const getUserById = async (id: string) => {
  const user = await AppDataSource.manager.findOneBy(User, {
    id,
  });

  if (!user) {
    throw new NotFoundException('User is not found');
  }

  return user;
};
