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
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { ModifyShippingOrderService } from '../use-case/modify-shipping-order.service';
import { ModifyInvoiceOrderService } from '../use-case/modify-invoice-order.service';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly payOrderService: PayOrderService,
      private readonly modifyShippingOrderService: ModifyShippingOrderService,
      private readonly modifyInvoiceOrderService: ModifyInvoiceOrderService,
  
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

    @Put(':id/shipping')
    modifyShipping(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: ModifyLivraisonDTO,
    ) {
      return this.modifyShippingOrderService.modify(id, data);
    }

    @Put(':id/invoice')
    modifyLivraison(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: ModifyInvoiceDTO,
    ) {
      return this.modifyInvoiceOrderService.modify(id, data);
    }

    @Get()
    getAllOrders() {
      return this.getAllOrdersService.getAll();
    }
  
  }
  