import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CreateProductService } from './use-case/create-product.service';
import { GetAllProductsService } from './use-case/get-all-products.service';
import { DeleteProductService } from './use-case/delete-product.service';
import { ProductController } from './controller/product.controller';
import { GetProductByIdService } from './use-case/get-product-by-id.service';
import { GetProductsByIdService } from './use-case/get-products-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetAllProductsService,
    GetProductByIdService,
    DeleteProductService,
    GetProductsByIdService
  ],
  exports: [TypeOrmModule.forFeature([Product]),
  GetProductByIdService
],
})
export class ProductModule {}
