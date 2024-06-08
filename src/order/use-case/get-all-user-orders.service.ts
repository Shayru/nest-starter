import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';

Injectable();
export class GetAllUserOrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async get(userId: number) {

    return await this.repository.find({
      where: { 
          customer: { id: userId }
      },
      relations: ['products', 'products.product', 'customer'],
      })
  }
}
