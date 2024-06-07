import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { ModifyInvoiceDTO } from '../dto/modify-invoice.dto';
import { ModifyOrderProductQuantityDTO } from '../dto/modify-order-product-quantity.dto';
import { OrderProduct } from '../entity/order-product.entity';

export class ModifyOrderItemQuantityService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {
  }

    async modify(id: number,itemProductId: number, data: ModifyOrderProductQuantityDTO): Promise<Order>{
      const orderProduct = await this.orderProductRepository.findOne({
        where: { 
            id: itemProductId,
        },
        relations: ['product']
      });
      console.log(orderProduct);
      const productId = orderProduct.product.id;

      const foundOrder = await this.repository.findOne({
        where: { 
            id: id,
            status: Order.OrderType.Created,
        },
        relations: ['products','products.product']
      });

      if (!foundOrder) {
        throw new Error('Order not found');
      }

      const found = foundOrder.products.find(product => product.product.id === productId);
      if(!found == null){
        throw new Error('Product not found');
      }

      console.log('isChangeDelete ' + found.isChangeDelete(data))
      if(found.isChangeDelete(data)){
        foundOrder.total = foundOrder.total - (orderProduct.product.price * orderProduct.quantity);
        await this.orderProductRepository.remove(found);
        foundOrder.products = foundOrder.products.filter(product => product.product.id !== productId);
        return await this.repository.save(foundOrder)
      } else {
        found.changeQuantity(data)
        if(data.increase){
          foundOrder.total = foundOrder.total + (orderProduct.product.price * data.quantity);
        } else {
          foundOrder.total = foundOrder.total - (orderProduct.product.price * data.quantity);
        }
        return await this.repository.save(foundOrder);
      }
  }
}