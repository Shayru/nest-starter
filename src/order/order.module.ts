import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { GetAllOrdersService } from './use-case/get-all-orders.service';
import { PayOrderService } from './use-case/pay-order-service';
import { ModifyShippingOrderService } from './use-case/modify-shipping-order.service';
import { DeleteOrderService } from './use-case/delete-order.service';
import { OrderProduct } from './entity/order-product.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { DeleteOrderProductItemService } from './use-case/delete-order-productitem';
import { GetOrderService } from './use-case/get-order.service';
import { GetAllUserOrdersService } from './use-case/get-all-user-orders.service';
import { GetAllOrdersProductsService } from './use-case/get-all-orders-products.service';
import { ModifyOrderProductQuantityService } from './use-case/modify-order-product-quantity';
import { GetUserCurrentOrderService } from './use-case/get-user-current-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderProduct]), UserModule, ProductModule],
  
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    GetAllOrdersService,
    GetAllOrdersProductsService,
    GetUserCurrentOrderService,
    PayOrderService,
    ModifyShippingOrderService,
    DeleteOrderService,
    DeleteOrderProductItemService,
    ModifyOrderProductQuantityService,
    GetAllUserOrdersService,
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
