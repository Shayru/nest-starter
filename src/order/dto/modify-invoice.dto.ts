import { ArrayMaxSize, ArrayMinSize, IsString, MinLength } from "class-validator";

export class ModifyInvoiceDTO {
    @IsString()
    invoiceAddress: string
}