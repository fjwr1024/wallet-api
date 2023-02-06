import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Orders } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  async order(ordersDto: OrdersDto): Promise<string> {
    console.log('ordersDto', ordersDto);
    const id = ordersDto.userId;

    const res = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }

    const orders = new Orders();
    orders.userId = ordersDto.userId;
    orders.amount = ordersDto.amount;

    AppDataSource.manager.save(Orders, orders);
    return 'ok';
  }
}
