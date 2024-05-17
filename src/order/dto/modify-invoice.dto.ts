import { IsString } from "class-validator";

export class ModifyInvoiceDTO {
    @IsString()
    invoiceAddress: string
}