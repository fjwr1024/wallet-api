import { Body, Controller, Get, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { OrderTicketDto } from './dto/order-ticket.dto';
import { OrdersDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async testOrder(@Body() ordersDto: OrdersDto): Promise<string> {
    const res = await this.ordersService.testOrder(ordersDto);
    return res;
  }

  @Get('/payment-intent')
  async createPaymentIntent(): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const res = await this.ordersService.createPaymentIntent();
    return res;
  }

  @Post('/ticket')
  async orderTicket(@Body() orderTicketDto: OrderTicketDto): Promise<string> {
    const res = await this.ordersService.orderTicket(orderTicketDto);
    return res;
  }
}
