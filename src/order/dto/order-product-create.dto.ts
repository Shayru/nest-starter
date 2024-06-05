import { IsNotEmpty } from "class-validator";
import { Product } from "src/product/entity/product.entity";
import { Order } from "../entity/order.entity";
import { int } from "aws-sdk/clients/datapipeline";

export class OrderProductCreateDTO {
  @IsNotEmpty()
  product: Product
  @IsNotEmpty()
  order: Order
  quantity: int
}