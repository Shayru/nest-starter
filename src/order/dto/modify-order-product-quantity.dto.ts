import { IsBoolean, IsNumber } from "class-validator";

export class ModifyOrderProductQuantityDTO {
    @IsNumber()
    quantity: number
    @IsBoolean()
    increase: boolean
}