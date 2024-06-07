import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { OrderProduct } from '../entity/order-product.entity';
import { error } from 'console';

export class DeleteOrderItemProductService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {
  }

    async delete(id: number, itemProductId: number): Promise<Order>{
      console.log(id, itemProductId);
      const orderProduct = await this.orderProductRepository.findOne({
        where: { 
            id: itemProductId,
        },
        relations: ['product']
      });
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
      if(found == null){
        throw new Error('Product not found')
      }
      
      console.log('totals')
      const newTotal = foundOrder.total + parseFloat((orderProduct.product.price * orderProduct.quantity).toFixed(2));
      foundOrder.total = newTotal;
      
      foundOrder.products = foundOrder.products.filter(product => product.product.id !== productId);
      await this.orderProductRepository.remove(found);

      return await this.repository.save(foundOrder);

  }
}