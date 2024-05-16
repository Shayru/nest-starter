import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { GetAllOrdersService } from './use-case/get-all-orders.service';
import { PayOrderService } from './use-case/pay-order-service';
import { ModifyInvoiceOrderService } from './use-case/modify-invoice-order.service';
import { ModifyShippingOrderService } from './use-case/modify-shipping-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    CreateOrderService,
    GetAllOrdersService,
    PayOrderService,
    ModifyShippingOrderService,
    ModifyInvoiceOrderService
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
