import { IsNumber, } from "class-validator";

export class OrderCreateDTO {
  @IsNumber()
  product: number
  @IsNumber()
  quantity: number
}