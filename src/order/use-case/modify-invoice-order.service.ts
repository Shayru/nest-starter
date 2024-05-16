import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ModifyInvoiceDTO } from "../dto/modify-invoice.dto";


Injectable();
export class ModifyInvoiceOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ){}

    async modify(id: number, data: ModifyInvoiceDTO): Promise<Order> {
        const order = await this.repository.findOneBy({ id });
        order.setInvoiceAdress(data)

        return this.repository.save(order);
    }
}