import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppDataSource } from 'src/data-source';
import { Orders } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import Stripe from 'stripe';
import { OrdersDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
      typescript: true,
    });
  }

  async order(ordersDto: OrdersDto): Promise<string> {
    const id = ordersDto.userId;

    const res = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!res) {
      throw new NotFoundException('User is not found');
    }

    const charge = await this.stripe.charges.create({
      amount: ordersDto.amount,
      currency: 'usd',
      description: `Order ${new Date()} by ${ordersDto.userId}`,
    });

    console.log('charge', charge);

    const orders = new Orders();
    orders.userId = ordersDto.userId;
    orders.amount = ordersDto.amount;

    AppDataSource.manager.save(Orders, orders);
    return 'ok';
  }
}
