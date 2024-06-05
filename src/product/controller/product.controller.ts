import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductService } from '../use-case/create-product.service';
import { GetAllProductsService } from '../use-case/get-all-products.service';
import { DeleteProductService } from '../use-case/delete-product.service';
import { GetProductByIdService } from '../use-case/get-product-by-id.service';
import { ProductCreateDto } from '../dto/product-create.dto';
  
  @Controller('products')
  export class ProductController {
    constructor(
      private readonly createProductService: CreateProductService,
      private readonly getAllProductsService: GetAllProductsService,
      private readonly deleteProductService: DeleteProductService,
      private readonly getProductByIdService: GetProductByIdService
  
  ) {}
  
    @UseGuards(AuthGuard)
    @Post()
    createProduct(@Body() data: ProductCreateDto) {
      return this.createProductService.create(data);
    }

    @UseGuards(AuthGuard)
    @Get()
    getAllProducts() {
      return this.getAllProductsService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getProductById(
      @Param('id', ParseIntPipe) id: number
    ) {
      return this.getProductByIdService.getById(id);
    }


    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProduct(
      @Param('id', ParseIntPipe) id: number
    ) {
      return this.deleteProductService.delete(id);
  
   }
} 
  