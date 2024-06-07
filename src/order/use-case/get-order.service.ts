import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

Injectable();
export class GetOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async get(id: number) {
    
    const foundOrder = await this.repository.findOne({
      where: { 
          id
      },
      relations: ['products','products.product','customer']
  });

    if(!foundOrder){
      throw new NotFoundException('No Order found');
    }

    return foundOrder;
  }
}
