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
import { GetAllUserOrdersService } from '../use-case/get-all-user-orders.service';
import { DeleteOrderService } from '../use-case/delete-order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/user/decorator/user.decorator';
import { DeleteOrderProductItemService } from '../use-case/delete-order-productitem';
import { ModifyOrderProductQuantityService } from '../use-case/modify-order-product-quantity';
import { ModifyOrderProductQuantityDTO } from '../dto/modify-order-product-quantity.dto';
import { GetOrderService } from '../use-case/get-order.service';
import { GetAllOrdersProductsService } from '../use-case/get-all-orders-products.service';
import { GetUserCurrentOrderService } from '../use-case/get-user-current-order.service';
  
  @Controller('orders')
  export class OrderController {
    constructor(
      private readonly createOrderService: CreateOrderService,
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly getOrderService: GetOrderService,
      private readonly getAllOrdersProductsService: GetAllOrdersProductsService,
      private readonly getAllUserOrdersService: GetAllUserOrdersService,
      private readonly getUserCurrentOrderService: GetUserCurrentOrderService,

      private readonly payOrderService: PayOrderService,
      private readonly modifyShippingOrderService: ModifyShippingOrderService,
      private readonly modifyOrderProductQuantity: ModifyOrderProductQuantityService,
      private readonly deleteOrderService: DeleteOrderService,
      private readonly deleteOrderProductItemService: DeleteOrderProductItemService
  
  ) {}

  

    @UseGuards(AuthGuard)
    @Get()
    getAllOrders() {
      return this.getAllOrdersService.getAll();
    }
  
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
    getCurrentUserCurrentOrder(
      @CurrentUser() currentUser: any
    ) {
      return this.getUserCurrentOrderService.get(currentUser);
    }

    @UseGuards(AuthGuard)
    @Get('/user/current')
    getAllCurentUserOrders(
      @CurrentUser() currentUser: any
    ) {
      return this.getAllUserOrdersService.get(currentUser);
    }    
    
    @UseGuards(AuthGuard)
    @Get('/user/:id')
    getAllUserOrders(
      @Param('id', ParseIntPipe) userId: number
    ) {
      return this.getAllUserOrdersService.get(userId);
    }
    
    
    @UseGuards(AuthGuard)
    @Get('/products')
    getAllOrdersProducts() {
      return this.getAllOrdersProductsService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id/')
    async getOrder(
      @Param('id', ParseIntPipe) id: number,
    ) {
      return this.getOrderService.get(id);
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
    @Put(':id/products/:productId/')
    modifyProductQuantity(
      @Param('id', ParseIntPipe) id: number,
      @Param('productId', ParseIntPipe) productId: number,
      @Body() data: ModifyOrderProductQuantityDTO,
    ) {
      return this.modifyOrderProductQuantity.modify(id,productId, data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id/products/:productId')
    removeProduct(
      @Param('id', ParseIntPipe) id: number,
      @Param('productId', ParseIntPipe) productId: number,

    ) {
      return this.deleteOrderProductItemService.delete(id, productId);
    }
  }
  