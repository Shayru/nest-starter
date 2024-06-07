import { ArrayMaxSize, ArrayMinSize, IsString, MinLength } from "class-validator";

export class ModifyLivraisonDTO {
    @IsString()
    shippingAddress: string
    @IsString()
    invoiceAddress: string
}