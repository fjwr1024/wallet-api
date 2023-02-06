import { Body, Controller, Post } from '@nestjs/common';
import { OrdersDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async testOrder(@Body() ordersDto: OrdersDto): Promise<string> {
    console.log('ordersDto', ordersDto);
    const res = await this.ordersService.order(ordersDto);
    return res;
  }
}
