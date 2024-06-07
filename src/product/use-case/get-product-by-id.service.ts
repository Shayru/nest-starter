import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

export class GetProductByIdService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {
  }

  async getById(id: number): Promise<Product>{
    return await this.repository.findOneBy({ id });
  }
}