import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { ProductCreateDto } from "../dto/product-create.dto";

export class CreateProductService{
    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>
    ){}

    async create(createData: ProductCreateDto): Promise<Product> {
        const product = new Product(createData);
        return await this.repository.save(product);
    }
}