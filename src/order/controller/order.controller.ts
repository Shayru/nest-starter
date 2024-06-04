import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
import { CreateOrderService } from '../use-case/create-order.service';
import { OrderCreateDTO } from '../dto/order-create.dto';
import { GetAllOrdersService } from '../use-case/get-all-orders.service';
import { PayOrderService } from '../use-case/pay-order-service';
import { ModifyLivraisonDTO } from '../dto/modify-livraison.dto';
import { ModifyShippingOrderService } from '../use-case/modify-shipping-order.service';
import { ModifyInvoiceOrderService } from '../use-case/modify-invoice-order.service';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';
import { GetAllOrdersItemsService } from '../use-case/get-all-orders-items.service';
import { DeleteOrderService } from '../use-case/delete-order.service';
import { AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly getAllOrdersItemsService: GetAllOrdersItemsService,
      private readonly payOrderService: PayOrderService,
      private readonly modifyShippingOrderService: ModifyShippingOrderService,
      private readonly modifyInvoiceOrderService: ModifyInvoiceOrderService,
      private readonly deleteOrderService: DeleteOrderService
  
  ) {}
  
    @UseGuards(AuthGuard)
    @Post()
    createOrder(@Body() data: OrderCreateDTO) {
      return this.createOrderService.create(data);
    }

    @UseGuards(AuthGuard)
    @Put(':id/pay')
    payOrder(
      @Param('id', ParseIntPipe) id: number
    ) {
      return this.payOrderService.pay(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id/shipping')
    modifyShipping(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: ModifyLivraisonDTO,
    ) {
      return this.modifyShippingOrderService.modify(id, data);
    }

    @UseGuards(AuthGuard)
    @Put(':id/invoice')
    modifyLivraison(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: ModifyInvoiceDTO,
    ) {
      return this.modifyInvoiceOrderService.modify(id, data);
    }

    @UseGuards(AuthGuard)
    @Get()
    getAllOrders() {
      return this.getAllOrdersService.getAll();
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteOrder(
      @Param('id', ParseIntPipe) id: number
    ) {
      return this.deleteOrderService.delete(id);
    }
    
    @UseGuards(AuthGuard)
    @Get('/items')
    getAllOrdersItems() {
      return this.getAllOrdersItemsService.getAll();
    }
  
  }
  