import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { GetAllOrdersService } from './use-case/get-all-orders.service';
import { PayOrderService } from './use-case/pay-order-service';
import { ModifyInvoiceOrderService } from './use-case/modify-invoice-order.service';
import { ModifyShippingOrderService } from './use-case/modify-shipping-order.service';
import { GetAllOrdersItemsService } from './use-case/get-all-orders-items.service';
import { DeleteOrderService } from './use-case/delete-order.service';
import { OrderProduct } from './entity/order-product.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { GetCurrentUserOrderService } from './use-case/get-current-user-order.service';
import { DeleteOrderItemProductService } from './use-case/delete-order-item-product';
import { ModifyOrderItemQuantityService } from './use-case/modify-order-item-quantity';
import { GetOrderService } from './use-case/get-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderProduct]), UserModule, ProductModule],
  
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    GetAllOrdersService,
    GetAllOrdersItemsService,
    PayOrderService,
    ModifyShippingOrderService,
    ModifyInvoiceOrderService,
    DeleteOrderService,
    GetCurrentUserOrderService,
    DeleteOrderItemProductService,
    ModifyOrderItemQuantityService,
    GetOrderService
    // {
    //     provide: CreateUserService,
    //     useFactory: (PasswordHasherService: PasswordHasherServiceInterface) => {
    //         return new CreateUserService(PasswordHasherService); 
    //     },
    //     inject: [PasswordHasherService],
    // },
  ],
})
export class OrderModule {}
