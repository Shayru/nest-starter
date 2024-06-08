import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";


Injectable();
export class PayOrderService{
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ){}

    async pay(id: number): Promise<Order> {
        const order = await this.repository.findOneBy({ id });
        order.pay()

        return await this.repository.save(order);
    }
}