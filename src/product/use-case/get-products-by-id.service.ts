import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { NotFoundException } from '@nestjs/common';

export class GetProductsByIdService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {
  }

  async getByIds(ids: number[]): Promise<Product[]>{
    const products = await this.repository.find({
      where: {
          id: In(ids),
      },
    });

    if (products.length !== ids.length) {
        throw new NotFoundException('One or more products not found');
    }

    return products;
  }
}