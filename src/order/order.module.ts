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
import { GetCurrentUserService } from 'src/user/use-case/get-current-user.service';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderProduct]),  TypeOrmModule.forFeature([User]), UserModule],
  
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    GetAllOrdersService,
    GetAllOrdersItemsService,
    PayOrderService,
    ModifyShippingOrderService,
    ModifyInvoiceOrderService,
    DeleteOrderService,
    GetCurrentUserService
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
