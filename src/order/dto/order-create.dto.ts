import { ArrayMaxSize, ArrayMinSize, MinLength } from "class-validator";
import { Product } from "src/product/entity/product.entity";

export class OrderCreateDTO {
    @ArrayMinSize(1, {
        message: 'La commande doit contenir au moinst 1 objet',
      })
    products: Product[]
}