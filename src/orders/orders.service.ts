import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/data-source';
import { Orders } from 'src/entities/orders.entity';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  async order(ordersDto: OrdersDto): Promise<string> {
    console.log('ordersDto', ordersDto);

    const orders = new Orders();
    orders.user.id = ordersDto.userId;
    orders.amount = ordersDto.amount;

    AppDataSource.manager.save(Orders, orders);
    return 'ok';
  }
}
