import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

export class GetProductByIdService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {
  }

  async getById(id: number) {
    return await this.repository.findOneBy({ id });
  }
}