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
import { GetAllUserOrdersService } from '../use-case/get-all-user-orders.service';
import { DeleteOrderService } from '../use-case/delete-order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/user/decorator/user.decorator';
import { GetCurrentUserOrderService } from '../use-case/get-current-user-order.service';
import { DeleteOrderItemProductService } from '../use-case/delete-order-item-product';
import { ModifyOrderItemQuantityService } from '../use-case/modify-order-item-quantity';
import { ModifyOrderProductQuantityDTO } from '../dto/modify-order-product-quantity.dto';
import { GetOrderService } from '../use-case/get-order.service';
import { GetAllOrdersItemsService } from '../use-case/get-all-orders-items.service copy';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly getOrderService: GetOrderService,
      private readonly getAllOrdersItemsService: GetAllOrdersItemsService,
      private readonly getAllUserOrdersService: GetAllUserOrdersService,
      private readonly getCurrentUserOrderService: GetCurrentUserOrderService,
      private readonly payOrderService: PayOrderService,
      private readonly modifyShippingOrderService: ModifyShippingOrderService,
      private readonly modifyInvoiceOrderService: ModifyInvoiceOrderService,
      private readonly deleteOrderService: DeleteOrderService,
      private readonly deleteOrderItemProductService: DeleteOrderItemProductService,
      private readonly modifyOrderItemQuantity: ModifyOrderItemQuantityService
  
  ) {}
  
    @UseGuards(AuthGuard)
    @Post()
    createOrder(
      @Body() data: OrderCreateDTO,  
      @CurrentUser() currentUser: any
    ) {
      return this.createOrderService.create(data, currentUser);
    }

    @UseGuards(AuthGuard)
    @Get('/current')
    getCurrentUserOrder(
      @CurrentUser() currentUser: any
    ) {
      return this.getCurrentUserOrderService.get(currentUser);
    }

    

    @UseGuards(AuthGuard)
    @Get('/user/current')
    async getAllUserCurentOrders(
      @CurrentUser() currentUser: any
    ) {
      const orders = await this.getAllUserOrdersService.get(currentUser);
      return orders;
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
    async getAllOrders() {
      const orders = await this.getAllOrdersService.getAll();
      orders.forEach(order => {
        // console.log(order);
        // console.log(order.customer);
      })
      return orders;
    }

    
    @UseGuards(AuthGuard)
    @Get('/user/:id')
    async getAllUserOrders(
      @Param('id', ParseIntPipe) userId: number
    ) {
      const orders = await this.getAllUserOrdersService.get(userId);
      console.log('test');
      console.log(orders);
      return orders;
    }

    // // @UseGuards(AuthGuard)
    // @Get('/user/current')
    // async getAllCurentUserOrders(
    //   // @CurrentUser() currentUser: any
    // ) {
    //   console.log('test')
    //   const orders = await this.getAllUserOrdersService.get(2);
    //   console.log('test');
    //   console.log(orders);
    //   return orders;
    // }

    @UseGuards(AuthGuard)
    @Get(':id/')
    async getOrder(
      @Param('id', ParseIntPipe) id: number,
    ) {
      return this.getOrderService.get(id);
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

    @UseGuards(AuthGuard)
    @Delete(':id/products/:itemId')
    removeItem(
      @Param('id', ParseIntPipe) id: number,
      @Param('itemId', ParseIntPipe) itemId: number,

    ) {
      return this.deleteOrderItemProductService.delete(id, itemId);
    }

    @UseGuards(AuthGuard)
    @Put(':id/products/:itemId/')
    modifyItemQuantity(
      @Param('id', ParseIntPipe) id: number,
      @Param('itemId', ParseIntPipe) itemId: number,
      @Body() data: ModifyOrderProductQuantityDTO,
    ) {
      return this.modifyOrderItemQuantity.modify(id,itemId, data);
    }
  
  }
  