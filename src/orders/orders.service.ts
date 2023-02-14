import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppDataSource } from 'src/data-source';
import { Orders } from 'src/entities/orders.entity';
import { User } from 'src/entities/user.entity';
import { Products } from './../entities/product.entity';
import Stripe from 'stripe';
import { OrderTicketDto } from './dto/order-ticket.dto';
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

  async testOrder(ordersDto: OrdersDto): Promise<string> {
    const id = ordersDto.userId;

    const user = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create();
      await AppDataSource.manager.update(User, { id }, { stripeCustomerId: customer.id });
    }

    //TODO: sourceを画面から受け取り変数に変更
    const charge = await this.stripe.paymentIntents.create({
      amount: ordersDto.amount,
      currency: 'usd',
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

  async createPaymentIntent(): Promise<any> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 200,
      currency: 'jpy',
    });
    return paymentIntent;
  }

  async orderTicket(orderTicketDto: OrderTicketDto): Promise<string> {
    const id = orderTicketDto.userId;
    const resUser = await AppDataSource.manager.findOneBy(User, {
      id,
    });

    if (!resUser) {
      throw new NotFoundException('User is not found');
    }

    const currentTickets = resUser.tickets;
    const productName = orderTicketDto.name;

    const resProduct = await AppDataSource.manager.findOneBy(Products, {
      name: productName,
    });

    if (!resProduct) {
      throw new NotFoundException('Order Plan is not found');
    }

    let updateTickets;

    updateTickets = currentTickets === 0 ? resProduct.ticketAmount : resProduct.ticketAmount + resUser.tickets;

    await AppDataSource.manager.update(User, id, {
      tickets: updateTickets,
    });

    if (resUser.stripeCustomerId == null) {
      const customer = await this.stripe.customers.create();
      await AppDataSource.manager.update(User, { id }, { stripeCustomerId: customer.id });
    }

    //TODO: sourceを画面から受け取り変数に変更
    const charge = await this.stripe.paymentIntents.create({
      amount: resProduct.price,
      currency: 'usd',
      description: `Order ${new Date()} by ${orderTicketDto.userId}`,
    });

    console.log('charge', charge);

    const orders = new Orders();
    orders.userId = orderTicketDto.userId;
    orders.amount = resProduct.ticketAmount;
    orders.chargeId = charge.id;

    AppDataSource.manager.save(Orders, orders);

    return 'ok';
  }
}
