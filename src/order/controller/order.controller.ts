import {
    Body,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';
import { CreateOrderService } from '../use-case/create-order.service';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { GetAllOrdersService } from '../use-case/get-all-orders.service';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
  
  ) {}
  
    @Post()
    createOrder(@Body() data: OrderCreateDTO) {
      return this.createOrderService.create(data);
    }


    @Get()
    getAllOrders() {
      return this.getAllOrdersService.getAll();
    }
  

  }
  