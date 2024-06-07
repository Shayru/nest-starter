import { IsNumber, IsString, } from "class-validator";
import { Product } from "src/product/entity/product.entity";

export class OrderCreateDTO {
  @IsNumber()
  product: number
  @IsNumber()
  quantity: number
}