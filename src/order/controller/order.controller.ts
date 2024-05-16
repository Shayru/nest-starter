import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { CreateOrderService } from '../use-case/create-order.service';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { GetAllOrdersService } from '../use-case/get-all-orders.service';
import { PayOrderService } from '../use-case/pay-order-service';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly payOrderService: PayOrderService,
  
  ) {}
  
    @Post()
    createOrder(@Body() data: OrderCreateDTO) {
      return this.createOrderService.create(data);
    }

    @Put(':id/pay')
    payOrder(
      @Param('id', ParseIntPipe) id: number
    ) {
      return this.payOrderService.pay(id);
    }


    @Get()
    getAllOrders() {
      return this.getAllOrdersService.getAll();
    }
  

  }
  