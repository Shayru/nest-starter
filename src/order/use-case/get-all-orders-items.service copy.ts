import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from '../entity/order-product.entity';

Injectable();
export class GetAllOrdersItemsService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly repository: Repository<OrderProduct>,
  ) {}

  async getAll() {
    return await this.repository.find();
  }
}
