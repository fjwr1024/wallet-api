import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppDataSource } from 'src/data-source';
import { Orders } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import Stripe from 'stripe';
import { OrderTicketDto } from './dto/order-ticket.dto';
import { OrdersDto } from './dto/orders.dto';
import { getUserById } from 'src/utils/usersUtil';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
      typescript: true,
    });
  }

  async testOrder(ordersDto: OrdersDto): Promise<string> {
    const id = ordersDto.userId;

    const user = await getUserById(id);

    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create();
      await AppDataSource.manager.update(User, { id }, { stripeCustomerId: customer.id });
    }

    const charge = await this.stripe.paymentIntents.create({
      amount: ordersDto.amount,
      currency: 'jpy',
      description: `Order ${new Date()} by ${ordersDto.userId}`,
    });

    console.log('charge', charge);

    const orders = new Orders();
    orders.userId = ordersDto.userId;
    orders.amount = ordersDto.amount;
    orders.chargeId = charge.id;

    AppDataSource.manager.save(Orders, orders);
    return 'ok';
  }

  async getPaymentIntent(): Promise<any> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 200,
      currency: 'jpy',
      payment_method_types: ['card'],
    });
    const clientSecret = paymentIntent.client_secret;
    return { paymentIntent, clientSecret };
  }
}
