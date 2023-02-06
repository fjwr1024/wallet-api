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

    const user = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    if (user.stripeCustomerId == null) {
      const customer = await this.stripe.customers.create();
      await AppDataSource.manager.update(User, { id }, { stripeCustomerId: customer.id });
    }

    //TODO: sourceを画面から受け取り変数に変更
    const charge = await this.stripe.charges.create({
      amount: ordersDto.amount,
      currency: 'usd',
      description: `Order ${new Date()} by ${ordersDto.userId}`,
      source: 'tok_visa',
    });

    console.log('charge', charge);

    const orders = new Orders();
    orders.userId = ordersDto.userId;
    orders.amount = ordersDto.amount;
    orders.chargeId = charge.id;

    AppDataSource.manager.save(Orders, orders);
    return 'ok';
  }
}
