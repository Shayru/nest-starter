import { ArrayMaxSize, ArrayMinSize, MinLength } from "class-validator";

export class OrderCreateDTO {
    @ArrayMaxSize(3, {
        message: 'La commande doit contenir max 3 objets',
      })
    items: string[]
}