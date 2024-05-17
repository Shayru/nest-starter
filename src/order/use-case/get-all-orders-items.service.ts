import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';

Injectable();
export class GetAllOrdersItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {}

  async getAll() {
    return await this.repository.find();
  }
}
