import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../entity/order.entity';

export class GetCurrentUserOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {
  }

  async get(currentUser: number): Promise<Order>{
    const foundOrder = await this.repository.findOne({
      where: { 
          status: Order.OrderType.Created,
          customer: { id: currentUser }
      },
      relations: ['products','products.product','customer']
  });

    if(!foundOrder){
      throw new NotFoundException('No Order found');
    }

    return foundOrder;
  }
}