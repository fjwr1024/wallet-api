import { getSolNative } from './../solana/SOL/get-solnative';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import { SolNativeOwnerInfo } from '@solana-suite/core';
import { AddressBook } from 'src/entities/address-book.entity';

@Injectable()
export class UserService {
  async getQueryUser(skip: number, take: number, page: number): Promise<any> {
    const res = await AppDataSource.manager.findAndCount(User, {
      order: { id: 'ASC' },
      skip,
      take,
    });

    const _page = Number(page);

    const [result, total] = res;
    const lastPage = Math.ceil(total / take);
    const nextPage = _page + 1 > lastPage ? null : _page + 1;
    console.log('nextPage', nextPage);

    const prevPage = page - 1 < 1 ? null : page - 1;
    console.log('prevPage', prevPage);

    console.log('res', res);
    return res;
  }

  async getAllUser(): Promise<any> {
    const res = await AppDataSource.manager.findAndCount(User);

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async getUserInfo(id: string): Promise<User> {
    const res = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async getWalletAddress(id: string): Promise<User[]> {
    const res = await AppDataSource.manager.find(User, {
      select: {
        walletAddress: true,
      },
      where: {
        id,
      },
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }

  async updateUserPassword(id, password) {
    const user = await AppDataSource.manager.findOneBy(User, {
      id,
    });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await AppDataSource.manager.update(User, id, {
      password: hashedPassword,
    });

    return 'ok';
  }

  async getWalletSolNative(getSolNativeDto): Promise<SolNativeOwnerInfo> {
    const res = getSolNative(getSolNativeDto.walletAddress);
    console.log('sol res', res);
    return res;
  }

  async getUserAddress(id: string): Promise<any> {
    const res = await AppDataSource.manager.findOne(User, {
      where: {
        id,
      },
      relations: ['addressBook'],
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }
    return res;
  }
}
