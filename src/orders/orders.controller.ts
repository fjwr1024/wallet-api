import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async testOrder(@Body() orderDto: OrderDto): Promise<string> {
    const res = await this.ordersService.order(orderDto);
    return res;
  }
}
