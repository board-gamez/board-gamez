import { Body, Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { OrderService } from './order.service';
import { AddOrderInput, AddOrderOutput } from './dto/add-order.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { CurrentUser } from 'src/iam/authorization/decorator/current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { ConfirmOrderInput } from './dto/callback-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dto/get-orders.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Permission('ADD_ORDER')
  @Post()
  async addOrder(
    @CurrentUser() currentUser: User,
    @Body() input: AddOrderInput,
  ): Promise<AddOrderOutput> {
    return this.orderService.addOrder(currentUser, input);
  }

  @Permission('GET_ORDER')
  @Get()
  async getOrders(
    @CurrentUser() currentUser: User,
    @Body() input: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(currentUser, input);
  }

  @Redirect()
  @Get('callback')
  async confirmOrder(@Query() input: ConfirmOrderInput) {
    return this.orderService.confirmOrder(input);
  }
}
